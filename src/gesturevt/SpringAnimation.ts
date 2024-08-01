import { SpringForce, MassState } from "./SpringForce";

export class SpringAnimation  { 
    private mSpring: SpringForce | null = null;
    private mPendingPosition: number = Number.MAX_VALUE; 
    private static UNSET: number = Number.MAX_VALUE;
    private mEndRequested: boolean = false;


    writeCb: (value:number) => void;
    readCb: () => number;
    doneCb: (() => void) | null = null;

    mLastFrameTime: number = 0;
    mMinVisibleChange: number = 0;
    mRunning: boolean = false;
    mStartValueIsSet: boolean = false;
    mValue: number = SpringAnimation.UNSET;
    mVelocity: number = 0;


    constructor(writeCb: (value:number) => void, readCb: () => number, doneCb: (() => void) | null) {
        
        this.writeCb = writeCb;
        this.readCb = readCb;
        this.doneCb = doneCb;
    }

    getSpring(): SpringForce | null {
        return this.mSpring;
    }

    setSpring(force: SpringForce): SpringAnimation {
        this.mSpring = force;
        return this;
    }

    rafHandler() {
        const now = performance.now();
        let finished = false;

        if (this.mLastFrameTime == 0) { 
            this.mLastFrameTime = now;
            this.writeCb(this.mValue);
        } else {
            let deltaT = now - this.mLastFrameTime;
            this.mLastFrameTime = now;
            finished = this.updateValueAndVelocity(deltaT);

            this.writeCb(this.mValue);
        }

        if (finished) {
            this.endAnimationInternal(false);
        } else {
            requestAnimationFrame(this.rafHandler.bind(this));
        }

    }

    endAnimationInternal(canceled: boolean) {
        this.mRunning = false;
        this.mLastFrameTime = 0;
        this.mStartValueIsSet = false;
        //TODO call doneCb
    }

    start(): void {
        this.sanityCheck();
        if (this.mSpring) {
            this.mSpring.setValueThreshold(this.getValueThreshold()); 
        }
        if (!this.mRunning) {
            this.mRunning = true;
            if (!this.mStartValueIsSet) {
                this.mValue = this.readCb();
            }
            requestAnimationFrame(this.rafHandler.bind(this));
        }
    }

    animateToFinalPosition(finalPosition: number): void {
        if (this.mRunning) {
            this.mPendingPosition = finalPosition;
        } else {
            if (this.mSpring == null) {
                this.mSpring = new SpringForce(finalPosition);
            } else {
                this.mSpring.setFinalPosition(finalPosition);
            }
            this.start();
        }
    }

    cancel(): void {
        if (this.mRunning) {
            this.endAnimationInternal(true);
        }
        if (this.mPendingPosition !== SpringAnimation.UNSET) {
            if (this.mSpring == null) {
                this.mSpring = new SpringForce(this.mPendingPosition);
            } else {
                this.mSpring.setFinalPosition(this.mPendingPosition);
            }
            this.mPendingPosition = SpringAnimation.UNSET;
        }
    }

    skipToEnd(): void {
        if (!this.canSkipToEnd()) {
            throw new Error("Spring animations can only come to an end when there is damping");
        }
        if (this.mRunning) { // Assuming mRunning is defined in DynamicAnimation
            this.mEndRequested = true;
        }
    }

    canSkipToEnd(): boolean {
        return this.mSpring !== null && this.mSpring.mDampingRatio > 0;
    }

    // Private methods

    private sanityCheck(): void {
        if (this.mSpring == null) {
            throw new Error("Incomplete SpringAnimation: Either final position or a spring force needs to be set.");
        }
        //const finalPosition = this.mSpring.getFinalPosition();
        //if (finalPosition > this.mMaxValue) { // Assuming mMaxValue is defined in DynamicAnimation
        //    throw new Error("Final position of the spring cannot be greater than the max value.");
        //} else if (finalPosition < this.mMinValue) { // Assuming mMinValue is defined in DynamicAnimation
        //    throw new Error("Final position of the spring cannot be less than the min value.");
        //}
    }

    updateValueAndVelocity(deltaT: number): boolean {
        if (this.mEndRequested) {
            if (this.mPendingPosition !== SpringAnimation.UNSET) {
                if (this.mSpring) {
                    this.mSpring.setFinalPosition(this.mPendingPosition);
                }
                this.mPendingPosition = SpringAnimation.UNSET;
            }
            this.mValue = this.mSpring ? this.mSpring.getFinalPosition() : 0; // Handle potential null mSpring
            this.mVelocity = 0;
            this.mEndRequested = false;
            return true;
        }

        if (this.mPendingPosition !== SpringAnimation.UNSET) {
            let massState: MassState; 
            if (this.mSpring) {
                massState = this.mSpring.updateValues(this.mValue, this.mVelocity, deltaT / 2);
                this.mSpring.setFinalPosition(this.mPendingPosition);   

            } else {
                // Handle potential null mSpring - you might need to define default behavior
                massState = { mValue: this.mValue, mVelocity: this.mVelocity }; 
            }
            this.mPendingPosition = SpringAnimation.UNSET;

            if (this.mSpring) {
                massState = this.mSpring.updateValues(massState.mValue, massState.mVelocity, deltaT / 2);
            }
            this.mValue = massState.mValue;
            this.mVelocity = massState.mVelocity;

        } else if (this.mSpring) {
            const massState = this.mSpring.updateValues(this.mValue, this.mVelocity, deltaT);
            this.mValue = massState.mValue;
            this.mVelocity = massState.mVelocity;   

        }

        if (this.isAtEquilibrium(this.mValue, this.mVelocity)) {
            this.mValue = this.mSpring ? this.mSpring.getFinalPosition() : 0; 
            this.mVelocity = 0;
            return true;
        }
        return false;
    }

    getAcceleration(value: number, velocity: number): number {
        return this.mSpring ? this.mSpring.getAcceleration(value, velocity) : 0; 
    }

    isAtEquilibrium(value: number, velocity: number): boolean {
        return this.mSpring ? this.mSpring.isAtEquilibrium(value, velocity) : false;
    }

    setValueThreshold(threshold: number): void {
    }
    getValueThreshold(): number {
        return 0.75;
    }
}
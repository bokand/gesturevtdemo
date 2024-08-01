// Internal state for value/velocity pair.
export class MassState {
    mValue: number = 0;
    mVelocity: number = 0;
    constructor() {
    }

}

export class SpringForce  { 
    // Stiffness constants
    static STIFFNESS_HIGH: number = 10000;
    static STIFFNESS_MEDIUM: number = 1500;
    static STIFFNESS_LOW: number = 200;
    static STIFFNESS_VERY_LOW: number = 50;

    // Damping ratio constants
    static DAMPING_RATIO_HIGH_BOUNCY: number = 0.2;
    static DAMPING_RATIO_MEDIUM_BOUNCY: number = 0.5;
    static DAMPING_RATIO_LOW_BOUNCY: number = 0.75;
    static DAMPING_RATIO_NO_BOUNCY: number = 1;

    private static VELOCITY_THRESHOLD_MULTIPLIER: number = 1000.0 / 16.0;
    private static UNSET: number = Number.MAX_VALUE;

    mNaturalFreq: number = Math.sqrt(SpringForce.STIFFNESS_MEDIUM);
    mDampingRatio: number = SpringForce.DAMPING_RATIO_MEDIUM_BOUNCY;
    mInitialized: boolean = false;
    mValueThreshold: number = 0;
    mVelocityThreshold: number = 0;
    mGammaPlus: number = 0;
    mGammaMinus: number = 0;
    mDampedFreq: number = 0;
    mFinalPosition: number = SpringForce.UNSET;

    mMassState: MassState = new MassState(); // Assuming MassState exists

    constructor(finalPosition?: number) {
        if (finalPosition !== undefined) {
            this.mFinalPosition = finalPosition;
        }
    }

    setStiffness(stiffness: number): SpringForce {
        if (stiffness <= 0) {
            throw new Error("Spring stiffness constant must be positive.");
        }
        this.mNaturalFreq = Math.sqrt(stiffness);
        this.mInitialized = false;
        return this;
    }

    getStiffness(): number {
        return this.mNaturalFreq * this.mNaturalFreq;
    }

    setDampingRatio(dampingRatio: number): SpringForce {
        if (dampingRatio < 0) {
            throw new Error("Damping ratio must be non-negative");
        }
        this.mDampingRatio = dampingRatio;
        this.mInitialized = false;
        return this;
    }

    getDampingRatio(): number {
        return this.mDampingRatio;
    }

    setFinalPosition(finalPosition: number): SpringForce {
        this.mFinalPosition = finalPosition;
        return this;
    }

    getFinalPosition(): number {
        return this.mFinalPosition;
    }

    // Private methods

    getAcceleration(lastDisplacement: number, lastVelocity: number): number {
        lastDisplacement -= this.getFinalPosition();

        const k = this.mNaturalFreq * this.mNaturalFreq;
        const c = 2 * this.mNaturalFreq * this.mDampingRatio;

        return -k * lastDisplacement - c * lastVelocity;
    }

    isAtEquilibrium(value: number, velocity: number): boolean {
        return Math.abs(velocity) < this.mVelocityThreshold
            && Math.abs(value - this.getFinalPosition()) < this.mValueThreshold;
    }

    private init(): void {
        if (this.mInitialized) {
            return;
        }

        if (this.mFinalPosition === SpringForce.UNSET) {
            throw new Error("Error: Final position of the spring must be set before the animation starts");
        }

        if (this.mDampingRatio > 1) {
            // Over damping
            this.mGammaPlus = -this.mDampingRatio * this.mNaturalFreq
                + this.mNaturalFreq * Math.sqrt(this.mDampingRatio * this.mDampingRatio - 1);   

            this.mGammaMinus = -this.mDampingRatio * this.mNaturalFreq
                - this.mNaturalFreq * Math.sqrt(this.mDampingRatio * this.mDampingRatio - 1);
        } else if (this.mDampingRatio >= 0 && this.mDampingRatio < 1) {
            // Under damping
            this.mDampedFreq = this.mNaturalFreq * Math.sqrt(1 - this.mDampingRatio * this.mDampingRatio);
        }

        this.mInitialized = true;
    }

    updateValues(lastDisplacement: number, lastVelocity: number, timeElapsed: number): MassState {
        this.init();

        const deltaT = timeElapsed / 1000; // unit: seconds
        lastDisplacement -= this.mFinalPosition;

        let displacement: number;
        let currentVelocity: number;

        if (this.mDampingRatio > 1) {
            // Overdamped
            const coeffA = lastDisplacement - (this.mGammaMinus * lastDisplacement - lastVelocity) / (this.mGammaMinus - this.mGammaPlus);
            const coeffB = (this.mGammaMinus * lastDisplacement - lastVelocity) / (this.mGammaMinus - this.mGammaPlus);
            displacement = coeffA * Math.pow(Math.E, this.mGammaMinus * deltaT) + coeffB * Math.pow(Math.E, this.mGammaPlus * deltaT);
            currentVelocity = coeffA * this.mGammaMinus * Math.pow(Math.E, this.mGammaMinus * deltaT) + coeffB * this.mGammaPlus * Math.pow(Math.E, this.mGammaPlus * deltaT);
        } else if (this.mDampingRatio === 1) {
            // Critically damped
            const coeffA = lastDisplacement;
            const coeffB = lastVelocity + this.mNaturalFreq * lastDisplacement;
            displacement = (coeffA + coeffB * deltaT) * Math.pow(Math.E, -this.mNaturalFreq * deltaT);
            currentVelocity = (coeffA + coeffB * deltaT) * Math.pow(Math.E, -this.mNaturalFreq * deltaT) * -this.mNaturalFreq + coeffB * Math.pow(Math.E, -this.mNaturalFreq * deltaT);
        } else {
            // Underdamped
            const cosCoeff = lastDisplacement;
            const sinCoeff = (1 / this.mDampedFreq) * (this.mDampingRatio * this.mNaturalFreq * lastDisplacement + lastVelocity);
            displacement = Math.pow(Math.E, -this.mDampingRatio * this.mNaturalFreq * deltaT) * (cosCoeff * Math.cos(this.mDampedFreq * deltaT) + sinCoeff * Math.sin(this.mDampedFreq * deltaT));
            currentVelocity = displacement * -this.mNaturalFreq * this.mDampingRatio + Math.pow(Math.E, -this.mDampingRatio * this.mNaturalFreq * deltaT) * (-this.mDampedFreq * cosCoeff * Math.sin(this.mDampedFreq * deltaT) + this.mDampedFreq * sinCoeff * Math.cos(this.mDampedFreq * deltaT));
        }

        this.mMassState.mValue = displacement + this.mFinalPosition;
        this.mMassState.mVelocity = currentVelocity;
        return this.mMassState;
    }

    setValueThreshold(threshold: number): void {
        this.mValueThreshold = Math.abs(threshold);
        this.mVelocityThreshold = this.mValueThreshold * SpringForce.VELOCITY_THRESHOLD_MULTIPLIER;
    }
}
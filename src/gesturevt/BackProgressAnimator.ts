import { BackEvent } from "./Util";
import { SpringForce } from "./SpringForce";
import { SpringAnimation } from "./SpringAnimation";

interface ProgressCallback {
    onProgressUpdate(event: BackEvent): void;
}

export class BackProgressAnimator {
    static SCALE_FACTOR = 100;

    private mSpring: SpringAnimation; 
    private mCallback: ProgressCallback | null = null;
    private mProgress: number = 0;
    private mLastBackEvent: BackEvent | null = null;
    private mBackAnimationInProgress: boolean = false;
    private mBackCancelledFinishRunnable: (() => void) | null = null;

    constructor() {
        // setup spring
        this.mSpring = new SpringAnimation(
            (value: number) => {
                value = Math.min(BackProgressAnimator.SCALE_FACTOR, Math.max(0, value));
                this.setProgress(value);
                this.updateProgressValue(value);
            },
            () => {
                return this.getProgress();
            },
            null);
        const force = new SpringForce();
        force.setStiffness(SpringForce.STIFFNESS_MEDIUM)
        force.setDampingRatio(SpringForce.DAMPING_RATIO_NO_BOUNCY);
        this.mSpring.setSpring(force);
    }

    private mOnAnimationEndListener: () => void = () => {
        this.invokeBackCancelledRunnable();
        this.reset();
    };

    private setProgress(progress: number): void {
        this.mProgress = progress;
    }

    private getProgress(): number {
        return this.mProgress;
    }

    public onBackProgressed(event: BackEvent): void {
        if (!this.mBackAnimationInProgress) {
            return;
        }
        this.mLastBackEvent = event;
        console.log("OnBackProgressed: " + event.progress);
        if (this.mSpring == null) 
            return;
        this.mSpring.animateToFinalPosition(event.progress * BackProgressAnimator.SCALE_FACTOR);
    }

    public onBackStarted(event: BackEvent, callback: ProgressCallback): void {
        this.reset();
        this.mLastBackEvent = event;
        this.mCallback = callback;
        this.mBackAnimationInProgress = true;
        this.updateProgressValue(0);
    }

    public reset(): void {
        if (this.mBackCancelledFinishRunnable != null) {
            this.updateProgressValue(0);
            this.invokeBackCancelledRunnable();
        }
        this.mSpring.animateToFinalPosition(0);
        if (this.mSpring.canSkipToEnd())
            this.mSpring.skipToEnd();
        else
            this.mSpring.cancel();

        this.mBackAnimationInProgress = false;
        this.mLastBackEvent = null;
        this.mCallback = null;
        this.mProgress = 0;
    }

    public onBackCancelled(finishCallback: () => void): void {
        this.mBackCancelledFinishRunnable = finishCallback;
        this.mSpring.doneCb = finishCallback;
        // this.mSpring.addEndListener(mBackCanceled)
        console.log("===CANCEL BACK PROGRESS");
        this.mSpring.animateToFinalPosition(0);
    }

    public isBackAnimationInProgress(): boolean {
        return this.mBackAnimationInProgress;
    }

    private updateProgressValue(progress: number): void {
        if (this.mLastBackEvent == null || this.mCallback == null || !this.mBackAnimationInProgress) {
            return;
        }
        console.log(`=== UPDATE PROGRESS VALUE ${progress / BackProgressAnimator.SCALE_FACTOR}`);
        const x = this.mLastBackEvent.x;
        const y = this.mLastBackEvent.y;
        const vx = this.mLastBackEvent.vx;
        const vy = this.mLastBackEvent.vy;
        const p = progress / BackProgressAnimator.SCALE_FACTOR;
        const edge = this.mLastBackEvent.edge;
        const triggerBack = this.mLastBackEvent.triggerBack;
        this.mCallback.onProgressUpdate(
            {
                x: x,
                y: y,
                progress: p,
                vx: vx,
                vy: vy,
                triggerBack: triggerBack,
                edge: edge,
                animation_target: null
            }
        );
    }

    private invokeBackCancelledRunnable(): void {
        // Simulate removing end listener
        // this.mSpring.removeEndCallback
        if (this.mBackCancelledFinishRunnable) {
            this.mBackCancelledFinishRunnable();
        }
        this.mBackCancelledFinishRunnable = null;
    }
}

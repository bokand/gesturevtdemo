import { BackEvent, Edge } from "./Util.ts";

function lerp(start: number, stop: number, amount: number) {
return (1.0 - amount) * start + amount * stop;
}

export enum TouchTrackerState {
    INITIAL =  1,
    ACTIVE,
    FINISHED,
};

const BACK_SWIPE_LINEAR_THRESHOLD: number = 412;
const MAX_DISTANCE: number = window.innerWidth;
const LINEAR_DISTANCE: number = Math.min(MAX_DISTANCE, BACK_SWIPE_LINEAR_THRESHOLD);

export class TouchTracker {
    mLinearDistance = LINEAR_DISTANCE;
    mMaxDistance = window.innerWidth;
    mNonLinearFactor = 0;

    // Latest touch event location
    mLatestTouchX = 0;
    mLatestTouchY = 0;
    mTriggerBack = false;

    // Initial touch event location
    mInitTouchX = 0;
    mInitTouchY = 0;
    mLatestVelocityX = 0;
    mLatestVelocityY = 0;
    mStartThresholdX = 0;
    mSwipeEdge = Edge.LEFT; 
    
    mLastUpdateTime: number | null = null;

    mState = TouchTrackerState.INITIAL;

    constructor() {}

    update(touchX: number, touchY: number, velocityX: number, velocityY: number) {
        if ((touchX < this.mStartThresholdX && this.mSwipeEdge === Edge.LEFT)
                || (touchX > this.mStartThresholdX && this.mSwipeEdge === Edge.RIGHT)) {
            this.mStartThresholdX = touchX;
            if ((this.mSwipeEdge === Edge.LEFT && this.mStartThresholdX < this.mInitTouchX)
                    || (this.mSwipeEdge === Edge.RIGHT && this.mStartThresholdX > this.mInitTouchX)) {
                this.mInitTouchX = this.mStartThresholdX;
            }
        }
      
        const curTime = performance.now();
        if (!this.mLastUpdateTime) {
          this.mLastUpdateTime = curTime;
        } 
        
        const deltaMs = curTime - this.mLastUpdateTime;
        if (deltaMs == 0 || deltaMs > 500) {
          this.mLatestVelocityX = 0;
          this.mLatestVelocityY = 0;
        } else {
          this.mLatestVelocityX = (touchX - this.mLatestTouchX) / (deltaMs / 1000.0);
          this.mLatestVelocityY = (touchY - this.mLatestTouchY) / (deltaMs / 1000.0);
        }
        this.mLastUpdateTime = curTime;
      
        this.mLatestTouchX = touchX;
        this.mLatestTouchY = touchY;   
    }

    setTriggerBack(triggerBack: boolean) {
        if (this.mTriggerBack !== triggerBack && !triggerBack) {
            this.mStartThresholdX = this.mLatestTouchX;
        }
        this.mTriggerBack = triggerBack;
    }

    getTriggerBack() {
        return this.mTriggerBack;
    }

    setState(state: TouchTrackerState) {
        this.mState = state;
    }

    isInInitialState() {
        return this.mState === TouchTrackerState.INITIAL;
    }

    isActive() {
        return this.mState === TouchTrackerState.ACTIVE;
    }

    isFinished() {
        return this.mState === TouchTrackerState.FINISHED;
    }

    setGestureStartLocation(touchX: number, touchY: number, swipeEdge: Edge) {
        this.mInitTouchX = touchX;
        this.mInitTouchY = touchY;
        this.mLatestTouchX = touchX;
        this.mLatestTouchY = touchY;
        this.mSwipeEdge = swipeEdge;
        this.mStartThresholdX = this.mInitTouchX;
    }

    updateStartLocation() {
        this.mInitTouchX = this.mLatestTouchX;
        this.mInitTouchY = this.mLatestTouchY;
        this.mStartThresholdX = this.mInitTouchX;
    }

    reset() {
        this.mInitTouchX = 0;
        this.mInitTouchY = 0;
        this.mStartThresholdX = 0;
        this.mTriggerBack = false;
        this.mState = TouchTrackerState.INITIAL;
        this.mSwipeEdge = Edge.LEFT;
    }

    createStartEvent(target: null): BackEvent {
      return {
          x: this.mLatestTouchX,
          y: this.mLatestTouchY,
          progress: 0,
          vx: 0,
          vy:0 ,
          triggerBack: this.mTriggerBack,
          edge: this.mSwipeEdge,
          animation_target: null,
        };
    }

     createProgressEvent() : BackEvent {
         const progress = this.getProgress(this.mLatestTouchX);
         return this.createProgressEventFromProgress(progress);
     }

    getProgress(touchX: number) {
        const startX = this.mTriggerBack ? this.mInitTouchX : this.mStartThresholdX;
        let distance;
        if (this.mSwipeEdge === Edge.LEFT) {
            distance = touchX - startX;
        } else {
            distance = startX - touchX;
        }
        const deltaX = Math.max(0, distance);
        let linearDistance = this.mLinearDistance;
        let maxDistance = this.getMaxDistance();
        maxDistance = maxDistance === 0 ? 1 : maxDistance;
        let progress;
        if (linearDistance < maxDistance) {
            const nonLinearDistance = maxDistance - linearDistance;
            const initialTarget = linearDistance + nonLinearDistance * this.mNonLinearFactor;

            const isLinear = deltaX <= linearDistance;
            if (isLinear) {
                progress = deltaX / initialTarget;
            } else {
                const nonLinearDeltaX = deltaX - linearDistance;
                const nonLinearProgress = nonLinearDeltaX / nonLinearDistance;
                const currentTarget = lerp(initialTarget, maxDistance, nonLinearProgress);
                progress = deltaX / currentTarget;
            }
        } else {
            progress = deltaX / maxDistance;
        }
        return Math.min(Math.max(progress, 0), 1);
    }

    getMaxDistance() {
        return this.mMaxDistance;
    }

    createProgressEventFromProgress(progress: number): BackEvent {
        return {
          x: this.mLatestTouchX,
          y: this.mLatestTouchY,
          progress: progress,
          vx: this.mLatestVelocityX,
          vy: this.mLatestVelocityY,
          triggerBack: this.mTriggerBack,
          edge: this.mSwipeEdge,
          animation_target: null,
        };
    }
}

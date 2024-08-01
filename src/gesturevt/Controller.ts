import { EventType, Edge, BackEvent } from "./Util.ts";
import { TouchTracker, TouchTrackerState } from "./TouchTracker.ts"

export interface BackAnimationControllerCallback {
    onBackStarted: (backEvent: BackEvent) => void,
    onBackProgressed: (backEvent: BackEvent) => void,
    onBackInvoked: () => void,
    onBackCancelled: () => void
}

function controllerAnimation(from: number, to: number, msDuration: number, updateCallback: (x: number) => void, endCallback: () => void) {
    if (msDuration <= 0) {
      endCallback();
      return;
    }
    const numFrames = Math.ceil(msDuration / 16);
    const perFrameDelta = (to - from) / numFrames;
    
    requestAnimationFrame(() => {
      updateCallback(from + perFrameDelta);
      controllerAnimation(from+perFrameDelta, to, msDuration - 16, updateCallback, endCallback);
    });
  }
  
  // BackAnimationImpl inner class
  class BackAnimationImpl {
      controller: BackAnimationController;
      constructor(controller: BackAnimationController) {
          this.controller = controller; // Store a reference to the BackAnimationController
      }
  
      onBackMotion(touchX: number, touchY: number, velocityX: number, velocityY: number, keyAction: number, swipeEdge: Edge) {
          // mShellExecutor.execute would be replaced with direct execution
          this.controller.onMotionEvent(touchX, touchY, velocityX, velocityY, keyAction, swipeEdge); 
      }
  
      onPilferPointers() {
          this.controller.onPilferPointers();
      }
  
      setTriggerBack(triggerBack: boolean) {
          // mShellExecutor.execute would be replaced with direct execution
          this.controller.setTriggerBack(triggerBack); 
      }
    
  }
  
export class BackAnimationController {
    mBackGestureStarted = false;

    /** Tracks if an uninterruptible animation is in progress */
    mPostCommitAnimationInProgress = false;

    /** Tracks if we should start the back gesture on the next motion move event */
    mShouldStartOnNextMoveEvent = false;
    mOnBackStartDispatched = false;
    mPointerPilfered = false;

    mCurrentTracker: TouchTracker;
    mActiveCallback: BackAnimationControllerCallback;
    mBackAnimation: BackAnimationImpl;

      constructor(callback: BackAnimationControllerCallback) {
          /** True when a back gesture is ongoing */
  
          this.mCurrentTracker = new TouchTracker(); 
        
          this.mActiveCallback = callback;
  
          this.mBackAnimation = new BackAnimationImpl(this); // Pass a reference to the controller
      }
  
      getActiveTracker() {
          if (this.mCurrentTracker.isActive()) return this.mCurrentTracker;
          return null;
      }
  
      onPilferPointers() {
          //this.mPointerPilfered = true;
          //if (!this.shouldDispatchToAnimator() ) {
          //    this.mCurrentTracker.updateStartLocation();
          //    this.tryDispatchOnBackStarted(this.mActiveCallback, this.mCurrentTracker.createStartEvent(null));
          //}
      }
    
      onPointerDown(e: PointerEvent) {
        this.onMotionEvent(e.clientX, e.clientY, 0, 0, EventType.DOWN, Edge.LEFT);
      }
  
      onPointerUp(e: PointerEvent) {
        this.onMotionEvent(e.clientX, e.clientY, 0, 0, EventType.UP, Edge.LEFT);
      }
  
      onPointerCancel(e: PointerEvent) {
        this.onMotionEvent(e.clientX, e.clientY, 0, 0, EventType.CANCEL, Edge.LEFT);
      }
  
      onPointerMove(e: PointerEvent) {
        this.onMotionEvent(e.clientX, e.clientY, 0, 0, EventType.MOVE, Edge.LEFT);
      }
  
      onMotionEvent(touchX: number, touchY: number, velocityX: number, velocityY: number, eventType: EventType, swipeEdge: Edge) {
          let activeTouchTracker = this.getActiveTracker();
          if (activeTouchTracker != null && eventType !== EventType.UP) {
              activeTouchTracker.update(touchX, touchY, velocityX, velocityY);
          }
  
          if (this.mCurrentTracker.isFinished()) {
              return;
          }
  
          if (eventType === EventType.DOWN) { // Assuming MotionEvent constants are defined
              if (!this.mBackGestureStarted) {
                  this.mShouldStartOnNextMoveEvent = true;
              }
          } else if (eventType === EventType.MOVE) {
              if (!this.mBackGestureStarted && this.mShouldStartOnNextMoveEvent) {
                  this.onGestureStarted(touchX, touchY, swipeEdge);
                  this.mShouldStartOnNextMoveEvent = false;
              }
              this.onMove();
          } else if (eventType === EventType.UP || eventType === EventType.CANCEL) {
              if (eventType === EventType.CANCEL) {
                  this.setTriggerBack(false);
              }
              this.onGestureFinished();
          }
      }
  
      onGestureStarted(touchX: number, touchY: number, swipeEdge: Edge) {
        let touchTracker;
        if (this.mCurrentTracker.isInInitialState()) {
            touchTracker = this.mCurrentTracker;
        } else {
            return;
        }
  
        touchTracker.setGestureStartLocation(touchX, touchY, swipeEdge);
        touchTracker.setState(TouchTrackerState.ACTIVE);
        this.mBackGestureStarted = true;
        this.tryDispatchOnBackStarted(this.mActiveCallback, touchTracker.createStartEvent(null));
    }
  
    onMove() {
        if (!this.mBackGestureStarted ||
            !this.mOnBackStartDispatched) {
            return;
        }
  
        const backEvent = this.mCurrentTracker.createProgressEvent();
        this.dispatchOnBackProgressed(this.mActiveCallback, backEvent);
    }
  
    tryDispatchOnBackStarted(callback: BackAnimationControllerCallback, backEvent: BackEvent) {
        if (this.mOnBackStartDispatched /*|| !this.mPointerPilfered*/) {
            return;
        }
        this.dispatchOnBackStarted(callback, backEvent); // Assuming this is defined
    }
    
    dispatchOnBackStarted(callback: BackAnimationControllerCallback, backEvent: BackEvent) {
          callback.onBackStarted(backEvent);
          this.mOnBackStartDispatched = true;
      }
  
    dispatchOrAnimateOnBackInvoked(callback: BackAnimationControllerCallback, touchTracker: TouchTracker) {
      let animationStarted = false;
      const maxX = this.mCurrentTracker.getMaxDistance();
      const backMotionEvent = this.mCurrentTracker.createProgressEvent();
      
      let minVelocity = 250; // TODO
      let maxVelocity = 3000; // TODO
      let maxFlingDistance = maxX * 0.3; 
  
      let currentX = backMotionEvent.x;
      let velocity = Math.min(Math.max(-maxVelocity, backMotionEvent.vx), maxVelocity);
  
      let animationFaction = velocity / maxVelocity; // value between -1 and 1
      let flingDistance = animationFaction * maxFlingDistance; // px
      let endX = Math.min(Math.max(currentX + flingDistance, 0), maxX);
  
      if (!Number.isNaN(endX)
                        && currentX != endX
                        && Math.abs(velocity) >= minVelocity) {
          let updateCb = (animatedValue: number) => {
              let progress = touchTracker.getProgress(animatedValue);
              let backEvent = touchTracker.createProgressEventFromProgress(progress);
              this.dispatchOnBackProgressed(this.mActiveCallback, backEvent);
          };
  
          let endCb = () => this.dispatchOnBackInvoked(callback);
  
          console.log("FLINGING");
          controllerAnimation(currentX, endX, 200*250 / velocity, updateCb, endCb);
          animationStarted = true;
      }
    
      if (!animationStarted) {
          this.dispatchOnBackInvoked(callback);
      }   
    }
    
    dispatchOnBackInvoked(callback: BackAnimationControllerCallback) {
       this.onBackAnimationFinished();
       callback.onBackInvoked(); // Assuming the callback has this method
         
    }
  
    dispatchOnBackCancelled(callback: BackAnimationControllerCallback) {
      this.onBackAnimationFinished();
        callback.onBackCancelled(); // Assuming the callback has this method
    }
  
    dispatchOnBackProgressed(callback: BackAnimationControllerCallback, backEvent: BackEvent) {
        callback.onBackProgressed(backEvent); // Assuming the callback has this method
    }
  
    setTriggerBack(triggerBack: boolean) {
        const activeBackGestureInfo = this.getActiveTracker();
        if (activeBackGestureInfo != null) {
            activeBackGestureInfo.setTriggerBack(triggerBack);
        }
    }
  
    invokeOrCancelBack(touchTracker: TouchTracker) {
        // TODO
        // if (this.mBackNavigationInfo != null) {
        //     const callback = this.mBackNavigationInfo.getOnBackInvokedCallback(); 
        //     if (touchTracker.getTriggerBack()) {
        //         this.dispatchOrAnimateOnBackInvoked(callback, touchTracker);
        //     } else {
        //         this.dispatchOnBackCancelled(callback);
        //     }
        // }
        this.finishBackNavigation(touchTracker.getTriggerBack());
    }
  
    onGestureFinished() {
        const activeTouchTracker = this.getActiveTracker();
        if (!this.mBackGestureStarted || activeTouchTracker == null) {
            return;
        }
  
        const triggerBack = activeTouchTracker.getTriggerBack();
  
        this.mBackGestureStarted = false;
        activeTouchTracker.setState(TouchTrackerState.FINISHED); 
  
        if (this.mPostCommitAnimationInProgress) {
            return;
        }
  
        // if (this.mBackNavigationInfo == null) {
        //     this.mCurrentTracker.reset();
        //     this.finishBackNavigation(triggerBack);
        //     return;
        // }
  
        // const backType = this.mBackNavigationInfo.getType(); 
        // if (!this.shouldDispatchToAnimator() || 
        //     this.mShellBackAnimationRegistry.isAnimationCancelledOrNull(backType)) { 
        //     this.invokeOrCancelBack(this.mCurrentTracker);
        //     this.mCurrentTracker.reset();
        //     return;
        // } else if (this.mShellBackAnimationRegistry.isWaitingAnimation(backType)) {
        //     //setTimeout(this.mAnimationTimeoutRunnable, this.MAX_ANIMATION_DURATION); 
        //     return;
        // }
  
        this.startPostCommitAnimation();
    }
  
    startPostCommitAnimation() {
        if (this.mPostCommitAnimationInProgress) {
            return;
        }
  
        //clearTimeout(this.mAnimationTimeoutRunnable); 
        this.mPostCommitAnimationInProgress = true;
        //setTimeout(this.mAnimationTimeoutRunnable, this.MAX_ANIMATION_DURATION); 
        
        if (this.mCurrentTracker.getTriggerBack()) {
            this.dispatchOrAnimateOnBackInvoked(this.mActiveCallback, this.mCurrentTracker);
        } else {
            this.dispatchOnBackCancelled(this.mActiveCallback);
        }
    }
  
    onBackAnimationFinished() {
        this.mPostCommitAnimationInProgress = false;
  
        if (this.mCurrentTracker.isActive() || this.mCurrentTracker.isFinished()) {
            this.invokeOrCancelBack(this.mCurrentTracker);
        } 
        this.resetTouchTracker();
    }
  
    resetTouchTracker() {
        this.mCurrentTracker.reset();
  
        if (this.mCurrentTracker.isInInitialState()) {
            if (this.mBackGestureStarted) {
                this.mBackGestureStarted = false;
                this.dispatchOnBackCancelled(this.mActiveCallback);
                this.finishBackNavigation(false);
            } 
            return;
        }
  
        if (this.mCurrentTracker.isFinished() && this.mCurrentTracker.getTriggerBack()) {
            this.finishBackNavigation(true);
            this.mCurrentTracker.reset();
        } else if (!this.mCurrentTracker.isFinished()) {
            // Placeholder for potential logic
        } else {
            this.mCurrentTracker.reset();
        }
    }
  
    finishBackNavigation(triggerBack: boolean) {
        this.mShouldStartOnNextMoveEvent = false;
        this.mOnBackStartDispatched = false;
        this.mPointerPilfered = false;
    }
  
  }
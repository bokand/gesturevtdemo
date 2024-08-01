  import { EventType } from "./Util";

  function dumbAnimation(from: number, to: number, msDuration: number, writeCallback: (value: number) => void) {
    if (msDuration <= 0) {
      return;
    }
    const numFrames = Math.ceil(msDuration / 16);
    const perFrameDelta = (to - from) / numFrames;
    
    requestAnimationFrame(() => {
      writeCallback(from + perFrameDelta);
      dumbAnimation(from+perFrameDelta, to, msDuration - 16, writeCallback);
    });
  }

  export interface EdgePanelCallback {
    triggerBack: () => void,
    cancelBack: () => void,
    setTriggerBack: (triggerBack: boolean) => void,
    updatedChevrons: (translationX: number, y: number) => void,
  }
  
  export class NavigationBarEdgePanel {
    static BASE_TRANSLATION_DP = 50;
    mBackCallback: EdgePanelCallback;

    mMinDeltaForSwitch = 32;
    mSwipeTriggerThreshold = 16;
    mSwipeProgressThreshold = 412;
  
    mIsLeftPanel = true;
    
    mBaseTranslation = NavigationBarEdgePanel.BASE_TRANSLATION_DP;
  
    // Initializing variables to default values
    mStartX = 0; 
    mStartY = 0;
    mCurrentTranslation = 0; 
    mDesiredTranslation = 0;
  
    mDragSlopPassed = false;
    mArrowsPointLeft = true; 
    mMaxTranslation = 70; //TODO?
    mTriggerBack = false;
    mPreviousTouchTranslation = 0;
    mTotalTouchDelta = 0; 

    constructor(callback: EdgePanelCallback) {
      
      this.mBackCallback = callback;
      
    }
    
    onMotionEvent(event: PointerEvent, eventType: EventType) {
      // if (!this.mVelocityTracker) {
      //   // Assuming you have a way to obtain a VelocityTracker-like object in your JS environment
      //   this.mVelocityTracker = obtainVelocityTracker(); // Replace with your actual implementation
      // }
      // this.mVelocityTracker.addMovement(event);
  
      switch (eventType) {
        case EventType.DOWN:
          this.mDragSlopPassed = false;
          this.resetOnDown(); // Assuming you have this method implemented
          this.mStartX = event.clientX;
          this.mStartY = event.clientY;
          //this.setVisibility(VISIBLE); // Assuming you have this method implemented
          //this.updatePosition(event.clientY); // Assuming you have this method implemented
          break;
  
        case EventType.MOVE:
          this.handleMoveEvent(event); // Assuming you have this method implemented
          break;
  
        case EventType.UP:
          if (this.mTriggerBack) {
            this.triggerBack(); // Assuming you have this method implemented
          } else {
            this.cancelBack(); // Assuming you have this method implemented
          }
          // this.mVelocityTracker.recycle();
          // this.mVelocityTracker = null;
          break;
  
        case EventType.CANCEL:
          this.cancelBack();
          // this.mVelocityTracker.recycle();
          // this.mVelocityTracker = null;
          break;
      }
    }
  
    
    onPointerDown(e: PointerEvent) {
      this.onMotionEvent(e, EventType.DOWN);
    }
    
    onPointerUp(e: PointerEvent) {
      this.onMotionEvent(e, EventType.UP);
    }
    
    onPointerCancel(e: PointerEvent) {
      this.onMotionEvent(e, EventType.CANCEL);
    }
    
    onPointerMove(e: PointerEvent) {
      this.onMotionEvent(e, EventType.MOVE);
    }
    
    triggerBack() {
       this.mBackCallback.triggerBack(); // Assuming you have this callback implemented
       //navigator.vibrate(25);
      // if (!this.mVelocityTracker) {
      //   this.mVelocityTracker = obtainVelocityTracker(); // Replace with your implementation
      // }
      // this.mVelocityTracker.computeCurrentVelocity(1000);
  
      //const translationEnd = () => {
        //this.mTranslationAnimation.setSpring(this.mTriggerBackSpring); // Adapt animation handlingmStartY
      
        this.setDesiredTranslation(0, /*animated*/true);
      //};
  
      //if (this.mTranslationAnimation.isRunning()) {
        // this.mTranslationAnimation.addEndListener({
        //   onAnimationEnd: (animation, canceled, value, velocity) => {
        //     animation.removeEndListener(this); 
        //     if (!canceled) {
        //       translationEnd();
        //     }
        //   }
        // });
        //translationEnd();
      //} else {
      //  translationEnd();
      //}
    }
    
    cancelBack() {
      this.mBackCallback.cancelBack();
  
      // if (this.mTranslationAnimation.isRunning()) {
      //   this.mTranslationAnimation.addEndListener(this.mSetGoneEndListener); // Assuming this listener exists
      // }
    }
  
    resetOnDown() {
      //this.animate().cancel(); // Adapt animation cancellation
      //this.mTranslationAnimation.cancel(); // Adapt animation cancellation
      
      //this.mTranslationAnimation.setSpring(this.mRegularTranslationSpring); // Adapt animation spring setting
  
      
      this.setTriggerBack(false, false); 
      this.setDesiredTranslation(0, false); 
      this.setCurrentTranslation(0); // Assuming you have this method
  
      this.mPreviousTouchTranslation = 0;
      this.mTotalTouchDelta = 0;
    }
    
    signum(n: number) {
      if (n === 0 || Number.isNaN(n))
        return n;
      return Math.sign(n);
    }
    saturate(n: number) {
      return Math.min(1, Math.max(0, n));
    }
  
    handleMoveEvent(event: PointerEvent) {
      const x = event.clientX;
      const y = event.clientY;
      let touchTranslation = Math.abs(x - this.mStartX);
      const yOffset = y - this.mStartY;
      let delta = touchTranslation - this.mPreviousTouchTranslation;
  
      if (Math.abs(delta) > 0) {
        if (this.signum(delta) === this.signum(this.mTotalTouchDelta)) {
          this.mTotalTouchDelta += delta;
        } else {
          this.mTotalTouchDelta = delta;
        }
      }
      this.mPreviousTouchTranslation = touchTranslation;
  
      if (!this.mDragSlopPassed && touchTranslation > this.mSwipeTriggerThreshold) {
        this.mDragSlopPassed = true;
        navigator.vibrate(1);
        this.setTriggerBack(true, true); 
      }
  
      if (touchTranslation > this.mBaseTranslation) {
        const diff = touchTranslation - this.mBaseTranslation;
        let progress = this.saturate(diff / (window.innerWidth - this.mBaseTranslation));
        // progress = RUBBER_BAND_INTERPOLATOR.getInterpolation(progress) * ...
        progress = progress
                    * (this.mMaxTranslation - this.mBaseTranslation);
  
        touchTranslation = this.mBaseTranslation + progress;
      } else {
        const diff = this.mBaseTranslation - touchTranslation;
        let progress = this.saturate(diff / this.mBaseTranslation);
        // progress = RUBBER_BAND_INTERPOLATOR_APPEAR.getInterpolation(progress)
        progress = progress
                    * (this.mBaseTranslation / 4);
        touchTranslation = this.mBaseTranslation - progress;
      }
  
      let triggerBack = this.mTriggerBack;
  
      if (Math.abs(this.mTotalTouchDelta) > this.mMinDeltaForSwitch) {
        let wasTriggered = triggerBack;
        triggerBack = this.mTotalTouchDelta > 0;
        if (!wasTriggered && triggerBack) {
          navigator.vibrate(1);
        }
      }
  
      // this.mVelocityTracker.computeCurrentVelocity(1000);
      // const xVelocity = this.mVelocityTracker.getXVelocity();
      // const yVelocity = this.mVelocityTracker.getYVelocity();
      // const velocity = MathUtils.mag(xVelocity, yVelocity); // Assuming MathUtils.mag exists
  
      if (Math.abs(yOffset) > Math.abs(x - this.mStartX) * 2) {
        triggerBack = false;
        
      }
  
      this.setTriggerBack(triggerBack, true); 
  
      if (!this.mTriggerBack) {
        touchTranslation = 0;
      } else if (this.mIsLeftPanel && this.mArrowsPointLeft 
                 || (!this.mIsLeftPanel && !this.mArrowsPointLeft)) {
        //touchTranslation -= this.getStaticArrowWidth(); // Assuming you have this method
      }
  
      this.setDesiredTranslation(touchTranslation, true); 
    }
  
    setTriggerBack(triggerBack: boolean, animated: boolean) {
      if (this.mTriggerBack !== triggerBack) {
        this.mTriggerBack = triggerBack;
        
        // this.mTranslationAnimation.cancel(); // Adapt animation cancellation
        this.mBackCallback.setTriggerBack(this.mTriggerBack); 
      }
    }
    
    setDesiredTranslation(desiredTranslation: number, animated: boolean) {
        if (this.mDesiredTranslation != desiredTranslation) {
            this.mDesiredTranslation = desiredTranslation;
            if (!animated) {
                this.setCurrentTranslation(desiredTranslation);
            } else {
                dumbAnimation(this.mCurrentTranslation, this.mDesiredTranslation, 64, (value: number) => {
                  this.setCurrentTranslation(value);
                  return Math.abs(this.mCurrentTranslation - this.mDesiredTranslation) < 2;
                });
            }
        }
    }
  
    setCurrentTranslation(currentTranslation:number) {
        this.mCurrentTranslation = currentTranslation;
        this.mBackCallback.updatedChevrons(this.mCurrentTranslation, this.mStartY - 80);
    }
  }
import { BackAnimationController } from "./Controller";
import { BackEvent } from "./Util";
import { NavigationBarEdgePanel } from "./NavigationBarEdgePanel";
import { BackProgressAnimator } from "./BackProgressAnimator";

  const screens = [
    {src: 'resources/cnn3.png',
        timeline: '--progress-timeline',
        animation: '',
    },  
    {src: 'resources/cnn2.png',
        timeline: '--progress-timeline',
        animation: '',
    },  
    {src: 'resources/cnn1.png',
        timeline: '--progress-timeline',
        animation: 'builtinback',
    },  
    {src: 'resources/gmail3.png',
        timeline: '--progress-timeline',
        animation: 'gmailshrink',
    },  
    {src: 'resources/gmail2.png',
        timeline: '--progress-timeline',
        animation: 'slidefromleft',
        incomingTransform: 'translateX(-100vw)',
    },  
    {src: 'resources/gmail1.png',
        timeline: '--progress-timeline',
        animation: 'builtinback',
    },  
    {src: 'resources/mdn3.png',
        timeline: '--progress-timeline',
        animation: 'fade',
    },  
    {src: 'resources/mdn2.png',
        timeline: '--progress-timeline',
        animation: 'fade',
    },  
    {src: 'resources/mdn1.png',
        timeline: '--progress-timeline',
        animation: 'builtinback',
    },  
    {src: 'resources/wiki4.png',
        timeline: '--progress-timeline',
        animation: 'spin',
    },  
    {src: 'resources/wiki3.png',
        timeline: '--progress-timeline',
        animation: 'spin',
    },  
    {src: 'resources/wiki2.png',
        timeline: '--progress-timeline',
        animation: 'spin',
    },  
    {src: 'resources/wiki1.png',
        timeline: '--progress-timeline',
        animation: 'builtinback',
    },  
  ];

  function syncEffectTimeline(x: number) {
    const scroller = document.getElementById("progressScroller")!;
    scroller.scrollTop = x * 10000;
  }

  // For debugging - helps locate logs related to a glitch noticed during an animation.
  addEventListener('keydown', () => console.log("##################"));

  // 
  function backProgressUpdated(backEvent: BackEvent) {
      //console.log(`Back Progress: ${backEvent.progress}`);
      syncEffectTimeline(backEvent.progress);
  }

  const progressAnimator = new BackProgressAnimator();

  // Drives back progress
  const controller = new BackAnimationController({
    onBackStarted: (event: BackEvent ) => {
      //console.log(`Back Stareted ${event.x}, ${event.y}`);
      progressAnimator.onBackStarted(event, { onProgressUpdate: backProgressUpdated} );
    },
    onBackProgressed: (event: BackEvent) => {
      progressAnimator.onBackProgressed(event);
    },
    onBackCancelled: () => {
      const scroller = document.getElementById("progressScroller")!;
      progressAnimator.onBackCancelled(() => {
         // Back Cancel Finished
         //console.log("Cancel Animation Finished");
      }) 
      //console.log('Back Canceled');
    },
    onBackInvoked: () => {
      popScreen();
      progressAnimator.reset();
      //console.log('Back Invoked');
    }
  });

  // Drives the chevrons, independent of the back progress sent to the app
  const edgePanel = new NavigationBarEdgePanel({
    triggerBack: function() {
      controller.setTriggerBack(true);
    },
    cancelBack: function() {
      controller.setTriggerBack(false);
    },
    setTriggerBack: function(triggerBack) {
      controller.setTriggerBack(triggerBack);
    },
    updatedChevrons: function(translationX, y) {
      const e: HTMLElement = document.getElementById('chevrons')!;
      e.style.left = `${translationX - 50}px`;
      e.style.width = `${50 + 10*((translationX/70)**3)}px`;
      e.style.top = `${Math.max(0, y)}px`;
    }
  });
  
  let isActive = false;
  
window.onload = () => {
    const backarea: HTMLElement = document.getElementById("backarea")!;
    backarea.addEventListener('pointerdown', (e) => {
      if (isActive)
        return;
      isActive = true;
      edgePanel.onPointerDown(e);
      controller.onPointerDown(e);
      backarea.setPointerCapture(e.pointerId);
    });
    backarea.addEventListener('pointerup', e => {
      if (!isActive)
        return;
      isActive = false;
      edgePanel.onPointerUp(e);
      controller.onPointerUp(e);
      backarea.releasePointerCapture(e.pointerId);
    });
    backarea.addEventListener('pointercancel', e => {
      if (!isActive)
        return;
      isActive = false;
      edgePanel.onPointerCancel(e);
      controller.onPointerCancel(e);
      backarea.releasePointerCapture(e.pointerId);
    });
    backarea.addEventListener('pointermove', e => {
      if (!isActive)
        return;
      edgePanel.onPointerMove(e);
      controller.onPointerMove(e);
    });
    initStack();
}
  
  let ix = Number.parseInt(window.location.hash.substring(1));
  if (Number.isNaN(ix)) {
    ix = screens.length - 1;
  }
    
  function initStack() {
    screens.forEach((screen, index) => {
      if (index > ix)
        return;
      const img = document.createElement('img');
      img.src = screen.src;
      img.id = `img${index}`;
      img.className = 'screen';
      const stack = document.getElementById('stack')!;
      stack.insertBefore(img, stack.firstElementChild);
    });
    initStackTop(); 
  }
  
  function initStackTop() {
    const stack = document.getElementById('stack')!;
    const last: HTMLElement | null = stack.lastElementChild as HTMLElement;
    if (!last)
        return;

    const ix = Number.parseInt(last.id.substring(3));
    let next_active = last;
    if ('incomingTransform' in screens[ix]) {
      next_active = last.previousElementSibling! as HTMLElement;
    }

    next_active.classList.add('top');
    next_active.classList.add('active');
    next_active.style.animationName = screens[ix].animation;
  }
  
  function popScreen() {
    const stack = document.getElementById('stack')!;

    const active = stack.querySelector('.active')! as HTMLElement;
    active.classList.add('end');

    let rotateOut = () => {
        active.classList.remove('active');
        active.classList.remove('end');
        active.classList.remove('top');
        active.style.animationName = '';
        active.style.transform = '';
        active.style.opacity = '';


        const old_front_element = stack.lastElementChild! as HTMLElement;
        stack.insertBefore(old_front_element, stack.firstElementChild);
        document.getElementById('progressScroller')!.scrollTop = 0;
        initStackTop();
    }

    if (active.getAnimations().length > 0) {
      active.getAnimations()[0].commitStyles();
      const last_ix = Number.parseInt(stack.lastElementChild!.id.substring(3));
      active.style.animationName = `${screens[last_ix].animation}end`;
      active.getAnimations()[0].addEventListener('finish', rotateOut);
    } else {
      rotateOut();
    }



  }
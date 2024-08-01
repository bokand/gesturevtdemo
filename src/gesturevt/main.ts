import { BackAnimationController } from "./Controller";
import { BackEvent } from "./Util";
import { NavigationBarEdgePanel } from "./NavigationBarEdgePanel";
import { BackProgressAnimator } from "./BackProgressAnimator";

  const screens = [
    {src: 'https://cdn.glitch.global/2950c782-439e-4f98-a671-b34cef4f461e/cnn1.png?v=1722393268913',
        timeline: '--progress-timeline',
        animation: 'shrink',
    },  
    {src: 'https://cdn.glitch.global/2950c782-439e-4f98-a671-b34cef4f461e/cnn2.png?v=1722393272553',
        timeline: '--progress-timeline',
        animation: 'shrink',
    },   
    {src: 'https://cdn.glitch.global/2950c782-439e-4f98-a671-b34cef4f461e/cnn3.png?v=1722393274989',
        timeline: '--progress-timeline',
        animation: 'screenswipe',
    },   
    {src: 'https://cdn.glitch.global/2950c782-439e-4f98-a671-b34cef4f461e/wikipedia1.png?v=1722393277064',
        timeline: '--progress-timeline',
        animation: 'shrink',
    },   
    {src: 'https://cdn.glitch.global/2950c782-439e-4f98-a671-b34cef4f461e/wikipedia2.png?v=1722393279653',
        timeline: '--progress-timeline',
        animation: 'screenswipe',
    },   
    {src: 'https://cdn.glitch.global/2950c782-439e-4f98-a671-b34cef4f461e/hn1.png?v=1722393282525',
        timeline: '--progress-timeline',
        animation: 'shrink',
    },  
    {src: 'https://cdn.glitch.global/2950c782-439e-4f98-a671-b34cef4f461e/hn2.png?v=1722393284651',
        timeline: '--progress-timeline',
        animation: 'shrink',
    },  
    {src: 'https://cdn.glitch.global/2950c782-439e-4f98-a671-b34cef4f461e/hn3.png?v=1722393287364',
        timeline: '--progress-timeline',
        animation: 'screenswipe',
    },
  ];

  function syncEffectTimeline(x: number) {
    const scroller = document.getElementById("progressScroller")!;
    scroller.scrollTop = x * 10000;
  }

  addEventListener('keydown', () => console.log("##################3"));

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
      const scroller = document.getElementById("progressScroller")!;
      progressAnimator.reset();
      popScreen();
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
    last.classList.add('top');
    last.style.animationName = screens[ix].animation;
  }
  
  function popScreen() {
    document.getElementById('progressScroller')!.scrollTop = 0;
    const stack = document.getElementById('stack')!;
    const element = stack.lastElementChild as HTMLElement;
    if (!element)
        return;

    const ix = Number.parseInt(element.id.substring(3));
    element.classList.remove('top');
    element.classList.add('end');
    element.getAnimations()[0].commitStyles();
    element.style.animationName = `${screens[ix].animation}end`;

    element.getAnimations()[0].addEventListener('finish', (e) => {
      stack.removeChild(element);
      initStackTop();
    });
  }
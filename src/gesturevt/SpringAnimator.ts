import { Spring, SpringConfig } from "../SpringPhysicsModel";

export class SpringAnimator {
  spring: Spring;
  writeCb: (value:number) => void;
  readCb: () => number;
  doneCb: (() => void) | null = null;

  startTime: number = 0;
  startPos: number = 0;
  endPos: number = 0;

  shouldSkipToEnd: boolean = false;


  constructor(config: SpringConfig, writeCb: (value:number) => void, readCb: () => number, doneCb: (() => void) | null) {
    this.spring = new Spring(config);
    this.writeCb = writeCb;
    this.readCb = readCb;
    this.doneCb = doneCb;
  }

  reset() {
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
  }

  start(to: number) {
    this.startTime = performance.now();
    this.endPos = to;
    this.startPos = this.readCb();
    requestAnimationFrame( () => this.tick() )
  }

  animateTo(to: number) {
    if (this.startTime !== 0) {
        console.log(`>>> ANIMATE EXISTING ${this.readCb()} --> ${to}`);
        const oldDir = this.direction();
        this.endPos = to;
        this.startPos = this.readCb();
        const v = this.spring.velocity();
        if (!Number.isNaN(v)) {
            this.spring.initialVelocity = v;
        }
        if (this.direction() != oldDir) {
            this.spring.initialVelocity *= -1;
        }
    } else {
        console.log(`>>> ANIMATE NEW ${this.readCb()} --> ${to}`);
        this.start(to);
    }
  }

  skipToEnd() {
    if (this.startTime === 0)
        throw new Error("Skiping unstarted animation");

    this.shouldSkipToEnd = true;
  }

  direction() {
    return Math.sign(this.startPos - this.endPos);
  }

  tick() {
    const now = performance.now();
    let curPos = Math.abs(this.readCb()-this.endPos);
    if (this.shouldSkipToEnd) {
        this.shouldSkipToEnd = false;
        curPos = 0;
    }
    let result = this.spring.position(curPos, now - this.startTime);
    if (!result.done) {
        this.writeCb(result.offset*this.direction() + this.endPos);
        requestAnimationFrame( () => this.tick() );
    } else {
        this.writeCb(this.endPos);
      console.log("SPRING DONE");
      if (this.doneCb)
        this.doneCb();
      this.reset();
    }
  }
}
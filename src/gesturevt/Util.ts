export enum Edge {
    LEFT = 1,
    RIGHT,
}

export enum EventType {
    DOWN = 1,
    MOVE,
    UP,
    CANCEL,
  }

export interface BackEvent {
    x: number,
    y: number,
    progress: number,
    vx: number,
    vy: number,
    triggerBack: boolean,
    edge: Edge,
    animation_target: null,
}
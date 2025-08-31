declare module 'spin-wheel' {
  export class Wheel {
    constructor(container: HTMLElement, props: any);
    destroy(): void;
    spinToItem(index: number, duration?: number, easingEnabled?: boolean, revolutions?: number, direction?: number, easingFn?: Function): void;
    onRest?: (event: any) => void;
    onSpin?: (event: any) => void;
    onCurrentIndexChange?: (event: any) => void;
  }
}
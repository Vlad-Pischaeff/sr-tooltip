type ArrowPosition = {
    x: 'left' | 'center' | 'right';
    y: 'top' | 'bottom';
};
export declare function getTooltipCoordsDynamic(anchor: HTMLElement, tooltip: HTMLElement, offset: number, location: 'top' | 'bottom'): {
    x: number;
    y: number;
    arrow: ArrowPosition;
};
export {};

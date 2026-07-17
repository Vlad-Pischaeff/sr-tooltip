import React from 'react';
interface TooltipProps {
    children: React.ReactElement<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
    content: React.ReactNode;
    params?: {
        offset?: number;
        arrowSize?: number;
        arrowColor?: string;
        placement?: 'top' | 'bottom';
        delay?: number;
    };
}
export declare const Tooltip: ({ children, content, params }: TooltipProps) => React.JSX.Element;
export {};
//# sourceMappingURL=tooltip.d.ts.map
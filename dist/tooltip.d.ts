import React from 'react';
interface TooltipProps {
    children: React.ReactElement<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
    content: React.ReactNode;
    isDisabled?: boolean;
    hasArrow?: boolean;
}
export declare const Tooltip: ({ children, content, isDisabled, hasArrow }: TooltipProps) => React.JSX.Element;
export {};
//# sourceMappingURL=tooltip.d.ts.map
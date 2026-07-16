import { useLayoutEffect } from 'react';
const styles = `
  .sr-tooltip {
    position: absolute;
    padding: 8px 12px;
    background: #85c7ec;
    color: #333;
    border-radius: 4px;
    transition: opacity 0.5s;
    pointer-events: auto !important;
  }
  .sr-tooltip-arrow {
    position: absolute;
    border: 5px solid transparent;
  }
  .sr-arrow-left { left: 0; }
  .sr-arrow-right { right: 0; }
  .sr-arrow-top { top: 0; }
  .sr-arrow-bottom { bottom: 0; }
  .sr-wrapper {
    display: inline-block;
    width: fit-content;
    height: fit-content;
  }
`;
const STYLE_ID = 'sr-tooltip-styles';
export const TooltipStyles = () => {
    useLayoutEffect(() => {
        if (!document.getElementById(STYLE_ID)) {
            const style = document.createElement('style');
            style.id = STYLE_ID;
            style.textContent = styles;
            document.head.appendChild(style);
        }
    }, []);
    return null;
};
//# sourceMappingURL=styles.js.map
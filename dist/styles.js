import { useEffect } from 'react';
const styles = `
  .sr-tooltip {
    --sr-arrow-size: 10px;
    position: absolute;
    transition: opacity 0.5s;
    pointer-events: auto !important;
    width: fit-content;
    height: fit-content;
  }
  .sr-arrow {
    position: absolute;
    width: var(--sr-arrow-size);
    height: var(--sr-arrow-size);
    background: var(--sr-arrow-color);
    transform: rotate(45deg);
  }
  .sr-arrow-left { left: 15%; }
  .sr-arrow-right { right: 15%; }
  .sr-arrow-center { left: calc(50% - var(--sr-arrow-size) / 2); }
  .sr-arrow-top { bottom: calc(100% - var(--sr-arrow-size) / 2); }
  .sr-arrow-bottom { bottom: calc(-1 * var(--sr-arrow-size) / 2); }
  .sr-wrapper {
    display: inline-block;
    width: fit-content;
    height: fit-content;
  }
`;
const STYLE_ID = 'sr-tooltip-styles';
export const TooltipStyles = () => {
    useEffect(() => {
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
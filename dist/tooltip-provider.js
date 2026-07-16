const CONTAINER_ID = 'sr-tooltip-container';
export const getOrCreateTooltipContainer = () => {
    let container = document.getElementById(CONTAINER_ID);
    if (!container) {
        container = document.createElement('div');
        container.id = CONTAINER_ID;
        Object.assign(container.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            height: '0',
            width: '100%',
            zIndex: '9999',
            pointerEvents: 'auto'
        });
        document.body.appendChild(container);
    }
    return container;
};
//# sourceMappingURL=tooltip-provider.js.map
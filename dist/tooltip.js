'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getTooltipCoordsDynamic } from './helper.js';
import { getOrCreateTooltipContainer } from './tooltip-provider.js';
import { TooltipStyles } from './styles.js';
const HIDE_DELAY_MS = 300;
export const Tooltip = ({ children, content, isDisabled, hasArrow = false }) => {
    const [isShown, setIsShown] = useState(false);
    const [portal, setPortal] = useState(null);
    const [coords, setCoords] = useState({ x: 0, y: 0, arrow: { x: 'center', y: 'top' } });
    const timerRef = useRef(null);
    const anchorRef = useRef(null);
    const tooltipRef = useRef(null);
    const showPortal = isShown && portal !== null;
    useEffect(() => {
        setPortal(getOrCreateTooltipContainer());
        return () => {
            if (timerRef.current)
                clearTimeout(timerRef.current);
        };
    }, []);
    useLayoutEffect(() => {
        if (isShown && anchorRef.current && tooltipRef.current) {
            const coords = getTooltipCoordsDynamic(anchorRef.current, tooltipRef.current);
            setCoords(coords);
        }
    }, [isShown, content]);
    // Функция закрытия с задержкой
    const hideWithDelay = () => {
        timerRef.current = setTimeout(() => {
            setIsShown(false);
        }, HIDE_DELAY_MS);
    };
    // Функция отмены закрытия
    const cancelHide = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        setIsShown(true);
    };
    return (_jsxs(_Fragment, { children: [_jsx(TooltipStyles, {}), _jsx("div", { ref: anchorRef, className: 'sr-wrapper', onMouseEnter: cancelHide, onMouseLeave: hideWithDelay, children: children }), showPortal &&
                createPortal(_jsx("div", { ref: tooltipRef, className: `sr-tooltip ${hasArrow ? `sr-arrow-${coords.arrow.x} sr-arrow-${coords.arrow.y}` : ''}`, onMouseEnter: cancelHide, onMouseLeave: hideWithDelay, style: {
                        left: coords.x,
                        top: coords.y,
                        visibility: coords.x === 0 ? 'hidden' : 'visible',
                    }, children: content }), portal)] }));
};
//# sourceMappingURL=tooltip.js.map
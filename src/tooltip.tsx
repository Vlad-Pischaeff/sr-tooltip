'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getTooltipCoordsDynamic } from './helper.js';
import { getOrCreateTooltipContainer } from './tooltip-provider.js';
import { TooltipStyles } from './styles.js';

const HIDE_DELAY_MS = 300;

interface TooltipProps {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>; // Элемент, на который наводим (кнопка и т.д.)
  content: React.ReactNode; // Что показать в тултипе
  params?: {
    offset?: number;
    arrowSize?: number;
    arrowColor?: string;
    location?: 'top' | 'bottom';
    delay?: number;
  },
}

const useEff = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export const Tooltip = ({ children, content, params = {} }: TooltipProps) => {
  const { offset = 12, arrowSize = 0, arrowColor = 'transparent', location = 'bottom' } = params;
  const [isShown, setIsShown] = useState(false);
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, arrow: { x: 'center', y: 'top' } });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const showPortal = isShown && portal !== null;

  useEffect(() => {
    setPortal(getOrCreateTooltipContainer());
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEff(() => {
    if (isShown && anchorRef.current && tooltipRef.current) {
      const coords = getTooltipCoordsDynamic(anchorRef.current, tooltipRef.current, offset, location);
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

  return (
    <>
      <TooltipStyles />
      <div 
        ref={anchorRef}
        className='sr-wrapper'
        onMouseEnter={cancelHide}
        onMouseLeave={hideWithDelay}
      >
        {children}
      </div>
      {showPortal &&
        createPortal(
          <div
            ref={tooltipRef}
            className='sr-tooltip'
            onMouseEnter={cancelHide}
            onMouseLeave={hideWithDelay}
            style={{
              left: coords.x,
              top: coords.y,
              visibility: coords.x === 0 ? 'hidden' : 'visible',
              '--sr-arrow-size': `${arrowSize}px`,
              '--sr-arrow-color': arrowColor,
            } as React.CSSProperties}
          >
            {content}
            {arrowSize !== 0 && <div className={`sr-arrow sr-arrow-${coords.arrow.x} sr-arrow-${coords.arrow.y}`} />}
          </div>,
          portal,
        )}
    </>
  );
}; 

'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getTooltipCoordsDynamic } from './helper.js';
import { getOrCreateTooltipContainer } from './tooltip-provider.js';
import { TooltipStyles } from './styles.js';

const HIDE_DELAY_MS = 300;

interface TooltipProps {
  children: React.ReactElement<
    React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>
  >; // Элемент, на который наводим (кнопка и т.д.)
  content: React.ReactNode; // Что показать в тултипе
  params?: {
    offset?: number;
    arrowSize?: number;
    location?: "top" | "bottom";
    delay?: number; // пока оставим на будущее...
  };
}

const useEff = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export const Tooltip = ({ children, content, params = {} }: TooltipProps) => {
  const { offset = 12, arrowSize = 0, location = "bottom" } = params;
  const [isShown, setIsShown] = useState(false);
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, arrow: { x: 'center', y: 'top' } });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
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

  useEff(() => {
    if (
      showPortal &&
      tooltipRef.current &&
      contentRef.current &&
      arrowRef.current
    ) {
      let bgColor = window.getComputedStyle(contentRef.current).backgroundColor;

      if (bgColor === "transparent" || bgColor === "rgba(0, 0, 0, 0)") {
        const firstChild = contentRef.current.firstElementChild as HTMLElement;
        if (firstChild) {
          bgColor = window.getComputedStyle(firstChild).backgroundColor;
        }
      }

      if (
        bgColor &&
        bgColor !== "transparent" &&
        bgColor !== "rgba(0, 0, 0, 0)"
      ) {
        arrowRef.current.style.backgroundColor = bgColor;
      }
    }
  }, [showPortal, content]);

  // Функция закрытия с задержкой
  const hideWithDelay = () => {
    timerRef.current = setTimeout(() => {
      setIsShown(false);
      setCoords({ x: 0, y: 0, arrow: { x: "center", y: "top" } }); // Сброс координат
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
        className="sr-wrapper"
        onMouseEnter={cancelHide}
        onMouseLeave={hideWithDelay}
      >
        {children}
      </div>
      {showPortal &&
        createPortal(
          <div
            ref={tooltipRef}
            className="sr-tooltip"
            onMouseEnter={cancelHide}
            onMouseLeave={hideWithDelay}
            style={
              coords.x === 0
                ? {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    opacity: 0,
                    pointerEvents: "none",
                    maxWidth: "300px",
                  }
                : ({
                    left: coords.x,
                    top: coords.y,
                    opacity: 1,
                    "--sr-arrow-size": `${arrowSize}px`,
                  } as React.CSSProperties)
            }
          >
            <div ref={contentRef} style={{ display: "contents" }}>
              {content}
            </div>
            {arrowSize !== 0 && (
              <div
                ref={arrowRef}
                className={`sr-arrow sr-arrow-${coords.arrow.x} sr-arrow-${coords.arrow.y}`}
              />
            )}
          </div>,
          portal,
        )}
    </>
  );
}; 

type ArrowPosition = {
  x: 'left' | 'center' | 'right';
  y: 'top' | 'bottom';
}

export function getTooltipCoordsDynamic(anchor: HTMLElement, tooltip: HTMLElement, offset: number) {
  const anchorRect = anchor.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const padding = 16; // Отступ от краев экрана
  
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const arrow: ArrowPosition  = { x: 'center', y: 'top' };

  // Горизонталь (центрирование)
  let x = anchorRect.left + scrollX + anchorRect.width / 2 - tooltipRect.width / 2;

  // Ограничение по правому краю
  if (x + tooltipRect.width + padding > window.innerWidth + scrollX) {
    x = window.innerWidth + scrollX - tooltipRect.width - padding * 2;
    arrow.x = 'right';
  }

  // Ограничение по левому краю
  if (x < scrollX + padding) {
    x = scrollX + padding;
    arrow.x = 'left';
  }

  // Вертикаль
  let y = anchorRect.bottom + scrollY + offset;
  const spaceBelow = window.innerHeight - anchorRect.bottom;
  const spaceAbove = anchorRect.top;

  // Если снизу места меньше, чем высота тултипа, и сверху места больше, чем снизу
  if (spaceBelow < tooltipRect.height + offset && spaceAbove > spaceBelow) {
    y = anchorRect.top + scrollY - tooltipRect.height - offset;
    arrow.y = 'bottom';
  }

  return { x, y, arrow };
}

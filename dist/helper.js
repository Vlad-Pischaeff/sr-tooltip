export function getTooltipCoordsDynamic(anchor, tooltip, offset, location) {
    const anchorRect = anchor.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const padding = 16; // Отступ от краев экрана
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const arrow = { x: 'center', y: 'top' };
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
    // let y = anchorRect.bottom + scrollY + offset;
    // const spaceBelow = window.innerHeight - anchorRect.bottom;
    // const spaceAbove = anchorRect.top;
    // console.log('..1.', anchorRect.top, scrollY, tooltipRect.height)
    // // Если снизу места меньше, чем высота тултипа, и сверху места больше, чем снизу
    // if (spaceBelow < tooltipRect.height + offset && spaceAbove > spaceBelow) {
    //   y = anchorRect.top + scrollY - tooltipRect.height - offset;
    //   arrow.y = 'bottom';
    // }
    // return { x, y, arrow };
    // 2. Вертикальный расчет с учетом свободного места
    const spaceBelow = window.innerHeight - anchorRect.bottom;
    const spaceAbove = anchorRect.top;
    const neededHeight = tooltipRect.height + offset;
    // Определяем желаемую позицию на основе параметра placement
    let finalLocation = location;
    if (location === 'top') {
        // Если хотим сверху, но там нет места, а снизу места БОЛЬШЕ — переворачиваем вниз
        if (spaceAbove < neededHeight && spaceBelow > spaceAbove) {
            finalLocation = 'bottom';
        }
    }
    else {
        // Если хотим снизу (default), но там нет места, а сверху места БОЛЬШЕ — переворачиваем вверх
        if (spaceBelow < neededHeight && spaceAbove > spaceBelow) {
            finalLocation = 'top';
        }
    }
    // Расчет финальных координат 'y' и направления стрелки
    let y = 0;
    if (finalLocation === 'top') {
        y = anchorRect.top + scrollY - neededHeight;
        arrow.y = 'bottom'; // Стрелка тултипа смотрит вниз, на элемент
    }
    else {
        y = anchorRect.bottom + scrollY + offset;
        arrow.y = 'top'; // Стрелка тултипа смотрит вверх, на элемент
    }
    return { x, y, arrow };
}
//# sourceMappingURL=helper.js.map
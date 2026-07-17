# sr-tooltip

A lightweight tooltip component for **React** and **Next.js (12+)** with automatic portal creation and zero CSS imports.

## Features

- ✅ Works with **React** and **Next.js 12+**
- ✅ No CSS file import required
- ✅ Tooltip is rendered through a portal
- ✅ Automatic arrow positioning
- ✅ Configurable offset and arrow size
- ✅ User has full control over tooltip appearance

---

## Requirements

- React
- Next.js 12 or newer (also works in regular React applications)

> **Note:** This package is primarily designed for React and Next.js applications. It is not intended to be a universal tooltip solution for every framework.

---

## Limitations

This library intentionally keeps the implementation simple.

- Tooltips can be positioned **only above or below** the target element (`top` / `bottom`).
- Left and right placement are not supported.

---

## Styling

The library intentionally provides **no default visual styling** for the tooltip itself.

This means:

- background
- border
- padding
- typography
- shadows
- border radius

are completely controlled by your own component.

This makes the tooltip easy to integrate into any design system without overriding built-in styles.

### Arrow color

One current limitation is that the arrow color must be specified separately:

```tsx
params={{
  arrowColor: '#f1f3fa'
}}
```

The arrow color should match your tooltip background.

Although this requires one additional property, the advantage is that **you don't need to create or position the arrow yourself**—the library handles its rendering and positioning automatically.

---

## No CSS imports

Unlike many tooltip libraries, **you don't need to import any stylesheet**.

Simply install the package and use the component. Required internal styles are injected automatically.

---

## Example tooltip content

A tooltip can contain **any React component**.

```tsx
const TooltipContent = ({ data }) => (
  <div
    style={{
      background: '#f1f3fa',
      padding: '10px 14px',
      borderRadius: 8,
      boxShadow: '0 6px 20px rgba(0,0,0,.15)',
      color: '#333',
      maxWidth: 260,
    }}
  >
    <strong>{data.title}</strong>
    <div>{data.description}</div>
  </div>
);
```

---

## Usage

```tsx
import { Tooltip as SrTooltip } from 'sr-tooltip';

<SrTooltip
  params={{
    offset: 8,
    arrowSize: 10,
    arrowColor: '#f1f3fa',
  }}
  content={<TooltipContent data={data} />}
>
  <div className={styles.tag}>
    {some_data}
  </div>
</SrTooltip>
```

---

## Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactElement` | Element that triggers the tooltip |
| `content` | `ReactNode` | Tooltip content |
| `params.offset` | `number` | Distance between target and tooltip |
| `params.arrowSize` | `number` | Arrow size in pixels (`0` disables arrow) |
| `params.arrowColor` | `string` | Arrow color |
| `params.location` | `'top' \| 'bottom'` | Tooltip position |
| `params.delay` | `number` | *(Reserved for future use)* |

---

## Advantages

- No stylesheet imports
- Minimal API
- Fully customizable appearance
- Automatic portal creation
- Automatic tooltip positioning
- Automatic arrow positioning
- Lightweight implementation

---

## Future improvements

Potential future enhancements include:

- Left / right positioning
- Automatic arrow color detection
- Better collision detection near viewport edges
- Animation customization

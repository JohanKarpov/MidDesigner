# Figma -> Game Layout Pipeline (No API)

This pipeline lets you design UI containers in Figma, export CSS manually, convert it to a layout object, and apply it in-game.

## 1) What to design in Figma
Use [design-pipeline/containers-catalog.md](containers-catalog.md).
Create one frame for 9:16 and one for fallback mobile.
Name layers using exact selectors from the catalog (`#id` preferred).

## 2) Export from Figma (without API)
1. Open Dev Mode / Inspect in Figma.
2. Select a layer.
3. Copy CSS block (position + size + typography).
4. Paste CSS blocks into `design-pipeline/figma-export.raw.css`.

Expected block example:

```css
#generate-btn {
  left: 50%;
  bottom: 8%;
  width: 54%;
  font-size: 2.4vh;
}
```

## 3) Convert CSS to runtime overrides
Run in PowerShell from project root:

```powershell
./tools/figma-css-to-layout.ps1
```

This creates/updates:
- `design-pipeline/layout-overrides.generated.js`

## 4) Enable overrides in game
Open `layout-overrides.js` and set:

```js
enabled: true
```

Then paste generated selectors into `elements` (or copy from generated file).

## 5) Runtime behavior
`script.js` applies overrides on init after elements are available.

Supported keys per selector:
- `left`, `right`, `top`, `bottom`
- `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`
- `transform`, `zIndex`, `display`, `opacity`
- `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `textAlign`
- Any valid inline style key in camelCase

## 6) Notes
- Prefer `%` values for responsive layout.
- Keep visuals in CSS; use overrides mostly for geometry/typography.
- You can keep multiple presets by duplicating `layout-overrides.js`.

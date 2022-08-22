export const colors = {
  '#FFF': '#FFF',
  '#000': '#000',
  '#D3D3D3': '#D3D3D3',
  '#C3C3C3': '#C3C3C3',
  '#1E2124': '#1E2124',
  '#0072B1': '#0072B1',
  '#FA4343': '#FA4343',
  '#333637': '#333637',
};

export const hexToRGB = (color: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const hex = color.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  // Get the result as an array
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) ?? [];
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return result.length > 0 ? { r, g, b } : {};
};

export const applyColorTransparency = (color: string, transparency: number = 0.5) => {
  const { r, g, b } = hexToRGB(color);
  return `rgba(${r ?? ''}, ${g ?? ''}, ${b ?? ''}, ${transparency})`;
};

export type ApplyColorTransparencyFn = typeof applyColorTransparency;

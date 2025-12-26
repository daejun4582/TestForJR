/**
 * Layout Design Tokens
 * Spacing, Radius, Shadow, Breakpoints
 */

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '56px',
} as const;

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '19px',
} as const;

export const shadow = {
  card: '0px 2px 8px rgba(0, 0, 0, 0.08)',
  sidebar: '2px 0px 8px rgba(0, 0, 0, 0.05)',
} as const;

export const breakpoints = {
  mobile: '480px',
  tablet: '1024px',
  desktop: '1025px',
} as const;

export const layout = {
  sidebar: {
    width: '272px',
    padding: '60px',
  },
  card: {
    padding: '24px',
    borderRadius: '8px',
  },
  border: {
    default: '1px solid #64748B',
    light: '0.5px solid #64748B',
  },
} as const;


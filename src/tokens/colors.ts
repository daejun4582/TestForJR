/**
 * Color Design Tokens
 * Extracted from Figma design system
 */

export const colors = {
  // Primary Blue
  primary: {
    blue: '#3B6CFF',
    tintBlue: '#DBEAFE',
    bg70: 'rgba(243, 250, 255, 0.7)',
  },

  // Cool Gray Scale
  gray: {
    cg10: '#F8FAFC',
    cg20: '#F1F5F9',
    cg50: '#94A3B8',
    cg60: '#64748B',
    cg70: '#475569',
    cg80: '#334155',
    cg90: '#1E293B',
  },

  // Black Scale
  black: {
    black100: '#FEFEFE',
    black600: '#7F7F7F',
    black1000: '#1A1A1A',
  },

  // Schedule Colors
  schedule: {
    red: {
      bg: '#FFECEE',
      border: '#FF939F',
    },
    green: {
      bg: '#EAF1EE',
      border: '#78C4A3',
    },
    blue: {
      bg: '#ECF4FF',
      border: '#9EC9FB',
    },
  },

  // Background
  background: {
    white: '#FFFFFF',
    lightGray: '#FAFAFA',
    lightBlue: '#DCEBFF',
  },

  // Text
  text: {
    primary: '#1A1A1A',
    secondary: '#475569',
    tertiary: '#94A3B8',
    disabled: '#CACACA',
  },
} as const;


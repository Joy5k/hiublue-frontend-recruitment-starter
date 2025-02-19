import { Barlow, Public_Sans } from 'next/font/google';

// ----------------------------------------------------------------------

// Convert rem value to pixels
export function remToPx(value: string) {
  const numberValue = parseFloat(value);
  if (isNaN(numberValue)) {
    console.warn('Invalid value provided for remToPx:', value);
    return 0; // Return 0 if the value is invalid
  }
  return Math.round(numberValue * 16); 
}

// Convert px value to rem
export function pxToRem(value: number) {
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    console.warn('Invalid value provided for remToPx:', value);
    return 0; // Return 0 if the value is invalid
  }
  return `${value / 16}rem`; // Convert px to rem (16px = 1rem)
}

// Responsive font sizes for different screen widths
export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  // Ensure all font size values are valid numbers
  if (![sm, md, lg].every(val => typeof val === 'number')) {
    throw new Error('Invalid font size values. Ensure all values are numbers.');
  }
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontSecondaryFamily: React.CSSProperties['fontFamily'];
    fontWeightSemiBold: React.CSSProperties['fontWeight'];
  }
}

// Fonts imported from Google
export const primaryFont = Public_Sans({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const secondaryFont = Barlow({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// ----------------------------------------------------------------------

// Typography styles for the project
export const typography = {
  fontFamily: primaryFont.style.fontFamily,
  fontSecondaryFamily: secondaryFont.style.fontFamily,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'unset',
  },
} as const;

export const fonts = {
  inter: {
    regular: '/fonts/Inter-Regular.ttf',
    medium: '/fonts/Inter-Medium.ttf',
    semibold: '/fonts/Inter-SemiBold.ttf',
    bold: '/fonts/Inter-Bold.ttf',
  },
  montserrat: {
    regular: '/fonts/Montserrat-Regular.ttf',
    medium: '/fonts/Montserrat-Medium.ttf',
    semibold: '/fonts/Montserrat-SemiBold.ttf',
    bold: '/fonts/Montserrat-Bold.ttf',
  }
} as const;

export type FontFamily = keyof typeof fonts;
export type FontWeight = keyof typeof fonts[FontFamily];

export interface FontConfig {
  family: FontFamily;
  weight: FontWeight;
  path: string;
}

export function getFontConfig(family: FontFamily, weight: FontWeight): FontConfig {
  return {
    family,
    weight,
    path: fonts[family][weight]
  };
}

// Configuración predeterminada para facturas
export const invoiceFonts = {
  title: getFontConfig('montserrat', 'bold'),
  heading: getFontConfig('montserrat', 'semibold'),
  body: getFontConfig('inter', 'regular'),
  emphasis: getFontConfig('inter', 'medium'),
};

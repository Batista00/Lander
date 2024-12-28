export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  muted: string;
}

export interface ThemeTypography {
  fontFamily: {
    heading: string;
    body: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    bold: string;
  };
}

export interface ThemeSpacing {
  container: {
    padding: string;
    maxWidth: string;
  };
  section: {
    padding: string;
    margin: string;
  };
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  components: {
    [key: string]: {
      variants: {
        [key: string]: string;
      };
      defaultVariant: string;
    };
  };
}

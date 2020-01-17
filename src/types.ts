export interface Theme {
  fonts: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    button: string;
    caption: string;
    overline: string;
    subtitle1: string;
    subtitle2: string;
    body1: string;
    body2: string;
  };
  colors: {
    /**
     * the main brand color of your application
     */
    brand: string;
    accent: string;
    danger: string;
    warning: string;
    info: string;
    bland: string;
    surface: string;
  };
  durations: {
    short: number;
    standard: number;
    long: number;
  };
  shadows: {
    subtle: string;
    standard: string;
    emphasis: string;
  };

  // spacing units
  space: (n: number) => string;
  gap: (n: number) => string;
  block: (n: number) => string;
  golden: (n: number) => string;
}

export interface DynamicColorPalette {
  asBackground: string;
  onSurface: string;
  bgContrast: string;
}

export type PropsOf<T> = T extends React.ComponentType<infer U> ? U : never;

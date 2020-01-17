// @pragma export
import { Theme } from './types';
import css from './css';

const golden = (n: number) => `${n ** 1.618 * 16 + 5}px`;

const defaultTheme: Theme = {
  fonts: {
    button: css`
      font-size: 0.75rem;
      font-weight: bold;
      text-transform: uppercase;
    `,
    caption: css`
      font-size: 0.75rem;
    `,
    h1: css`
      font-size: ${golden(4)};
      font-weight: bold;
      margin: 0;
    `,
    h2: css`
      font-size: ${golden(3)};
      font-weight: bold;
      margin: 0;
    `,
    h3: css`
      font-size: ${golden(2)};
      font-weight: bold;
      margin: 0;
    `,
    h4: css`
      font-size: ${golden(1)};
      font-weight: bold;
      line-height: 1.5;
      margin: 0;
    `,
    // TODO
    overline: css``,
    subtitle1: css`
      font-size: ${golden(2)};
      font-weight: bold;
      color: #444;
      margin: 0;
    `,
    subtitle2: css`
      font-size: ${golden(1)};
      font-weight: bold;
      color: #444;
      margin: 0;
    `,
    body1: css`
      font-size: 16px;
      margin: 0;
    `,
    body2: css`
      font-size: 16px;
      margin: 0;
      color: #444;
    `,
  },
  colors: {
    brand: '#000',
    accent: '#2962ff',
    bland: '#ccc',
    danger: '#eb002b',
    warning: '#f56200',
    info: '#2962ff',
    surface: '#fff',
  },
  durations: {
    short: 100,
    standard: 250,
    long: 500,
  },
  shadows: {
    subtle: '0 0 10px 0 rgba(0,0,0,0.10)',
    standard: '0 0 20px 0 rgba(0,0,0,0.13)',
    emphasis: '0 0 30px 0 rgba(0,0,0,0.13)',
  },
  space: n => `${n * 16}px`,
  gap: n => `${n * 48}px`,
  block: n => `${n * 96}px`,
  golden,
};

export default defaultTheme;

export type Sizes = {
  small: number;
  medium: number;
  large: number;
  huge: number;
};

const size: Sizes = {
  small: 16,
  medium: 20,
  large: 30,
  huge: 42,
};

const letterSpacing: Sizes = {
  small: 2,
  medium: 5,
  large: 10,
  huge: 15,
};

const family = 'SF-Pro-Text-Bold';

export type Typography = {
  size: Sizes;
  letterSpacing: Sizes;
  family: string;
};

export const typography: Typography = {size, letterSpacing, family};

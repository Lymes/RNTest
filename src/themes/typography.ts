export type Sizes = {
  small: number;
  medium: number;
  large: number;
  huge: number;
};

export type Families = {
  bold: string;
  light: string;
  medium: string;
  regular: string;
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

const family = {
  bold: 'SF-Pro-Text-Bold',
  light: 'SF-Pro-Text-Light',
  medium: 'SF-Pro-Text-Medium',
  regular: 'SF-Pro-Text-Regular',
};

export type Typography = {
  size: Sizes;
  letterSpacing: Sizes;
  family: Families;
};

export const typography: Typography = {size, letterSpacing, family};

// Colors palette source https://flatuicolors.com/palette/defo

const SUN_FLOWER = '#f1c40f';
const ASBESTOS = '#7f8c8d';
const MIDNIGHT_BLUE = '#2c3e50';
const EMERALD = '#2ecc71';
const ALIZARIN = '#e74c3c';
const CLOUDS = '#ecf0f1';
const SILVER = '#bdc3c7';
const BLUE = '#3275df';

export type Colors = {
  primary: string;
  secondary: string;
  background: string;
  primaryBackground: string;
  secondaryBackground: string;
  drawerBackground: string;
  cardBackground: string;
  borderColor: string;
  error: string;
};

const light: Colors = {
  primary: 'black',
  secondary: SILVER,
  background: 'white',
  primaryBackground: BLUE,
  secondaryBackground: ASBESTOS,
  drawerBackground: MIDNIGHT_BLUE,
  cardBackground: SUN_FLOWER,
  borderColor: 'grey',
  error: 'red',
};

const dark = {
  primary: 'white',
  secondary: 'grey',
  background: 'black',
  primaryBackground: BLUE,
  secondaryBackground: ASBESTOS,
  drawerBackground: MIDNIGHT_BLUE,
  cardBackground: SUN_FLOWER,
  borderColor: 'grey',
  error: 'red',
};

export const colors = {light, dark};

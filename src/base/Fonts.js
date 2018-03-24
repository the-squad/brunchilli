const FontTypes = {
  BigTitle: 'bigTitle',
  Title: 'title',
  Heading: 'heading',
  Body: 'body',
  Caption: 'caption',
};

const Fonts = {
  primary: 'IBM Plex Sans',
  secondary: 'Roboto',
};

const FontWieghts = {
  semiBold: 600,
  normal: 500,
  light: 400,
};

const FontSizes = {
  [FontTypes.BigTitle]: '30px',
  [FontTypes.Title]: '20px',
  [FontTypes.Heading]: '16px',
  [FontTypes.Body]: '14px',
  [FontTypes.Caption]: '12px',
};

export default FontSizes;
export { FontWieghts, Fonts, FontSizes, FontTypes };

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 600,
  useWebWorker: true,
};

const colors = {
  primaryColor: '#e368d9',
  validColor: '#2d9c2d',
  validColorLight: '#94ff94',
  invalidColor: '#ca4949',
  invalidColorLight: '#f9bcbc',
};

const categories = ['maths', 'it', 'english', 'riddles'];

const categoryToColor = new Map([
  ['maths', '#ea80ff'],
  ['it', '#7aff81'],
  ['english', '#8080ff'],
  ['riddles', '#e6e84d'],
]);

const responseTypes = {
  success: 'success',
  error: 'error',
};

const prefferedImageExtensions = ['image/png', 'image/jpg', 'image/jpeg'];

export {
  compressionOptions,
  prefferedImageExtensions,
  colors,
  categoryToColor,
  categories,
  responseTypes,
};

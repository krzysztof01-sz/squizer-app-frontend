export const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 600,
  useWebWorker: true,
};

export const colors = {
  primaryColor: '#e368d9',
};

export const categories = ['maths', 'it', 'english', 'riddles'];

export const categoryToColor = new Map([
  ['maths', '#ea80ff'],
  ['it', '#7aff81'],
  ['english', '#8080ff'],
  ['riddles', '#e6e84d'],
]);

export const responseTypes = {
  success: 'success',
  error: 'error',
};

export const prefferedImageExtensions = ['image/png', 'image/jpg', 'image/jpeg'];

export const maxDescrptionLengthOnCard = 80;

export const emojiCupsMap = new Map([
  [1, '🥇'],
  [2, '🥈'],
  [3, '🥉'],
]);

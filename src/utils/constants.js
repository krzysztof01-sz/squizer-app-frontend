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

const prefferedImageExtensions = ['image/png', 'image/jpg', 'image/jpeg'];

export { compressionOptions, prefferedImageExtensions, colors };

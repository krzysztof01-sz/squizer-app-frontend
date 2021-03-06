export const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 600,
  useWebWorker: true,
};

// colors copied from variables.scss file
export const colors = {
  valid: '#2d9c2d',
  invalid: '#ca4949',
  primary: '#fbc02d',
};

export const maxCommentLength = 500;

export const navItems = [
  {
    route: '/quizform',
    text: 'add a new quiz',
  },
  {
    route: '/ranking',
    text: 'ranking',
  },
  {
    route: '/profile',
    text: 'user profile',
  },
  {
    route: '/about',
    text: 'about',
  },
];

export const quizCategories = ['English', 'General knowledge', 'Geography', 'IT', 'Maths', 'Riddles', 'Science', 'Other'];

export const categoryToColor = new Map([
  ['English', '#F7BA89'],
  ['General knowledge', '#7E401E'],
  ['Geography', '#608740'],
  ['IT', '#EB8768'],
  ['Maths', '#D7E0E2'],
  ['Riddles', '#DDE5E7'],
  ['Science', '#52cfe5'],
  ['Other', '#5E7592'],
]);

export const responseTypes = {
  success: 'success',
  error: 'error',
};

export const photoTypes = {
  custom: 'custom',
  default: 'default',
};

export const prefferedImageExtensions = ['image/png', 'image/jpg', 'image/jpeg'];

export const maxDescriptionLengthOnCard = 80;
export const maxTitleLengthOnCard = 50;

export const emojiCupsMap = new Map([
  [1, '🥇'],
  [2, '🥈'],
  [3, '🥉'],
]);

export const unauthenticatedRoutes = ['/login', '/', '/signup'];

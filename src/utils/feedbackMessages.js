// signing up

const NICKNAME_SHORT = 'Nickname is too short';
const NICKNAME_LONG = 'Nickname is too long';
const NICKNAME_REQUIRED = 'Nickname is required';
const USER_PHOTO_REQUIRED = 'User photo is required';

const PASSWORD_SHORT = 'Password is too short';
const PASSWORD_LONG = 'Password is too long';
const PASSWORD_REQUIRED = 'Password is required';
const DIFFERENT_PASSWORDS = 'Passwords are not the same';

const PHOTO_SAVED_IN_DB = 'Photo saved successfully!';
const PHOTO_COMPRESSING_ERROR =
  'Compression has failed Try to upload a photo with a smaller file size';
const PHOTO_EXTENSION_ERROR = 'Choose a file with a right extension (jpg, jpeg or png)';
const PHOTO_COMPESSING_START = 'Photo compressing...';
const CHOOSE_YOUR_PHOTO = 'Choose your profile photo';

const REGISTERING_PROCESS = 'Registering...';

// logging

const LOGGING_PROCESS = 'Logging...';
const LOGOUT_CONFIRMATION = 'Do you want to log out?';

// authentication

const JWT_ACCESS_DENIED = 'Access denied. Login first';

// quiz form validation messages

const QUESTION_REPEATED = 'The question was repeated';
const NOT_ALL_FILLED = 'You did not fill all the fields';
const NOT_UNIQUE_ANSWERS = 'The answers are not unique';
const FILL_ALL_DATA = 'Fill all data about the quiz';

// other

const PAGE_DOESNT_EXISTS = `Page doesn't exists`;

export {
  NICKNAME_SHORT,
  NICKNAME_LONG,
  NICKNAME_REQUIRED,
  PASSWORD_SHORT,
  PASSWORD_LONG,
  PASSWORD_REQUIRED,
  DIFFERENT_PASSWORDS,
  USER_PHOTO_REQUIRED,
  PHOTO_COMPRESSING_ERROR,
  PHOTO_EXTENSION_ERROR,
  PHOTO_SAVED_IN_DB,
  PHOTO_COMPESSING_START,
  CHOOSE_YOUR_PHOTO,
  LOGGING_PROCESS,
  LOGOUT_CONFIRMATION,
  JWT_ACCESS_DENIED,
  REGISTERING_PROCESS,
  QUESTION_REPEATED,
  NOT_ALL_FILLED,
  NOT_UNIQUE_ANSWERS,
  FILL_ALL_DATA,
  PAGE_DOESNT_EXISTS,
};

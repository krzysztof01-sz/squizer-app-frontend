# sQuizer - a full-stack JavaScript quiz application.

This repository contains only a frontend part of the whole project.

## How to start the app?

The application is available on: [https://squizer.ct8.pl](https://squizer.ct8.pl).

If you want to run it on your machine:
- download Node.js [from this link](https://nodejs.org/en/download/) if you don't have it installed yet
- clone this repository
- open folder with the project in your editor
- open bash terminal
- run **npm install** to install all the necessary packages
- run **npm start** to run the application in the development mode

## Testing credentials

I've created 5 users for the testing reasons. Every user has a:
- nickname created according to the pattern: user[id] (where id is the number from 1-5)
- password created according to the pattern: user[id]123

So, if you want to login as a user3, the password is: user3123.

## sQuizer v2.0 - new features

- Quizzes rating - now, you can rate visited quizzes, the average rate is visible in the "about quiz" subpage.
- Quizzes creator - your form data is now kept in the localStorage, so you don't need to worry about disappearing data. Added UI improvements.
- Added better loader and error handling
- Auto logging after successful registration
- Comments updating and deleting
- Added "visited" badge in the quiz card to inform that you've solved some quiz.
- Removed login form validation on the client side
- Added different subtle UI corrections
- Authentication and authorization security improvements + fixed bug with authentication.

## Implemented features:
- Login and registration
- Dashboard with quizzes cards + keleton loading
- Adding and deleting quizzes
- Playing in quizzes
- Scoring, statistics and ranking system
- Adding comments
- Basic accessibility and security
- Adding and managing your avatar

## Why did I create sQuizer?

My goal was to learn how to communicate with a backend using React, implement my own authentication, authorization, security and accessibility. So, I decided to make a small project which later became more complex. Finally, I've learned a lot of things, even those I didn't mean from the beginning.

## Technology stack (frontend only)
- React.js (react-router, react-hook-form + yup validation)
- SASS
- Firebase
- Axios
- Browser-image-compression
- Material UI (for skeleton loading)
- Font-awesome icons
- Undraw SVGs

## Tools
- Webpack
- Babel
- Prettier
- ESLint
- Autoprefixer

## Designing
- Figma

## Exemplary screenshots

![Dashboard](https://github.com/krzysztof01-sz/squizer-app-frontend/blob/main/screenshots/dashboard.png)

![User profile](https://github.com/krzysztof01-sz/squizer-app-frontend/blob/main/screenshots/profile.png)

![Ranking](https://github.com/krzysztof01-sz/squizer-app-frontend/blob/main/screenshots/ranking.png)

![Quiz presentation](https://github.com/krzysztof01-sz/squizer-app-frontend/blob/main/screenshots/about-quiz.png)

![Quiz creator](https://github.com/krzysztof01-sz/squizer-app-frontend/blob/main/screenshots/quizform.png)

![Game](https://github.com/krzysztof01-sz/squizer-app-frontend/blob/main/screenshots/quizgame.png)

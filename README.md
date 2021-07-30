# Productivity Hub

![Productivity Hub Landing Page](/resources/landing_page.png)

Client side application to house productivity tools:

- A habit tracker
- A post saver

Note: to be used in conjunction with [productivity-hub-api](https://github.com/nicholaspung/productivity-hub-api)

## Tech Stack

- React
- Redux
- Tailwindcss
- Firebase Authentication
- React Router
- Jest
- GitHub Actions
- Firebase Hosting

## Environment Variables

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_API_ROUTE=
FIREBASE_TOKEN=
```

### Future Features + Needs Work

See the project page [here](https://github.com/nicholaspung/productivity-hub/projects/1)

## Project Setup

1. Clone this repo.
2. Create a Firebase account, create a new project, and enable Firebase Authentication. This account will also be used with [productivity-hub-api](https://github.com/nicholaspung/productivity-hub-api).
   - Go to Settings > General and get the Firebase SDK snippet config for .env
3. Add environment variables to .env file using Firebase settings.
4. `npm install`
5. `npm start`

## Deploying to Firebase Hosting

1. Add your `FIREBASE_TOKEN=` in .env file after logging into your Firebase account
2. Follow instructions on how to connect with Firebase CLI on their official documentation
3. You're done!

## Using GitHub Actions as your CI/CD

1. Add the environment variables in your GitHub project secrets
   - To locate, go to your project repository, click on 'Settings' and find 'Secrets'
2. Add the environment variables in the .env.sample with the values
   - Since this is a front-end application, you can also put the values directly in the correct spot
   - Usable of .env is only to make it easier to understand which values need to be changed easily for different deployments

Note: If you're using GitHub actions, in .env, `FIREBASE_TOKEN=` need not be used. `FIREBASE_TOKEN=` is used for `npm run firebase-deploy`

## Using scripts

`generate-test-files`: A script to generate test files in the `__test__` directory. Follows a specific file structure in order to generate the tests. If file structure deviates from general pattern, script won't work

- `File` that needs tests must be in the same directory as its corresponding `__test__` where `File.spec` is housed
- Currently only allows a single `describe` block in `.spec` file in order to function

## Illustration website

- https://illustrationkit.com/illustrations

## Components used

- https://tailwindui.com/preview
- https://heroicons.com/

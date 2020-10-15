# Productivity Hub

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
3. Add environment variables to .env file using Firebase settings.
4. `npm install`
5. `npm start`

## Deploying to Firebase Hosting

1. Add your `FIREBASE_TOKEN=` in .env file after logging into your Firebase account
2. Follow instructions on how to connect with Firebase CLI
3. You're done!

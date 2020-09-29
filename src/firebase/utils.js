import * as firebase from 'firebase/app';
import 'firebase/auth';

// Google Log-In
export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await firebase.auth().signInWithRedirect(provider);
    return {
      token: result.credential.accessToken,
      user: result.user,
    };
  } catch (err) {
    return {
      code: err.code,
      message: err.message,
      email: err.email,
      credential: err.credential,
    };
  }
};

// Sign In Anonymously
export const signInAnonymously = async () => {
  try {
    await firebase.auth().signInAnonymously();
    return {};
  } catch (err) {
    return {
      code: err.code,
      message: err.message,
      email: err.email,
      credential: err.credential,
    };
  }
};

// Auth State Changed
export const onAuthStateChange = async (
  next,
  fallback,
  beforeAction = () => {},
) => {
  beforeAction();
  firebase.auth().onAuthStateChanged((user) => {
    let isAnonymous;
    let uid;
    if (user) {
      isAnonymous = user.isAnonymous;
      uid = user.uid;
      next({ isAnonymous, uid });
    } else {
      fallback();
    }
  });
};

// Log out
export const signOut = () => {
  firebase.auth().signOut();
};

// Get ID Token
export const getIdToken = async () => {
  try {
    const idToken = await firebase
      .auth()
      .currentUser.getIdToken(/* forceRefreshs */ true);
    return idToken;
  } catch (err) {
    return {
      code: err.code,
      message: err.message,
      email: err.email,
      credential: err.credential,
    };
  }
};

// Link anonymous account with Google
// const credential = firebase.auth.GoogleAuthProvider.credential(
//   googleUser.getAuthResponse().id_token
// );
// firebase.auth.currentUser
//   .linkWithCredential(credential)
//   .then((usercred) => {
//     const user = usercred.user;
//     console.log("Anonymous account successfully upgraded", user);
//   })
//   .catch((err) => {
//     console.log("Error upgrading anonymous account", error);
//   });

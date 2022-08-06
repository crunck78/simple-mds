// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'simple-mds',
    appId: '1:798164865035:web:e0c500eb8d75616bcdf70e',
    storageBucket: 'simple-mds.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyBI1eiIPd2w2xXECEt5ntc4mnWvoBIzRDQ',
    authDomain: 'simple-mds.firebaseapp.com',
    messagingSenderId: '798164865035',
    measurementId: 'G-152W54SMHV',
  },
  ngxauthfirebaseui: {
    enableFirestoreSync: true, // enable/disable autosync users with firestore
    toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
    toastMessageOnAuthError: true, // whether to open/show a snackbar message on auth error - default : true
    // authGuardFallbackURL: '/(mainSide:auth)', // url for unauthenticated users - to use in combination with canActivate feature on a route
    // authGuardLoggedInURL: '/workspace', // url for authenticated users - to use in combination with canActivate feature on a route
    passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
    passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
    // Same as password but for the name
    nameMaxLength: 50,
    nameMinLength: 2,
    // If set, sign-in/up form is not available until email has been verified.
    // Plus protected routes are still protected even though user is connected.
    // guardProtectedRoutesUntilEmailIsVerified: true,
    // enableEmailVerification: true, // default: true
    useRawUserCredential: true, // If set to true outputs the UserCredential object instead of firebase.User after login and signup - Default: false
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

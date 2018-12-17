// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDyyvLXBYg95v5Bf34l0_aLM61JjgG0jV8",
    authDomain: "ebooksden-4c77a.firebaseapp.com",
    databaseURL: "https://ebooksden-4c77a.firebaseio.com",
    projectId: "ebooksden-4c77a",
    storageBucket: "ebooksden-4c77a.appspot.com",
    messagingSenderId: "690754521255"
  },
  externalPath:'http://libgen.io/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

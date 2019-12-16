// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // http://172.17.12.143:8300/thc/users/check/{username}

  apiUrl: 'http://172.17.12.143:8300/thc',
  // apiUrl: 'http://172.17.5.45:8090',
  localURL: ' https://e5b09703.ngrok.io'
};

/* 20224
 * For easier  in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *  
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
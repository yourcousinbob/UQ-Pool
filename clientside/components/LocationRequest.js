/* based on the blog:
https://javascript.plainenglish.io/react-native-foreground-service-f7fc8e617fba

The below is required to not timeout when the app is in background mode.

More info on:
https://itnext.io/react-native-background-location-tracking-without-timeout-and-with-app-killed-3dbfbc80ad01
*/


import { PermissionsAndroid } from 'react-native';

//request location permission before starting the service.
const backgroundgranted = await PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
  {
    title: 'Background Location Permission',
    message:
      'UQ-pool requires location to allow riders and drivers to find each other' +
      'and get live quality updates.',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  },
);
if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
  //continue
}
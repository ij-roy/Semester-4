First, add the google-services plugin as a dependency inside of your /android/build.gradle file:

buildscript {
  dependencies {
    // ... other dependencies
    // NOTE: if you are on react-native 0.71 or below, you must not update
    //       the google-services plugin past version 4.3.15 as it requires gradle >= 7.3.0
    classpath 'com.google.gms:google-services:4.4.2'
    // Add me --- /\
  }
}

Lastly, execute the plugin by adding the following to your /android/app/build.gradle file:

apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services' // <- Add this line
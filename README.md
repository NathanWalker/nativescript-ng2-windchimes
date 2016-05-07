# NativeScript Windchimes Sample

This repo contains a NativeScript-built app for creating windchimes with Angular 2. The app was inspired by [Tero Parviainen’s talk at ng-conf 2016](https://www.youtube.com/watch?v=vsl5O4ps7LE), and the initial version of this application was built in three hours—all to show how easy it is to take an Angular-2-built web app and run it on iOS and Android using NativeScript.

![](http://i.imgur.com/c453yP3.gif)

> Note: The gif doesn’t do the app justice. To see the app with sound either [watch the app on YouTube](https://www.youtube.com/watch?v=DliOcLTvr_A), or download it from Google Play with the link below.

[![](https://github.com/NativeScript/sample-Groceries/raw/master/assets/app-store-icons/google-play.png)](https://play.google.com/store/apps/details?id=org.nativescript.nativescriptng2windchimes&hl=en)

## Development

To run the NativeScript Windchime sample you complete the [NativeScript system setup](http://docs.nativescript.org/angular/tutorial/ng-chapter-1.html#11-install-nativescript-and-configure-your-environment) on your development machine. After that clone this repo:

```
git clone https://github.com/NathanWalker/nativescript-ng2-windchimes.git
cd nativescript-ng2-windchimes.git
```

Run `tns install` to install all of this app’s dependencies:

```
tns install
```

And then use the `tns run` command to see the app in action:

```
tns run ios --emulator
tns run android --emulator
```

Finally, use the `tns livesync` command to setup a watcher that will automatically push out your changes:

```
tns livesync ios --emulator --watch
tns livesync android --emulator --watch
```

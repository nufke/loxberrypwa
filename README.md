# loxberrypwa

LoxBerry Progressive Web App (PWA).

This is an [Ionic](https://ionicframework.com/) based PWA to be installed on the [LoxBerry](https://loxwiki.atlassian.net/wiki/spaces/LOXBERRY/overview),  a Raspberry Pi image offering additional features for the [Loxone](https://www.loxone.com/) smart home automation system.

**NOTE: The current version is not production ready.**

## installation

Make sure you have the `nodejs`, `Ionic`, `Angular` and `http-server` packages installed
```
npm i -g @ionic/cli
npm i -g @angular/cli
npm i -g http-server

```
Clone the repository:
```
git clone https://github.com/nufke/loxberrypwa.git
```

Build the web package and launch a web server:
```
cd loxberrypwa
npm i
ionic build --prod
http-server www
```

NOTE: You can build the PWA on your preferred platform (e.g. Linux) and copy the `www` directory to your LoxBerry / Raspberry Pi. In this case, the minimal requirement for the LoxBerry / Raspberry Pi is to have `nodejs` and `http-server` available.

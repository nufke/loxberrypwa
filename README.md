# loxberrypwa

LoxBerry Progressive Web App (PWA).

This is an [Ionic](https://ionicframework.com/) based PWA to be installed on the [LoxBerry](https://loxwiki.atlassian.net/wiki/spaces/LOXBERRY/overview),  a Raspberry Pi image offering additional features for the [Loxone](https://www.loxone.com/) smart home automation system.

This App will interact with the LoxBerry MQTT Broker to enable the creation of a dynamic user interface with contols defined per rooms and category. The controls defined in this App will get their own MQTT topic and control interface, enabling interaction and integration with other  platforms such as Node-RED or IOBroker.

The concept of a Progressive Web App is used to offer a light-weight development and deployment platform. Obviously, the build flow could be extended to create a stand-alone app for mobile usage.

**NOTE: The current version is not production ready.**

## Installation

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

When you would like to use local icons and images, you can store them in the directories `loxberrypwa/src/assets/icons` and `loxberrypwa/src/assets/images` and reference to these directories in the JSON structure, see this [example](https://github.com/nufke/loxberrypwa/wiki/Example). 

Build the web package and launch a web server:
```
cd loxberrypwa
npm i
ionic build --prod
http-server www
```

NOTE: You can build the PWA on your preferred platform (e.g. Linux desktop) and copy the `www` directory to your LoxBerry / Raspberry Pi. In this case, the minimal requirement for the LoxBerry / Raspberry Pi is to have `nodejs` and `http-server` available.

## More information

More information can be found on the [wiki](https://github.com/nufke/loxberrypwa/wiki)
# Build flow

Make sure you have the packages `nodejs`, `Ionic`, `Angular` and `http-server` installed:
```
npm i -g @ionic/cli
npm i -g @angular/cli
npm i -g http-server
```

Clone this repository:
```
git clone https://github.com/nufke/loxberrypwa.git
```

## Build and test the PWA

You can build and test the PWA as follows:
```
cd loxberrypwa
npm i
ionic build --prod
http-server -p 8080 www
```

The PWA is now accessible for testing via a web-browser at `http://localhost:8080`.

## Configure the App and load a structure via MQTT

First, the MQTT broker settings should be configured. Open the menu `Settings` and specify the LoxBerry IP address (which is also the MQTT broker IP address), the MQTT broker websocket port, username and password. If necessary, check the MQTT Gateway (2.x) settings on your LoxBerry.

After the configuration, you can send all controls, rooms and categories to the App, by sending a JSON structure as string to the MQTT topic `/loxberry/app/structure`:

```
/loxberry/app/structure  '{ "controls": { ... },  "categories": { ... }, "rooms": { ... } }'
```

The data model of the JSON obects is given [here](https://github.com/nufke/loxberrypwa/wiki/JSON-data-model). An [example](https://github.com/nufke/loxberrypwa/wiki/Example) is given on the wiki.

After sending the JSON structure, you should see all elements in the App. You can make updates to any of the elements in the JSON structure at any time, by using the same MQTT topic `/loxberry/app/structure` or sending updates to the indivdual elements. The updates are incremental, which means existing objects will be changed and overridden and old objects remain available. To flush all elements in the App, an empty string message should be sent to `/loxberry/app/structure`.

Alternatively, you can update control, room or category elements separately via MQTT. More information is given [here](https://github.com/nufke/loxberrypwa/wiki/MQTT-API).

When you would like to use local icons and images, you can store them in the directories `assets/icons` and `assets/images` and reference to these directories in the JSON structure, see the [example](https://github.com/nufke/loxberrypwa/wiki/Example).
Alternatively, you can also make use of URLs to your favorite icons and images in the JSON structure, e.g. `http:/myserver.org/my_image.svg`.

**TIP 1**: The [Loxone-MQTT Gateway](https://github.com/nufke/node-lox-mqtt-gateway) will create and send the App-specific structure over MQTT, based on the Loxone Miniserver menu structure (`LoxAPP3.json`).

**TIP 2**: It is recommended to reuse the icons stored on your Loxone Miniserver, located in `<miniserver IP>/web/images.zip` (version 13.0 and below) or `<miniserver IP>/sys/IconLibrary.zip`  (from version 13.1 onwards).

## Deploy the PWA

After building and testing the PWA on your development platform (e.g. Linux desktop), copy the `www` directory to your production server (e.g. LoxBerry or Raspberry Pi) and update the configuration of your webserver (e.g. Apache2) to get access to the webpage the PWA is running. Alternatively, you could use `nodejs` and `http-server` to launch the PWA.

**Note that PWA deployment requires secure connections using HTTPS and WSS, which means your webserver and MQTT broker should support this.**
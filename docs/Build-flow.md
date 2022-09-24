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

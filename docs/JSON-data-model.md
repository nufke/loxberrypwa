# JSON data model

The JSON data model is based on the Loxone Miniserver structure file (e.g. `LoxAPP3.json`). To support additional features, extensions and constrols, the data model has been extended.

**_NOTE: JSON data model under development and will change!_**

## Main structure

The overall structure is given below:

```
{
  msInfo: {
    serialNr: string
  },
  controls: { ... },
  cats: { ... },
  rooms: { ... }
}
```

Each section `controls`, `cats` and `rooms` contains an array of elements as specified below.

## Interface for controls

This model is used within the app to manage the properties of the control elements. The elements (keys) in the data model match the MQTT topic names.

Fields indicated with '?' are optional

```
interface Control {
  serialNr: string;                   // serial nr of the device
  uuid: string;                       // unique identifier to identify the control
  uuidAction: string;                 // unique identifier to identify the control action (same as uuid)
  mqtt: string;                       // MQTT topic to send command
  name: string;                       // GUI name of the control
  defaultIcon: string;                // default icon
  defaultRating: number;              // default rating
  icon: {
    href: string;               // location or URL of SVG icon
    color?: string;             // color of icon in RGB hex notation, e.g. #FFFFFF (optional)
  }
  type: string;                       // type of control, e.g., switch, button, slider, etc. See below
  room: string;                       // uuid of room
  cat: string;                        // uuid of category
  isFavorite?: boolean;               // elevate to favorite item (optional)
  isVisible?: boolean;                // make control invisible
  isSecured?: boolean;                // passwd/PIN protected control (optional)
  details: { ... }                    // details of the control (values control dependent)
  states: { ... }                     // states of the control (values control dependent)
  subControls: {
    [key: string]: SubControl;        // subControls
  }
  order?: number[];                   // defines the order for controls (optional)
}
```

### Control types

The control key `type` is a string which defines the style of the control and its associated button(s):

*NOTE: Not all controls are fully functional, see [Status](https://github.com/nufke/loxberrypwa/wiki/Status)*

```
"CentralJalousie           // central sunscreen / shutter control, no button
"CentralLightController"   // central light control, no button
"InfoOnlyAnalog"           // show analog value , no button
"InfoOnlyDigital"          // show digital (2-state) value, no button
"InfoOnlyText"             // show text, no button
"IRoomController"          // room controller, no button
"Jalousie"                 // sunscreen / shutter control, up/down buttons
"LightControllerV2"        // light control, plus buttone
"Pushbutton"               // push button
"Radio"                    // up/down buttons to select state from list-box
"Slider"                   // plus/minus buttons, slider only visible in detailed view
"Switch"                   // toggle switch
"Webpage"                  // button to external link (e.g. webpage, app)
```

The nested JSON structure for the control `details` and `states` depend on the type of control.

## Interface for categories

```
interface Category {
  serialNr: string;                   // serial nr of the device
  uuid: string;                       // unique identifier to identify the category as MQTT topic
  name: string;                       // GUI name
  image: string;                      // default graphic
  icon: {
          href: string;               // location or URL to SVG icon
          color?: string;             // Color in RGB hex notation, e.g. #FFFFFF (optional)
        }
  isFavorite?: boolean;               // make favorite item (optional)
  isVisible?: boolean;                // make category invisible
  isSecured?: boolean;                // passwd/PIN protected control (optional)
  defaultRating: number;              // default rating
  order?: number[];                   // defines the order for categories (optional)
}
```

## Interface for rooms

```
interface Room {
  serialNr: string;                   // serial nr of the device
  uuid: string;                       // unique identifier to identify the room as MQTT topic
  name: string;                       // GUI name
  image: string;                      // default graphic
  icon: {
          href: string;               // URL to SVG icon
          color?: string;             // Color in RGB hex notation, e.g. #FFFFFF (optional)
        }
  isFavorite?: boolean;               // make favorite item (optional)
  isVisible?: boolean;                // make room invisible
  isSecured?: boolean;                // passwd/PIN protected control (optional)
  defaultRating: number;              // default rating
  order?: number[];                   // defines the order for rooms (optional)
}
```

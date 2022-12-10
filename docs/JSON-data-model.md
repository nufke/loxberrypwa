# JSON data model

**NOTE**: JSON data model under development and will change!

## Top-level structure

The overall structure is given below:

```
{
  "controls": { ... },
  "categories": { ... },
  "rooms": { ... }
}
```

Each section `controls`, `categories` and `rooms` contains an array of elements as specified below.

## Data model for controls

This model is used within the app to manage the properties of the control elements. The elements (keys) in the data model match the MQTT topic names.

Fields indicated with '?' are optional

```
{
  hwid: string,                       // hardware identifier of the device
  uuid: string,                       // unique identifier to identify the control as MQTT topic
  mqtt_cmd: string,                   // MQTT topic to send command
  name: string,                       // GUI name
  icon: {
          href: string,               // location or URL of SVG icon
          color?: string              // color of icon in RGB hex notation, e.g. #FFFFFF (optional)
        },
  type: string,                       // type of control, e.g., switch, button, slider, etc. See below
  room: string,                       // uuid of room
  category: string,                   // uuid of category
  is_favorite?: boolean,              // elevate to favorite item (optional)
  is_visible?: boolean,               // make control invisible
  is_protected?: boolean,             // passwd/PIN protected control (optional)
  order?: Number,                     // defines order in the App list (optional)
  details: { ... },                   // details of the control (values control dependent)
  states: { ... },                    // states of the control (values control dependent)
  subcontrols?: { ... }               // subcontrols (values control dependent) (optional)
}
```

### Control types

The control key `type` is a string which defines the style of the control and its associated button(s):

*NOTE: Not all controls are fully functional*

```
"central_jalousie           // central sunscreen / shutter control, no button
"central_light_controller"  // central light control, no button
"info_only_analog"          // show analog value , no button
"info_only_digital"         // show digital (2-state) value, no button
"info_only_text"            // show text, no button
"i_room_controller"         // room controller, no button
"jalousie"                  // sunscreen / shutter control, up/down buttons
"light_controller_v2"       // light control, plus button
"pushbutton"                // push button
"radio"                     // up/down buttons to select state from list-box
"slider"                    // plus/minus buttons, slider only visible in detailed view
"switch"                    // toggle switch
"webpage"                   // button to external link (e.g. webpage, app)
```

The nested JSON structure for the control `details` and `states` depend on the type of control.

## Data model for categories

```
{
  hwid: string,                       // hardware identifier of the device
  uuid: string,                       // unique identifier to identify the category as MQTT topic
  name: string,                       // GUI name
  icon: {
          href: string,               // location or URL to SVG icon
          color?: string              // default color in RGB hex notation, e.g. #FFFFFF (optional)
        },
  image?: string,                     // bitmap image (optional)
  is_favorite?: boolean,              // make favorite item (optional)
  is_visible?: boolean,               // make category invisible
  is_protected?: boolean,             // passwd/PIN protected control (optional)
  order?: Number                      // defines order in list box (optional)
}
```

## Data model for rooms

```
{
  hwid: string,                       // hardware identifier of the device
  uuid: string,                       // unique identifier to identify the room as MQTT topic
  name: string,                       // GUI name
  icon: {
          href: string,               // URL to SVG icon
          color?: string              // RGB hex notation, e.g. #FFFFFF (optional)
        },
  image?: string,                     // bitmap image (optional)
  is_favorite?: boolean,              // make favorite item (optional)
  is_visible?: boolean,               // make room invisible
  is_protected?: boolean,             // passwd/PIN protected control (optional)
  order?: Number                      // defines order in list box (optional)
}
```

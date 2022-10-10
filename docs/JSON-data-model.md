# JSON data model

**NOTE**: JSON data model under development and will change!

## Top-level structure

The overall structure is given below:

```
{
  "controls": [ ... ],
  "categories": [ ... ],
  "rooms": [ ... ]
}
```

Each section `controls`, `categories` and `rooms` contains an array of elements as specified below.

## Data model for controls

This model is used within the app to manage the properties of the control elements. The elements in the data model match the MQTT topic names.

Fields indicated with '?' are optional

```
{
  hwid: string,                       // hardware identifier of the device
  uuid: string,                       // unique identifier to identify the control as MQTT topic
  name: string,                       // GUI name
  icon: {
          href: string,               // location or URL to SVG icon
          default_color?: string,     // default color in RGB hex notation, e.g. #FFFFFF (optional)
          active_color?: string       // color when active in RGB hex notation, e.g. #FFFFFF (optional)
        },
  type: string,                       // type of control, e.g., switch, button, slider, etc. See below
  room: string,                       // uuid of room (hwid of room should match hwid of control)
  category: string,                   // uuid of category (hwid of category should match hwid of control)
  is_favorite?: Boolean,              // elevate to favorite item (optional)
  is_visible: Boolean,                // make control invisible
  is_protected?: Boolean,             // passwd/PIN protected control (optional)
  order?: Number,                     // defines order in list box (optional)
  state: {
           value: string,             // e.g. "1", "0", "22.1", "on", "off", ...
           format: string,            // message format in sprintf notation, can include pre- and post-text, such as units
           list_names?: string[],     // list names for radio buttons (optional)
           default_color?: string,    // default color in RGB hex notation, e.g. #FFFFFF (optional)
           active_color?: string      // color of text/value when active in RGB hex notation, e.g. #FFFFFF (optional)
         }
}
```

### Control type (string)

The control type is a string (enum) which defines the style of the button.

```
"dimmer"   // up/down (+/-) buttons
"light"    // light control, plus (+) button
"light_c"  // central light control, no button
"link"     // button to external link (e.g. webpage, app)
"push"     // push button
"radio"    // up/down (+/-) buttons to select state from list-box
"screen"   // sunscreen control, ^/v buttons
"screen_c  // central sunscreens control, no button
"slider"   // up/down (+/-) buttons, slider only visible in detailed view
"switch"   // toggle switch
"tempctrl" // room temperature control, no button
"text"     // status text, no button
"updown"   // up/down (+/-) buttons

```

## Data model for categories

```
{
  hwid: string,                       // hardware identifier of the device
  uuid: string,                       // unique identifier to identify the category as MQTT topic
  name: string,                       // GUI name
  icon: {
          href: string,               // location or URL to SVG icon
          default_color?: string      // default color in RGB hex notation, e.g. #FFFFFF (optional)
        },
  is_visible: Boolean,                // make category invisible
  is_protected?: Boolean,             // passwd/PIN protected control (optional)
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
          default_color?: string      // RGB hex notation, e.g. #FFFFFF (optional)
        },
  is_visible: Boolean,                // make room invisible
  is_protected?: Boolean,             // passwd/PIN protected control (optional)
  order?: Number                      // defines order in list box (optional)
}
```

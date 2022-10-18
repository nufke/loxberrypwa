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
          default_href: string,       // location or URL of default SVG icon
          active_href?: string,       // location or URL of SVG icon when active
          default_color?: string,     // default color in RGB hex notation, e.g. #FFFFFF (optional)
          active_color?: string       // color when active in RGB hex notation, e.g. #FFFFFF (optional)
        },
  type: string,                       // type of control, e.g., switch, button, slider, etc. See below
  room: string,                       // uuid of room (hwid of room should match hwid of control)
  category: string,                   // uuid of category (hwid of category should match hwid of control)
  is_favorite?: Boolean,              // elevate to favorite item (optional)
  is_visible?: Boolean,               // make control invisible
  is_protected?: Boolean,             // passwd/PIN protected control (optional)
  order?: Number,                     // defines order in list box (optional)
  state: {
           value: string,             // e.g. "1", "0", "22.1", "on", "off", ...
           format?: string,           // message format in sprintf notation, can include pre- and post-text, such as units (optional)
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
          color?: string              // default color in RGB hex notation, e.g. #FFFFFF (optional)
        },
  is_visible?: Boolean,               // make category invisible
  is_favorite?: Boolean,              // elevate to favorite item (optional)
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
          color?: string              // RGB hex notation, e.g. #FFFFFF (optional)
        },
  is_visible?: Boolean,               // make room invisible
  is_favorite?: Boolean,              // elevate to favorite item (optional)
  is_protected?: Boolean,             // passwd/PIN protected control (optional)
  order?: Number                      // defines order in list box (optional)
}
```

## JSON data model generator / translator

In order to map the rooms, categories and controls from a Loxone Miniserver menu structure (`LoxAPP3.json`) to the JSON data model used in the App, the javascript function listed below can be used as a start. The javascript function can be integrated in `Node-RED` using a function node, which should read the Loxone menu structure as input (`msg.payload`) and translates it to the required JSON data model as output (`msg`). In case multiple Miniservers are in use, you should process the Loxone structures individually and concatinate them to a single JSON data model.

**NOTE: At this stage not all functions are generated / translated. As such the generated JSON data model should be seen as a template and requires additional manual modification or additions.**

```
var cats = Object.values(msg.payload.cats);
var rooms = Object.values(msg.payload.rooms);
var controls = Object.values(msg.payload.controls);

var hwinfo = msg.payload.msInfo.serialNr;

cats.sort((a, b) => { return a.name.localeCompare(b.name); }) // sort A-Z
rooms.sort((a, b) => { return a.name.localeCompare(b.name); }) // sort A-Z
controls.sort((a, b) => { return a.name.localeCompare(b.name); }) // sort A-Z

var cats_arr = [];
var rooms_arr = [];
var controls_arr = [];

var cat_names = [];
var cat_icons = [];
var room_names = [];

var i=0; // used to order element

cats.forEach( (item) => {
    let category =
    {
        hwid: hwinfo,
        uuid: item.uuid,
        name: item.name,
            icon: {
                href: "assets/svg_icons/" + item.image },
        order: i,
        is_favorite: false,
        is_visible: true
    };
    i++;
    cat_names[item.uuid] = item.name;
    cat_icons[item.uuid] = item.image;
    cats_arr.push(category);
});

i=0;

rooms.forEach((item) => {
    let room =
    {
        hwid: hwinfo,
        uuid: item.uuid,
        name: item.name,
        icon: { href: "assets/svg_icons/" + item.image },
        order: i,
        is_favorite: false,
        is_visible: true
    };
    i++;
    room_names[item.uuid] = item.name;
    rooms_arr.push(room);
});

i = 0;

controls.forEach( (item) => {
    let icon;
    if (item.defaultIcon)
      icon = item.defaultIcon + ".svg";
    else
      icon = cat_icons[item.cat];

    if (item.type === "UpDownDigital") item.type="updown";
    if (item.type === "InfoOnlyAnalog") item.type = "text";
    if (item.type === "InfoOnlyDigital") item.type = "text";
    if (item.type === "InfoOnlyText") item.type = "text";
    if (item.type === "LightControllerV2") item.type = "light";
    if (item.type === "Pushbutton") item.type = "push";
    if (item.type === "CentralLightController") item.type = "light_c";
    if (item.type === "Jalousie") item.type = "screen";
    if (item.type === "CentralJalousie") item.type = "screen_c";
    if (item.type === "IRoomController") item.type = "tempctrl";
    if (item.type === "TextState") item.type = "text";

    let control =
    {
        hwid: hwinfo,
        uuid: item.uuidAction,
        name: item.name,
        icon: { default_href: "assets/svg_icons/" + icon },
        type: item.type.toLowerCase(),
        room: item.room,
        category: item.cat,
        is_favorite: false,
        is_visible: true,
        state: {
           value: "0",
           format: "%s"
        },
        order: i
    };
    i++;
    controls_arr.push(control);
});

msg.payload = {
    controls: controls_arr,
    categories: cats_arr,
    rooms: rooms_arr
}

return msg;
```
// Internal data model for the PWA visualization/GUI
// Note: changes to the data model might impact the MQTT API (topic registration)

export interface Control {
  hwid: string,                 // hardware identifier of the device
  uuid: string,                 // unique identifier to identify the control as MQTT topic
  name: string,                 // unique identifier to identify the control as MQTT topic
  icon: {
    default_href: string,       // location or URL of default SVG icon
    active_href?: string,       // location or URL of SVG icon when active
    _current_href?: string,     // INTERNAL current SVG icon
    default_color?: string,     // default color for icon in RGB hex notation, e.g. #FFFFFF (optional)
    active_color?: string,      // icon color when active in RGB hex notation, e.g. #FFFFFF (optional)
    _current_color?: string     // INTERNAL current color for icon (optional)
  },
  type: string,                 // type of control, e.g., switch, button, slider, etc.
  room: string,                 // uuid of room (hwid of room should match hwid of control)
  category: string,             // uuid of category (hwid of category should match hwid of control)
  is_favorite?: Boolean,        // elevate to favorite item (optional)
  is_visible?: Boolean,         // make control invisible (optional)
  is_protected?: Boolean,       // passwd/PIN protected control (optional)
  order?: number,               // defines order in list box (optional)
  state: {
    value: string,              // value, e.g. "1", "0", "22.1", "on", "off", ...
    format?: string,            // message format in sprintf notation, can include pre- and post-text, such as units
    default_color?: string,     // default color in RGB hex notation, e.g. #FFFFFF (optional)
    active_color?: string,      // color of text/value when active in RGB hex notation, e.g. #FFFFFF (optional)
    list_names?: string[],      // list names for radio buttons (optional)
    _current_color?: string,    // INTERNAL current color for status text (optional)
    _status_text?: string,      // INTERNAL status text with formatting applied (optional)
    _toggle?: Boolean           // INTERNAL state of toggle (optional)
  }
}

export interface Category {
  hwid: string,                 // hardware identifier of the device
  uuid: string,                 // unique identifier to identify the category as MQTT topic
  name: string,                 // GUI name
  icon: {
    href: string,               // location or URL of default SVG icon
    color?: string              // color in RGB hex notation, e.g. #FFFFFF (optional)
  },
  image?: string,               // location for the bitmap image (optional)
  is_visible?: Boolean,         // make category invisible (optional)
  is_protected?: Boolean,       // passwd/PIN protected control (optional)
  order?: number                // defines order in list box (optional)
}

export interface Room {
  hwid: string,                 // hardware identifier of the device
  uuid: string,                 // unique identifier to identify the room as MQTT topic
  name: string,                 // GUI name
  icon: {
    href: string,               // location or URL to SVG icon
    color?: string              // color in RGB hex notation, e.g. #FFFFFF (optional)
  },
  image?: string,               // location for the bitmap image (optional)
  is_visible?: Boolean,         // make category invisible (optional)
  is_protected?: Boolean,       // passwd/PIN protected control (optional)
  order?: number                // defines order in list box (optional)
}

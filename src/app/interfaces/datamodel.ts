// Internal data model for the PWA visualization/GUI
// Note: changes to the data model might impact the MQTT API (topic registration)

export interface Control {
  hwid: string,                 // hardware identifier of the device
  uuid: string,                 // unique identifier to identify the control as MQTT topic
  name: string,                 // unique identifier to identify the control as MQTT topic
  icon: {
    href: string,               // location or URL of SVG icon
    color?: string              // color of icon in RGB hex notation, e.g. #FFFFFF (optional)
  },
  type: string,                 // type of control, e.g., switch, button, slider, etc.
  room: string,                 // uuid of room (hwid of room should match hwid of control)
  category: string,             // uuid of category (hwid of category should match hwid of control)
  is_favorite?: Boolean,        // elevate to favorite item (optional)
  is_visible?: Boolean,         // make control invisible (optional)
  is_protected?: Boolean,       // passwd/PIN protected control (optional)
  order?: number,               // defines order in the App list (optional)
  state?: ControlText | ControlRadio | ControlSwitch
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

export interface ControlText {
  value: string,                // number represented as string
  format?: string,              // message format in sprintf notation, can include pre- and post-text, such as units
  color?: string,               // default color in RGB hex notation, e.g. #FFFFFF (optional)
  _display_text?: string,       // INTERNAL display text with formatting applied (optional)
}

export interface ControlRadio {
  value: string,                // number for active item in the list (0 = off)
  list_names?: string[],        // name for each radio item
  list_color?: string[]         // color for each radio item
  _display_text?: string,       // INTERNAL display text with formatting applied (optional)
}

export interface ControlSwitch {
  value: string,                // number for active item in the list (0 = off)
  _toggle?: Boolean             // INTERNAL state of toggle (optional)
  _display_text?: string,       // INTERNAL display text with formatting applied (optional)
}

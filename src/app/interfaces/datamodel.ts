// Internal data model for the PWA visualization/GUI
// Note: changes to the data model might impact the MQTT API (topic registration)

export interface Control {
  id: string,
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
  subcontrols?: Control[],      // any subcontrols (optional)
  details: any,
  states: any,
  display: {
    text?: string,               // INTERNAL display status text (optional)
    color?: string,              // INTERNAL display status text (optional)
    toggle?: Boolean             // INTERNAL toggle state (optional)
  }
}

export interface Category {
  id: string,
  hwid: string,                 // hardware identifier of the device
  uuid: string,                 // unique identifier to identify the category as MQTT topic
  name: string,                 // GUI name
  icon: {
    href: string,               // location or URL of default SVG icon
    color?: string              // color in RGB hex notation, e.g. #FFFFFF (optional)
  },
  image?: string,               // location for the bitmap image (optional)
  is_favorite?: Boolean,        // elevate to favorite item (optional)
  is_visible?: Boolean,         // make category invisible (optional)
  is_protected?: Boolean,       // passwd/PIN protected control (optional)
  order?: number                // defines order in list box (optional)
}

export interface Room {
  id: string,
  hwid: string,                 // hardware identifier of the device
  uuid: string,                 // unique identifier to identify the room as MQTT topic
  name: string,                 // GUI name
  icon: {
    href: string,               // location or URL to SVG icon
    color?: string              // color in RGB hex notation, e.g. #FFFFFF (optional)
  },
  image?: string,               // location for the bitmap image (optional)
  is_favorite?: Boolean,        // elevate to favorite item (optional)
  is_visible?: Boolean,         // make category invisible (optional)
  is_protected?: Boolean,       // passwd/PIN protected control (optional)
  order?: number                // defines order in list box (optional)
}

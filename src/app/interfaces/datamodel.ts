// Internal data model for the PWA visualization/GUI
// Note: changes to the data model might impact the MQTT API (topic registration)

export interface Control {
  hwid: string,                 // hardware identifier of the device
  uuid: string,                 // unique identifier to identify the control as MQTT topic
  mqtt: {
    subscribe_topic?: string,   // topic to subscribe to messages to update control states (optional)
    command_topic: string,      // topic to publish commands from control
    qos?: number,               // QoS level (optional)
    retain?: boolean            // retain published commands at broker (optional)
  },
  name: string,                 // unique identifier to identify the control as MQTT topic
  icon: {
    href: string,               // location or URL of SVG icon
    color?: string              // color of icon in RGB hex notation, e.g. #FFFFFF (optional)
  },
  type: string,                 // type of control, e.g., switch, button, slider, etc.
  room: string,                 // uuid of room (hwid of room should match hwid of control)
  category: string,             // uuid of category (hwid of category should match hwid of control)
  is_favorite?: boolean,        // elevate to favorite item (optional)
  is_visible?: boolean,         // make control invisible (optional)
  is_protected?: boolean,       // passwd/PIN protected control (optional)
  order?: number,               // defines order in the App list (optional)
  subcontrols?: any,            // subcontrols (optional)
  details: any,                 // control details
  states: any,                  // control states
  display: any                  // INTERNAL display properties (optional)
}

export interface Subcontrol {
  uuid: string,                 // unique identifier to identify the control as MQTT topic
  name: string,                 // unique identifier to identify the control as MQTT topic
  icon: {
    href: string,               // location or URL of SVG icon
    color?: string              // color of icon in RGB hex notation, e.g. #FFFFFF (optional)
  },
  type: string,                 // type of control, e.g., switch, button, slider, etc.
  is_favorite?: boolean,        // elevate to favorite item (optional)
  is_visible?: boolean,         // make control invisible (optional)
  is_protected?: boolean,       // passwd/PIN protected control (optional)
  order?: number,               // defines order in the App list (optional)
  states: any,                  // control states
  display: {
    text?: string,              // INTERNAL display status text (optional)
    value?: number,             // INTERNAL display status value (optional)
    color?: string,             // INTERNAL display status color (optional)
    bar_color?: string,         // INTERNAL display bar color (optional)
    btn_color?: string,         // INTERNAL display button style (optional)
    toggle?: boolean            // INTERNAL toggle state (optional)
  }
}

export interface Category {
  hwid: string,                 // hardware identifier of the device
  uuid: string,                 // unique identifier to identify the category as MQTT topic
  mqtt: {
    subscribe_topic?: string,   // topic to subscribe to messages to update states (optional)
    command_topic?: string,     // topic to publish commands from category (optional)
    qos?: number,               // QoS level (optional)
    retain?: boolean            // retain published commands at broker (optional)
  },
  name: string,                 // GUI name
  icon: {
    href: string,               // location or URL of default SVG icon
    color?: string              // color in RGB hex notation, e.g. #FFFFFF (optional)
  },
  image?: string,               // location for the bitmap image (optional)
  is_favorite?: boolean,        // elevate to favorite item (optional)
  is_visible?: boolean,         // make category invisible (optional)
  is_protected?: boolean,       // passwd/PIN protected control (optional)
  order?: number                // defines order in list box (optional)
}

export interface Room {
  hwid: string,                 // hardware identifier of the device
  uuid: string,                 // unique identifier to identify the room as MQTT topic  (device-uuid)
  mqtt: {
    subscribe_topic?: string,   // topic to subscribe to messages to update values (optional)
    command_topic?: string,     // topic to publish commands from room (optional)
    qos?: number,               // QoS level (optional)
    retain?: boolean            // retain published commands at broker (optional)
  },
  name: string,                 // GUI name
  icon: {
    href: string,               // location or URL to SVG icon
    color?: string              // color in RGB hex notation, e.g. #FFFFFF (optional)
  },
  image?: string,               // location for the bitmap image (optional)
  is_favorite?: boolean,        // elevate to favorite item (optional)
  is_visible?: boolean,         // make category invisible (optional)
  is_protected?: boolean,       // passwd/PIN protected control (optional)
  order?: number                // defines order in list box (optional)
}

export const ButtonAction = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
  plus: 'plus',
  minus: 'minus',
  push: 'push',
  toggle: 'toggle',
  slider: 'slider',
  change: 'change' // radio change
};

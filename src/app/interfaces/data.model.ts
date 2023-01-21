import { StateChangeListener } from "@capacitor/app";

/**
 * In-memory Application State for the PWA
 */
export interface AppState {
  mode: Mode;
  settings: Settings;
  controls: { [key: string]: Control };
  categories: { [key: string]: Category };
  rooms: { [key: string]: Room };
}

/**
 * Properties for Settings
 */
 export interface Settings {
  app?: AppSettings;
  mqtt?: MqttSettings;
}

/**
 * Properties for App Settings
 */
 export interface AppSettings {
  dark_theme: boolean;
  language: string;
}

/**
 * Properties for MQTT Settings
 */
 export interface MqttSettings {
  hostname: string;
  port: number;
  username: string;
  password: string;
  topic: string;
}

/**
 * Properties for App operational mode
 */
 export interface Mode {
  connected: boolean
}

export const INITIAL_MQTT_SETTINGS: MqttSettings = {
  hostname: '',
  port: null,
  username: '',
  password: '',
  topic: ''
}

export const INITIAL_APP_SETTINGS: AppSettings = {
  dark_theme: false,
  language: 'en'
}

export const INITIAL_MODE: Mode = {
  connected: false
}

/**
 * Application State initial values
 */
export const INITIAL_APP_STATE: AppState = {
  mode: INITIAL_MODE,
  settings: {
    app: INITIAL_APP_SETTINGS,
    mqtt: INITIAL_MQTT_SETTINGS
  },
  controls: {},
  categories: {},
  rooms: {}
}

/**
 * Properties for Control elements
 */
export interface Control {
  hwid: string;                 // hardware identifier of the device
  uuid: string;                 // unique identifier to identify the control as MQTT topic
  mqtt_cmd: string;             // topic to publish commands
  name: string;                 // unique identifier to identify the control as MQTT topic
  icon: {
    href: string;               // location or URL of SVG icon
    color?: string;             // color of icon in RGB hex notation, e.g. #FFFFFF (optional)
  }
  type: string;                 // type of control, e.g., switch, button, slider, etc.
  room: string;                 // uuid of room (hwid of room should match hwid of control)
  category: string;             // uuid of category (hwid of category should match hwid of control)
  is_favorite?: boolean;        // elevate to favorite item (optional)
  is_visible?: boolean;         // make control invisible (optional)
  is_protected?: boolean;       // passwd/PIN protected control (optional)
  order?: number[];             // defines the order for the controls (optional)
  subcontrols?: any;            // subcontrols (optional)
  details: any;                 // control details
  states: any;                  // control states
}

/**
 * Properties for Subcontrol elements
 */
export interface Subcontrol {
  uuid: string;                 // unique identifier to identify the control as MQTT topic
  name: string;                 // unique identifier to identify the control as MQTT topic
  mqtt_cmd: string;             // topic to publish commands
  icon: {
    href: string;               // location or URL of SVG icon
    color?: string;             // color of icon in RGB hex notation, e.g. #FFFFFF (optional)
  }
  type: string;                 // type of control, e.g., switch, button, slider, etc.
  is_favorite?: boolean;        // elevate to favorite item (optional)
  is_visible?: boolean;         // make control invisible (optional)
  is_protected?: boolean;       // passwd/PIN protected control (optional)
  order: number[];              // defines the order of subcontrols (optional)
  states: any;                  // control states
}

/**
 * Properties to specify Category
 */
export interface Category {
  hwid: string;                 // hardware identifier of the device
  uuid: string;                 // unique identifier to identify the category as MQTT topic
  mqtt_cmd: string;             // topic to publish commands
  name: string;                 // GUI name
  icon: {
    href: string;               // location or URL of default SVG icon
    color?: string;             // color in RGB hex notation, e.g. #FFFFFF (optional)
  }
  image?: string;               // location for the bitmap image (optional)
  is_favorite?: boolean;        // elevate to favorite item (optional)
  is_visible?: boolean;         // make category invisible (optional)
  is_protected?: boolean;       // passwd/PIN protected control (optional)
  order?: number[];             // defines the order for categories (optional)
}

/**
 * Properties to specify Room
 */
export interface Room {
  hwid: string;                 // hardware identifier of the device
  uuid: string;                 // unique identifier to identify the room as MQTT topic  (device-uuid)
  mqtt_cmd: string;             // topic to publish commands
  name: string;                 // GUI name
  icon: {
    href: string;               // location or URL to SVG icon
    color?: string;             // color in RGB hex notation, e.g. #FFFFFF (optional)
  }
  image?: string;               // location for the bitmap image (optional)
  is_favorite?: boolean;        // elevate to favorite item (optional)
  is_visible?: boolean;         // make category invisible (optional)
  is_protected?: boolean;       // passwd/PIN protected control (optional)
  order?: number[];             // defines the order for rooms (optional)
}
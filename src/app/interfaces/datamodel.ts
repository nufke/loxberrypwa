// Internal data model for the PWA visualization/GUI
// Note: changes to the data model might impact the MQTT API (topic registration)

export interface Control {
  hwid: string,
  uuid: string,
  name: string,
  icon: {
    href: string,
    default_color?: string,
    active_color?: string,
    _current_color?: string
  },
  type: string,
  room: string,
  category: string,
  is_favorite?: Boolean,
  is_visible?: Boolean,
  is_protected?: Boolean,
  order?: number,
  state: {
    value: string,
    format?: string,
    default_color?: string,
    active_color?: string,
    list_names?: string[],
    _current_color?: string,
    _status_text?: string,
    _toggle: Boolean
  }
}

export interface Category {
  hwid: string,
  uuid: string,
  name: string,
  icon: {
    href: string,
    default_color?: string
  },
  image?: string,
  is_visible?: Boolean,
  is_protected?: Boolean,
  order?: number
}

export interface Room {
  hwid: string,
  uuid: string,
  name: string,
  icon: {
    href: string,
    default_color?: string
  },
  image?: string,
  is_visible?: Boolean,
  is_protected?: Boolean,
  order?: number
}

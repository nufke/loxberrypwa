export interface Control {
  uuid: string,
  name: string,
  icon: {
    href: string,
    default_color?: string,
    active_color?: string, 
    _current_color?: string // INTERNAL USE ONLY, NOT PART OF API
  }
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
    _current_color?: string, // INTERNAL USE ONLY, NOT PART OF API
    _status_text?: string, // INTERNAL USE ONLY, NOT PART OF API
  }
}

export interface Category {
  uuid: string,
  name: string,
  icon: {
    href: string,
    default_color?: string
  }
  image?: string,
  is_visible?: Boolean,
  is_protected?: Boolean,
  order?: number
}

export interface Room {
  uuid: string,
  name: string,
  icon: {
    href: string,
    default_color?: string
  }
  image?: string,
  is_visible?: Boolean,
  is_protected?: Boolean,
  order?: number
}

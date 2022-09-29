export interface Control {
  uuid: string,
  name: string,
  icon: {
    href: string,
    color?: string,
    _active_color: string // INTERNAL USE ONLY, NOT PART OF API
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
    color?: string,
    states?: string[],
    _message?: string, // INTERNAL USE ONLY, NOT PART OF API
    _toggle?: Boolean // INTERNAL USE ONLY, NOT PART OF API
  }
}

export interface Category {
  uuid: string,
  name: string,
  icon: {
    href: string,
    color?: string
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
    color?: string
  }
  image?: string,
  is_visible?: Boolean,
  is_protected?: Boolean,
  order?: number
}

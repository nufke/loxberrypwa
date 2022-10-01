// MQTT API, used to register the MQTT topics

export interface MqttControl {
  name: string,
  icon: {
    href: string,
    default_color?: string,
    active_color?: string, 
  },
  type: string,
  room: string,
  category: string,
  is_favorite: string,
  is_visible: string,
  is_protected: string,
  order: string,
  state: {
    value: string,
    format: string,
    default_color: string,
    active_color: string,
    list_names: string,
  }
}

export interface MqttCategory {
  name: string,
  icon: {
    href: string,
    default_color: string
  },
  image: string,
  is_visible: string,
  is_protected: string,
  order: string
}

export interface MqttRoom {
  name: string,
  icon: {
    href: string,
    default_color: string
  },
  image: string,
  is_visible: string,
  is_protected: string,
  order: string
}

export const MqttControlTopics: MqttControl = {
  name: "/name",
  icon: {
    href: "/icon/href",
    default_color: "/icon/default_color",
    active_color: "/icon/active_color"
  },
  type: "/type",
  room: "/room",
  category: "/category",
  is_favorite: "/is_favorite",
  is_visible: "/is_visible",
  is_protected: "/is_protected",
  order: "/order",
  state: {
    value: "/state/value",
    format: "/state/format",
    default_color: "/state/default_color",
    active_color: "/state/active_color",
    list_names: "/state/list_names"
  }
};

export const MqttCategoryTopics: MqttCategory = {
  name: "/name",
  icon: {
    href: "/icon/href",
    default_color: "/icon/default_color"
  },
  image: "/image",
  is_visible: "/is_visible",
  is_protected: "/is_protected",
  order: "/order"
}

export const MqttRoomTopics: MqttRoom = {
  name: "/name",
  icon: {
    href: "/icon/href",
    default_color: "/icon/default_color"
  },
  image: "/image",
  is_visible: "/is_visible",
  is_protected: "/is_protected",
  order: "/order"
}

# Example

Below a simple example describing the structure to specify controls, categories and rooms. Note that the icons and images use relative paths referencing the source directory of the PWA icon and image sources. Alternatively, URLs could be used, e.g. `http:/myserver.org/my_image.svg`.

To initialize the App with a structure, send it over MQTT to topic `/loxberry/app/structure`:

```
/loxberry/app/structure -> { "controls": { ... },  "categories": { ... }, "rooms": { ... } }
```

Updates to the structure is *incremental*, which means changes to existing objects will be overridden and old objects remain available. To flush all elements in the App, an empty string message should be sent to `/loxberry/app/structure`.

```json
{
    "controls": {
        "1/1": {
            "hwid": "1",
            "uuid": "1",
            "mqtt_cmd": "my_mqtt_device/1/1/cmd",
            "name": "Lighting Living",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "light_controller_v2",
            "room": "1001",
            "category": "2001",
            "is_favorite": true,
            "is_visible": true,
            "order": 1,
            "states": {
                "active_moods": "my_mqtt_device/1/active_moods",
                "mood_list": "my_mqtt_device/1/mood_list"
            }
        },
        "1/2": {
            "hwid": "1",
            "uuid": "2",
            "mqtt_cmd": "my_mqtt_device/1/2/cmd",
            "name": "Lighting Kitchen",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "pushbutton",
            "room": "1002",
            "category": "2001",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "states": {
                "value": "my_mqtt_device/2"
            }
        },
        "1/3": {
            "hwid": "1",
            "uuid": "3",
            "mqtt_cmd": "my_mqtt_device/1/3/cmd",
            "name": "Lighting Bath",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "switch",
            "room": "1003",
            "category": "2001",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "states": {
                "value": "my_mqtt_device/3"
            }
        },
        "1/4": {
            "hwid": "1",
            "uuid": "4",
            "mqtt_cmd": "my_mqtt_device/1/4/cmd",
            "name": "Lighting Bed",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "light_controller_v2",
            "room": "1004",
            "category": "2001",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "states": {
                "active_moods": "my_mqtt_device/4/active_moods",
                "mood_list": "my_mqtt_device/4/mood_list"
            }
        },
        "1/5": {
            "hwid": "1",
            "uuid": "5",
            "mqtt_cmd": "my_mqtt_device/1/5/cmd",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "info_only_analog",
            "room": "1001",
            "category": "2002",
            "is_favorite": true,
            "is_visible": true,
            "order": 1,
            "details": {
                "format": "%s °C"
            },
            "states": {
                "value": "my_mqtt_device/5"
            }
        },
        "1/6": {
            "hwid": "1",
            "uuid": "6",
            "mqtt_cmd": "my_mqtt_device/1/6/cmd",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "info_only_analog",
            "room": "1002",
            "category": "2002",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "details": {
                "format": "%s °C"
            },
            "states": {
                "value": "my_mqtt_device/6"
            }
        },
        "1/7": {
            "hwid": "1",
            "uuid": "7",
            "mqtt_cmd": "my_mqtt_device/1/7/cmd",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "info_only_analog",
            "room": "1003",
            "category": "2002",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "details": {
                "format": "%s °C"
            },
            "states": {
                "value": "my_mqtt_device/7"
            }
        },
        "1/8": {
            "hwid": "1",
            "uuid": "8",
            "mqtt_cmd": "my_mqtt_device/1/8/cmd",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "info_only_analog",
            "room": "1004",
            "category": "2002",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "details": {
                "format": "%s °C"
            },
            "states": {
                "value": "my_mqtt_device/8"
            }
        },
        "1/9": {
            "hwid": "1",
            "uuid": "9",
            "mqtt_cmd": "my_mqtt_device/1/9/cmd",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "slider",
            "room": "1001",
            "category": "2004",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "details": {
                "format": "%s °C",
                "min": "10",
                "max": "25",
                "step": "1"
            },
            "states": {
                "value": "my_mqtt_device/9"
            }
        },
        "1/10": {
            "hwid": "1",
            "uuid": "10",
            "mqtt_cmd": "my_mqtt_device/1/10/cmd",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "slider",
            "room": "1002",
            "category": "2004",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "details": {
                "format": "%s °C",
                "min": "10",
                "max": "25",
                "step": "1"
            },
            "states": {
                "value": "my_mqtt_device/10"
            }
        },
        "1/11": {
            "hwid": "1",
            "uuid": "11",
            "mqtt_cmd": "my_mqtt_device/1/11/cmd",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "slider",
            "room": "1003",
            "category": "2004",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "details": {
                "format": "%s °C",
                "min": "10",
                "max": "25",
                "step": "1"
            },
            "states": {
                "value": "my_mqtt_device/11"
            }
        },
        "1/12": {
            "hwid": "1",
            "uuid": "12",
            "mqtt_cmd": "my_mqtt_device/1/12/cmd",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "slider",
            "room": "1004",
            "category": "2004",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "details": {
                "format": "%s °C",
                "min": "10",
                "max": "25",
                "step": "1"
            },
            "states": {
                "value": "my_mqtt_device/12"
            }
        },
        "1/13": {
            "hwid": "1",
            "uuid": "13",
            "mqtt_cmd": "my_mqtt_device/1/13/cmd",
            "name": "Musicplayer",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "1001",
            "category": "2003",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "details": {
                "all_off": "Off",
                "outputs": {
                    "1": "Channel 1",
                    "2": "Channel 2",
                    "3": "Channel 3"
                }
            },
            "states": {
                "active_output": "my_mqtt_device/13"
            }
        },
        "1/14": {
            "hwid": "1",
            "uuid": "14",
            "mqtt_cmd": "my_mqtt_device/1/14/cmd",
            "name": "Musicplayer",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "1002",
            "category": "2003",
            "is_favorite": true,
            "is_visible": true,
            "order": 1,
            "details": {
                "all_off": "Off",
                "outputs": {
                    "1": "Channel 1",
                    "2": "Channel 2",
                    "3": "Channel 3"
                }
            },
            "states": {
                "active_output": "my_mqtt_device/14"
            }
        },
        "1/15": {
            "hwid": "1",
            "uuid": "15",
            "mqtt_cmd": "my_mqtt_device/1/15/cmd",
            "name": "Musicplayer",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "1003",
            "category": "2003",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "details": {
                "all_off": "Off",
                "outputs": {
                    "1": "Channel 1",
                    "2": "Channel 2",
                    "3": "Channel 3"
                }
            },
            "states": {
                "active_output": "my_mqtt_device/15"
            }
        },
        "1/16": {
            "hwid": "1",
            "uuid": "16",
            "name": "Musicplayer",
            "mqtt_cmd": "my_mqtt_device/1/16/cmd",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "1004",
            "category": "2003",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "details": {
                "all_off": "Off",
                "outputs": {
                    "1": "Channel 1",
                    "2": "Channel 2",
                    "3": "Channel 3"
                }
            },
            "states": {
                "active_output": "my_mqtt_device/16"
            }
        }
    },
    "categories": {
        "1/2001": {
            "hwid": "1",
            "uuid": "2001",
            "name": "Lighting",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "order": 2
        },
        "1/2002": {
            "hwid": "1",
            "uuid": "2002",
            "name": "Sensors",
            "icon": {
                "href": "assets/svg_icons/map-marker-solid.svg"
            },
            "order": 1
        },
        "1/2003": {
            "hwid": "1",
            "uuid": "2003",
            "name": "Audio",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "order": 1
        },
        "1/2004": {
            "hwid": "1",
            "uuid": "2004",
            "name": "Heating",
            "icon": {
                "href": "assets/svg_icons/home-heating-solid.svg"
            },
            "order": 1
        }
    },
    "rooms": {
        "1/1001": {
            "hwid": "1",
            "uuid": "1001",
            "name": "Living Room",
            "icon": {
                "href": "assets/svg_icons/couch-solid.svg"
            },
            "image": "assets/images/living-room.jpg",
            "order": 1
        },
        "1/1002": {
            "hwid": "1",
            "uuid": "1002",
            "name": "Kitchen",
            "icon": {
                "href": "assets/svg_icons/utensils-solid.svg"
            },
            "image": "assets/images/kitchen2.jpg",
            "order": 1
        },
        "1/1003": {
            "hwid": "1",
            "uuid": "1003",
            "name": "Bathroom",
            "icon": {
                "href": "assets/svg_icons/shower-solid.svg"
            },
            "image": "assets/images/bathroom.jpg",
            "order": 1
        },
        "1/1004": {
            "hwid": "1",
            "uuid": "1004",
            "name": "Bedroom",
            "icon": {
                "href": "assets/svg_icons/bed-outline.svg"
            },
            "order": 1
        }
    }
}
```
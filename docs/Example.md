# Example

Below a simple example describing the structure to specify controls, categories and rooms. In this example, MQTT messages from/to the Loxone MQTT gateway have the prefix `loxone`. The MQTT prefix `loxberry/app` is used to send updates to each control, category or room.

Note that the icons and images use relative paths referencing the source directory of the PWA icon and image sources. Alternatively, URLs could be used, e.g. `http:/myserver.org/my_image.svg`.

## Load structure

To initialize the App with a structure, send it over MQTT to topic `/loxberry/app/structure`:

```
/loxberry/app/structure -> { "controls": { ... },  "categories": { ... }, "rooms": { ... } }
```

Make sure that the keys of the controls, categories and rooms, with string format `hwid/uuid`, match with the `hwid` and `uuid` for each element.

The string values of `room` and `category` should match with the `uuid` of these elements.

Updates to the structure is *incremental*, which means changes to existing objects will be overridden and old objects remain available. To flush all elements in the App, an empty string message should be sent to `/loxberry/app/structure`.

```json
{
    "controls": {
        "9999/1000": {
            "hwid": "9999",
            "uuid": "1000",
            "mqtt_cmd": "loxone/9999/1000/cmd",
            "name": "Lighting Living",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "light_controller_v2",
            "room": "2000",
            "category": "3000",
            "is_favorite": true,
            "is_visible": true,
            "order": 1,
            "states": {
                "active_moods": {
                    "mqtt": "loxone/9999/8000"
                },
                "mood_list": {
                    "mqtt": "loxone/9999/8001"
                }
            }
        },
        "9999/1001": {
            "hwid": "9999",
            "uuid": "1001",
            "mqtt_cmd": "loxone/9999/1001/cmd",
            "name": "Lighting Kitchen",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "pushbutton",
            "room": "2001",
            "category": "3000",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "states": {
                "value": {
                    "mqtt": "loxone/9999/8002"
                }
            }
        },
        "9999/1002": {
            "hwid": "9999",
            "uuid": "1002",
            "mqtt_cmd": "loxone/9999/1002/cmd",
            "name": "Lighting Bath",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "switch",
            "room": "2002",
            "category": "3000",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "states": {
                "value": {
                    "mqtt": "loxone/9999/8003"
                }
            }
        },
        "9999/1003": {
            "hwid": "9999",
            "uuid": "1003",
            "mqtt_cmd": "loxone/9999/1003/cmd",
            "name": "Lighting Bed",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "light_controller_v2",
            "room": "2003",
            "category": "3000",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "states": {
                "active_moods": {
                    "mqtt": "loxone/9999/8004"
                },
                "mood_list": {
                    "mqtt": "loxone/9999/8005"
                }
            }
        },
        "9999/1004": {
            "hwid": "9999",
            "uuid": "1004",
            "mqtt_cmd": "loxone/9999/1004/cmd",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "info_only_analog",
            "room": "2000",
            "category": "3001",
            "is_favorite": true,
            "is_visible": true,
            "order": 1,
            "details": {
                "format": "%s °C"
            },
            "states": {
                "value": {
                    "mqtt": "loxone/9999/8006"
                }
            }
        },
        "9999/1005": {
            "hwid": "9999",
            "uuid": "1005",
            "mqtt_cmd": "loxone/9999/1005/cmd",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "info_only_analog",
            "room": "2001",
            "category": "3001",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "details": {
                "format": "%s °C"
            },
            "states": {
                "value": {
                    "mqtt": "loxone/9999/8007"
                }
            }
        },
        "9999/1006": {
            "hwid": "9999",
            "uuid": "1006",
            "mqtt_cmd": "loxone/9999/1006/cmd",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "info_only_analog",
            "room": "2002",
            "category": "3001",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "details": {
                "format": "%s °C"
            },
            "states": {
                "value": {
                    "mqtt": "loxone/9999/8008"
                }
            }
        },
        "9999/1007": {
            "hwid": "9999",
            "uuid": "1007",
            "mqtt_cmd": "loxone/9999/1007/cmd",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "info_only_analog",
            "room": "2003",
            "category": "3001",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "details": {
                "format": "%s °C"
            },
            "states": {
                "value": {
                    "mqtt": "loxone/9999/8009"
                }
            }
        },
        "9999/1008": {
            "hwid": "9999",
            "uuid": "1008",
            "mqtt_cmd": "loxone/9999/1008/cmd",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "slider",
            "room": "2000",
            "category": "3002",
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
                "value": {
                    "mqtt": "loxone/9999/8010"
                }
            }
        },
        "9999/1009": {
            "hwid": "9999",
            "uuid": "1009",
            "mqtt_cmd": "loxone/9999/1009/cmd",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "slider",
            "room": "2001",
            "category": "3002",
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
                "value": {
                    "mqtt": "loxone/9999/8011"
                }
            }
        },
        "9999/1010": {
            "hwid": "9999",
            "uuid": "1010",
            "mqtt_cmd": "loxone/9999/1010/cmd",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "slider",
            "room": "2002",
            "category": "3002",
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
                "value": {
                    "mqtt": "loxone/9999/8012"
                }
            }
        },
        "9999/1011": {
            "hwid": "9999",
            "uuid": "1011",
            "mqtt_cmd": "loxone/9999/1011/cmd",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "slider",
            "room": "2003",
            "category": "3002",
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
                "value": {
                    "mqtt": "loxone/9999/8013"
                }
            }
        },
        "9999/1012": {
            "hwid": "9999",
            "uuid": "1012",
            "mqtt_cmd": "loxone/9999/1012/cmd",
            "name": "Musicplayer",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "2000",
            "category": "3003",
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
                "active_output": {
                    "mqtt": "loxone/9999/8014"
                }
            }
        },
        "9999/1013": {
            "hwid": "9999",
            "uuid": "1013",
            "mqtt_cmd": "loxone/9999/1013/cmd",
            "name": "Musicplayer",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "2001",
            "category": "3003",
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
                "active_output": {
                    "mqtt": "loxone/9999/8015"
                }
            }
        },
        "9999/1014": {
            "hwid": "9999",
            "uuid": "1014",
            "mqtt_cmd": "loxone/9999/1014/cmd",
            "name": "Musicplayer",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "2002",
            "category": "3003",
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
                "active_output": {
                    "mqtt": "loxone/9999/8016"
                }
            }
        },
        "9999/1015": {
            "hwid": "9999",
            "uuid": "1015",
            "name": "Musicplayer",
            "mqtt_cmd": "loxone/9999/1015/cmd",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "2003",
            "category": "3003",
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
                "active_output": {
                    "mqtt": "loxone/9999/8017"
                }
            }
        }
    },
    "categories": {
        "9999/3000": {
            "hwid": "9999",
            "uuid": "3000",
            "name": "Lighting",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "order": 2
        },
        "9999/3001": {
            "hwid": "9999",
            "uuid": "3001",
            "name": "Sensors",
            "icon": {
                "href": "assets/svg_icons/map-marker-solid.svg"
            },
            "order": 1
        },
        "9999/3002": {
            "hwid": "9999",
            "uuid": "3002",
            "name": "Audio",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "order": 1
        },
        "9999/3003": {
            "hwid": "9999",
            "uuid": "3003",
            "name": "Heating",
            "icon": {
                "href": "assets/svg_icons/home-heating-solid.svg"
            },
            "order": 1
        }
    },
    "rooms": {
        "9999/2000": {
            "hwid": "9999",
            "uuid": "2000",
            "name": "Living Room",
            "icon": {
                "href": "assets/svg_icons/couch-solid.svg"
            },
            "image": "assets/images/living-room.jpg",
            "order": 1
        },
        "9999/2001": {
            "hwid": "9999",
            "uuid": "2001",
            "name": "Kitchen",
            "icon": {
                "href": "assets/svg_icons/utensils-solid.svg"
            },
            "image": "assets/images/kitchen2.jpg",
            "order": 1
        },
        "9999/2002": {
            "hwid": "9999",
            "uuid": "2002",
            "name": "Bathroom",
            "icon": {
                "href": "assets/svg_icons/shower-solid.svg"
            },
            "image": "assets/images/bathroom.jpg",
            "order": 1
        },
        "9999/2003": {
            "hwid": "9999",
            "uuid": "2003",
            "name": "Bedroom",
            "icon": {
                "href": "assets/svg_icons/bed-outline.svg"
            },
            "order": 1
        }
    }
}
```

## Write values

By default, each control, category and room element will subscribe and listen to messages with the MQTT prefix `loxberry/app/hwid/uuid/<key>`. For example, to update the name of the living room, you can send the following message:

```
loxberry/app/9999/1000/name  ->  My Living Room
```

Alternatively, a control field can subscribe to a dedicated MQTT topic if specified as JSON object `{ mqtt: <topic> }` in the structure. For example, the `mood_list` of the living room light controller can be updated as follows:

```
loxone/9999/8000  ->
    [
        {
            "name": "Default",
            "id": 1,
            "static": false,
            "used": 1
        },
        {
            "name": "On",
            "id": 777,
            "static": false
        },
        {
            "name": "Off",
            "id": 778,
            "static": true
        }
    ]
```

The active mood **Default** can be selected as follows:

```
loxone/9999/8001  -> [1]
```



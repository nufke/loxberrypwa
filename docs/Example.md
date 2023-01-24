# Example

Below a simple example describing the structure to specify controls, categories and rooms. In this example, MQTT messages from/to Node-Red have the prefix `nodered`. The MQTT prefix `loxberry/app` is used to send updates to each control, category or room.

Note that the icons and images use relative paths, referencing the source directory of the PWA icon and image sources. Alternatively, URLs could be used, e.g. `http:/myserver.org/my_image.svg`.

## Load structure

To initialize the App with a structure, send the structure as JSON string with topic `/loxberry/app/structure`:

```
/loxberry/app/structure '{ "controls": { ... },  "categories": { ... }, "rooms": { ... } }'
```

Make sure that the keys of the controls, categories and rooms, use the format `hwid/uuid`, and match with the values for `hwid` and `uuid` in each element.

The string values of `room` and `category` should match with the `uuid` of these elements. It is assumed that `uuid` for the room and category in a control belong to the same `hwid`.

Sending updated structures are considered *incremental*, which means changes to existing objects will be overridden and old objects remain available. To reset/flush all elements in the App, an empty string message should be sent to `/loxberry/app/structure`.

### Simple JSON example

```json
{
    "controls": {
        "9999/1000": {
            "hwid": "9999",
            "uuid": "1000",
            "mqtt_cmd": "nodered/9999/1000/cmd",
            "name": "Lighting Livingroom",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "LightControllerV2",
            "room": "2000",
            "category": "3000",
            "is_favorite": true,
            "is_visible": true,
            "order": [
                1,
                1,
                1
            ],
            "states": {
                "active_moods": {
                    "mqtt": "nodered/9999/8000"
                },
                "mood_list": [
                    {
                        "name": "Default",
                        "id": 1
                    },
                    {
                        "name": "On",
                        "id": 777
                    },
                    {
                        "name": "Off",
                        "id": 778
                    }
                ]
            }
        },
        "9999/1001": {
            "hwid": "9999",
            "uuid": "1001",
            "mqtt_cmd": "nodered/9999/1001/cmd",
            "name": "Lighting Kitchen",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "Pushbutton",
            "room": "2001",
            "category": "3000",
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1,
                1
            ],
            "states": {
                "active": {
                    "mqtt": "nodered/9999/8002"
                }
            }
        },
        "9999/1002": {
            "hwid": "9999",
            "uuid": "1002",
            "mqtt_cmd": "nodered/9999/1002/cmd",
            "name": "Lighting Bath",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "Switch",
            "room": "2002",
            "category": "3000",
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1,
                0
            ],
            "states": {
                "active": {
                    "mqtt": "nodered/9999/8003"
                }
            }
        },
        "9999/1003": {
            "hwid": "9999",
            "uuid": "1003",
            "mqtt_cmd": "nodered/9999/1003/cmd",
            "name": "Lighting Bed",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "LightControllerV2",
            "room": "2003",
            "category": "3000",
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1,
                0
            ],
            "states": {
                "active_moods": {
                    "mqtt": "nodered/9999/8004"
                },
                "mood_list": {
                    "mqtt": "nodered/9999/8005"
                }
            }
        },
        "9999/1004": {
            "hwid": "9999",
            "uuid": "1004",
            "mqtt_cmd": "nodered/9999/1004/cmd",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "InfoOnlyAnalog",
            "room": "2000",
            "category": "3001",
            "is_favorite": true,
            "is_visible": true,
            "order": [
                1,
                1,
                0
            ],
            "details": {
                "format": "%s °C"
            },
            "states": {
                "value": {
                    "mqtt": "nodered/9999/8006"
                }
            }
        },
        "9999/1005": {
            "hwid": "9999",
            "uuid": "1005",
            "mqtt_cmd": "nodered/9999/1005/cmd",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "InfoOnlyAnalog",
            "room": "2001",
            "category": "3001",
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1,
                0
            ],
            "details": {
                "format": "%s °C"
            },
            "states": {
                "value": {
                    "mqtt": "nodered/9999/8007"
                }
            }
        },
        "9999/1006": {
            "hwid": "9999",
            "uuid": "1006",
            "mqtt_cmd": "nodered/9999/1006/cmd",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "InfoOnlyAnalog",
            "room": "2002",
            "category": "3001",
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1,
                1
            ],
            "details": {
                "format": "%s °C"
            },
            "states": {
                "value": {
                    "mqtt": "nodered/9999/8008"
                }
            }
        },
        "9999/1007": {
            "hwid": "9999",
            "uuid": "1007",
            "mqtt_cmd": "nodered/9999/1007/cmd",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "InfoOnlyAnalog",
            "room": "2003",
            "category": "3001",
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1,
                0
            ],
            "details": {
                "format": "%s °C"
            },
            "states": {
                "value": {
                    "mqtt": "nodered/9999/8009"
                }
            }
        },
        "9999/1008": {
            "hwid": "9999",
            "uuid": "1008",
            "mqtt_cmd": "nodered/9999/1008/cmd",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "Slider",
            "room": "2000",
            "category": "3002",
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1,
                0
            ],
            "details": {
                "format": "%s °C",
                "min": "10",
                "max": "25",
                "step": "1"
            },
            "states": {
                "value": {
                    "mqtt": "nodered/9999/8010"
                }
            }
        },
        "9999/1009": {
            "hwid": "9999",
            "uuid": "1009",
            "mqtt_cmd": "nodered/9999/1009/cmd",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "Slider",
            "room": "2001",
            "category": "3002",
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1,
                0
            ],
            "details": {
                "format": "%s °C",
                "min": "10",
                "max": "25",
                "step": "1"
            },
            "states": {
                "value": {
                    "mqtt": "nodered/9999/8011"
                }
            }
        },
        "9999/1010": {
            "hwid": "9999",
            "uuid": "1010",
            "mqtt_cmd": "nodered/9999/1010/cmd",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "Slider",
            "room": "2002",
            "category": "3002",
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1,
                0
            ],
            "details": {
                "format": "%s °C",
                "min": "10",
                "max": "25",
                "step": "1"
            },
            "states": {
                "value": {
                    "mqtt": "nodered/9999/8012"
                }
            }
        },
        "9999/1011": {
            "hwid": "9999",
            "uuid": "1011",
            "mqtt_cmd": "nodered/9999/1011/cmd",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "Slider",
            "room": "2003",
            "category": "3002",
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1,
                0
            ],
            "details": {
                "format": "%s °C",
                "min": "10",
                "max": "25",
                "step": "1"
            },
            "states": {
                "value": {
                    "mqtt": "nodered/9999/8013"
                }
            }
        },
        "9999/1012": {
            "hwid": "9999",
            "uuid": "1012",
            "mqtt_cmd": "nodered/9999/1012/cmd",
            "name": "Musicplayer",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "Radio",
            "room": "2000",
            "category": "3003",
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1,
                1
            ],
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
                    "mqtt": "nodered/9999/8014"
                }
            }
        },
        "9999/1013": {
            "hwid": "9999",
            "uuid": "1013",
            "mqtt_cmd": "nodered/9999/1013/cmd",
            "name": "Musicplayer",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "Radio",
            "room": "2001",
            "category": "3003",
            "is_favorite": true,
            "is_visible": true,
            "order": [
                1,
                1,
                0
            ],
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
                    "mqtt": "nodered/9999/8015"
                }
            }
        },
        "9999/1014": {
            "hwid": "9999",
            "uuid": "1014",
            "mqtt_cmd": "nodered/9999/1014/cmd",
            "name": "Musicplayer",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "Radio",
            "room": "2002",
            "category": "3003",
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1,
                0
            ],
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
                    "mqtt": "nodered/9999/8016"
                }
            }
        },
        "9999/1015": {
            "hwid": "9999",
            "uuid": "1015",
            "name": "Musicplayer",
            "mqtt_cmd": "nodered/9999/1015/cmd",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "Radio",
            "room": "2003",
            "category": "3003",
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1,
                0
            ],
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
                    "mqtt": "nodered/9999/8017"
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
            "is_favorite": true,
            "is_visible": true,
            "order": [
                1,
                2
            ]
        },
        "9999/3001": {
            "hwid": "9999",
            "uuid": "3001",
            "name": "Sensors",
            "icon": {
                "href": "assets/svg_icons/map-marker-solid.svg"
            },
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1
            ]
        },
        "9999/3002": {
            "hwid": "9999",
            "uuid": "3002",
            "name": "Audio",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1
            ]
        },
        "9999/3003": {
            "hwid": "9999",
            "uuid": "3003",
            "name": "Heating",
            "icon": {
                "href": "assets/svg_icons/home-heating-solid.svg"
            },
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1
            ]
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
            "is_favorite": true,
            "is_visible": true,
            "image": "assets/images/living-room.jpg",
            "order": [
                1,
                1
            ]
        },
        "9999/2001": {
            "hwid": "9999",
            "uuid": "2001",
            "name": "Kitchen",
            "icon": {
                "href": "assets/svg_icons/utensils-solid.svg"
            },
            "is_favorite": false,
            "is_visible": true,
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
            "is_favorite": false,
            "is_visible": true,
            "image": "assets/images/bathroom.jpg",
            "order": [
                1,
                1
            ]
        },
        "9999/2003": {
            "hwid": "9999",
            "uuid": "2003",
            "name": "Bedroom",
            "icon": {
                "href": "assets/svg_icons/bed-outline.svg"
            },
            "is_favorite": false,
            "is_visible": true,
            "order": [
                1,
                1
            ]
        }
    }
}
```

## Write values

By default, each control, category and room element will subscribe and listen to messages with the MQTT prefix `loxberry/app/hwid/uuid/<key>`. For example, to update the name of the living room, you can send the following message:

```
loxberry/app/9999/1000/name  "My Living Room"
```

Alternatively, any key under `states` in a control can subscribe to another MQTT topic if specified as JSON object `{ mqtt: <topic> }`, as shown in the example above. For example, the `mood_list` of the living room light-controller can be defined as JSON Array and send via node-red to the MQTT broker using topic `nodered/9999/8000`. Note that the Array should be stringified.

```
nodered/9999/8000
    [
        {
            "name": "Default",
            "id": 1
        },
        {
            "name": "On",
            "id": 777
        },
        {
            "name": "Off",
            "id": 778
        }
    ]
```

After this, the active mood **Default** can be specified and send in a similar way to MQTT topic `nodered/9999/8000`:

```
nodered/9999/8000  "[1]"
```

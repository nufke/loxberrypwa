# Example

Below a simple example describing the structure to specify controls, categories and rooms. Note that the icons and images use relative paths referencing the source directory of the PWA icon and image sources. Alternatively, URLs could be used, e.g. `http:/myserver.org/my_image.svg`.

To initialize the App with a structure, send it over MQTT to topic `/loxberry/app/structure`:

```
/loxberry/app/structure -> { "controls": [ ... ],  "categories": [ ... ], "rooms": [ ... ] }
```

Updates to the structure is *incremental*, which means changes to existing objects will be overridden and old objects remain available. To flush all elements in the App, an empty string message should be sent to `/loxberry/app/structure`.

```json
{
    "controls": [
        {
            "hwid": "1",
            "uuid": "1",
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
                "value": "0"
            }
        },
        {
            "hwid": "1",
            "uuid": "2",
            "name": "Lighting Kitchen",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "switch",
            "room": "1002",
            "category": "2001",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "states": {
                "value": "0"
            }
        },
        {
            "hwid": "1",
            "uuid": "3",
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
                "value": "0"
            }
        },
        {
            "hwid": "1",
            "uuid": "4",
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
                "value": "0"
            }
        },
        {
            "hwid": "1",
            "uuid": "5",
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
                "value": "22.2"
            }
        },
        {
            "hwid": "1",
            "uuid": "6",
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
                "value": "22.3"
            }
        },
        {
            "hwid": "1",
            "uuid": "7",
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
                "value": "22.1"
            }
        },
        {
            "hwid": "1",
            "uuid": "8",
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
                "value": "21.8"
            }
        },
        {
            "hwid": "1",
            "uuid": "9",
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
                "value": "21"
            }
        },
        {
            "hwid": "1",
            "uuid": "10",
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
                "value": "21"
            }
        },
        {
            "hwid": "1",
            "uuid": "11",
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
                "value": "21"
            }
        },
        {
            "hwid": "1",
            "uuid": "12",
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
                "value": "21"
            }
        },
        {
            "hwid": "1",
            "uuid": "13",
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
                "active_output": "0"
            }
        },
        {
            "hwid": "1",
            "uuid": "14",
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
                "active_output": "0"
            }
        },
        {
            "hwid": "1",
            "uuid": "15",
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
                "active_output": "0"
            }
        },
        {
            "hwid": "1",
            "uuid": "16",
            "name": "Musicplayer",
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
                "active_output": "0"
            }
        }
    ],
    "categories": [
        {
            "hwid": "1",
            "uuid": "2001",
            "name": "Lighting",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "order": 2
        },
        {
            "hwid": "1",
            "uuid": "2002",
            "name": "Sensors",
            "icon": {
                "href": "assets/svg_icons/map-marker-solid.svg"
            },
            "order": 1
        },
        {
            "hwid": "1",
            "uuid": "2003",
            "name": "Audio",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "order": 1
        },
        {
            "hwid": "1",
            "uuid": "2004",
            "name": "Heating",
            "icon": {
                "href": "assets/svg_icons/home-heating-solid.svg"
            },
            "order": 1
        }
    ],
    "rooms": [
        {
            "hwid": "1",
            "uuid": "1001",
            "name": "Living Room",
            "icon": {
                "href": "assets/svg_icons/couch-solid.svg"
            },
            "image": "assets/images/living-room.jpg",
            "order": 1
        },
        {
            "hwid": "1",
            "uuid": "1002",
            "name": "Kitchen",
            "icon": {
                "href": "assets/svg_icons/utensils-solid.svg"
            },
            "image": "assets/images/kitchen2.jpg",
            "order": 1
        },
        {
            "hwid": "1",
            "uuid": "1003",
            "name": "Bathroom",
            "icon": {
                "href": "assets/svg_icons/shower-solid.svg"
            },
            "image": "assets/images/bathroom.jpg",
            "order": 1
        },
        {
            "hwid": "1",
            "uuid": "1004",
            "name": "Bedroom",
            "icon": {
                "href": "assets/svg_icons/bed-outline.svg"
            },
            "order": 1
        }
    ]
}
```
# Example

Below a simple example describing the structure to specify controls, categories and rooms. Note that the icons and images use relative paths referencing the source directory of the PWA icon and image sources. Alternatively, URLs could be used, e.g. `http:/myserver.org/my_image.svg`.

To initialize the App with a structure, send it over MQTT to topic `/loxberry/app/settings/set`:

```
/loxberry/app/settings/set     -> { "controls": [ ... ],  "categories": [ ... ], "rooms": [ ... ] }
```

Updates to the structure is *incremental*, which means changes to existing objects will be overridden and old objects remain available. To flush all elements in the App, an empty string message should be sent to `/loxberry/app/settings/set`.

```json
{
    "controls": [
        {
            "hwid": "1",
            "uuid": "1",
            "name": "Lamp couch",
            "icon": {
                "default_href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "switch",
            "room": "1",
            "category": "1",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": 0,
                "format": "%s"
            }
        },
        {
            "hwid": "1",
            "uuid": "2",
            "name": "Lamp dining table",
            "icon": {
                "default_href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "switch",
            "room": "2",
            "category": "1",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": 0,
                "format": "%s"
            }
        },
        {
            "hwid": "1",
            "uuid": "3",
            "name": "Lamp mirror",
            "icon": {
                "default_href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "switch",
            "room": "3",
            "category": "1",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": 0,
                "format": "%s"
            }
        },
        {
            "hwid": "1",
            "uuid": "4",
            "name": "Bed lamp left",
            "icon": {
                "default_href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "switch",
            "room": "4",
            "category": "1",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": 0,
                "format": "%s"
            }
        },
        {
            "hwid": "1",
            "uuid": "5",
            "name": "Temperature",
            "icon": {
                "default_href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "text",
            "room": "1",
            "category": "2",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": 22.2,
                "format": "%s °C"
            }
        },
        {
            "hwid": "1",
            "uuid": "6",
            "name": "Temperature",
            "icon": {
                "default_href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "text",
            "room": "2",
            "category": "2",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": 22.3,
                "format": "%s °C"
            }
        },
        {
            "hwid": "1",
            "uuid": "7",
            "name": "Temperature",
            "icon": {
                "default_href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "text",
            "room": "3",
            "category": "2",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": 22.1,
                "format": "%s °C"
            }
        },
        {
            "hwid": "1",
            "uuid": "8",
            "name": "Temperature",
            "icon": {
                "default_href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "text",
            "room": "4",
            "category": "2",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": 21.8,
                "format": "%s °C"
            }
        },
        {
            "hwid": "1",
            "uuid": "9",
            "name": "Thermostat",
            "icon": {
                "default_href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "plusminus",
            "room": "1",
            "category": "4",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": "Automatic",
                "format": "%s"
            }
        },
        {
            "hwid": "1",
            "uuid": "10",
            "name": "Thermostat",
            "icon": {
                "default_href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "plusminus",
            "room": "2",
            "category": "4",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": "Automatic",
                "format": "%s"
            }
        },
        {
            "hwid": "1",
            "uuid": "11",
            "name": "Thermostat",
            "icon": {
                "default_href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "plusminus",
            "room": "3",
            "category": "4",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": "Automatic",
                "format": "%s"
            }
        },
        {
            "hwid": "1",
            "uuid": "12",
            "name": "Thermostat",
            "icon": {
                "default_href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "plusminus",
            "room": "4",
            "category": "4",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": "Automatic",
                "format": "%s"
            }
        },
        {
            "hwid": "1",
            "uuid": "13",
            "name": "Musicplayer",
            "icon": {
                "default_href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "1",
            "category": "3",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": 0,
                "format": "%s",
                "states": [
                    "channel 1",
                    "channel 2",
                    "channel 3"
                ]
            }
        },
        {
            "hwid": "1",
            "uuid": "14",
            "name": "Musicplayer",
            "icon": {
                "default_href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "2",
            "category": "3",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": 0,
                "format": "%s",
                "states": [
                    "channel 1",
                    "channel 2",
                    "channel 3"
                ]
            }
        },
        {
            "hwid": "1",
            "uuid": "15",
            "name": "Musicplayer",
            "icon": {
                "default_href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "3",
            "category": "3",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": 0,
                "format": "%s",
                "states": [
                    "channel 1",
                    "channel 2",
                    "channel 3"
                ]
            }
        },
        {
            "hwid": "1",
            "uuid": "16",
            "name": "Musicplayer",
            "icon": {
                "default_href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "4",
            "category": "3",
            "is_favorite": false,
            "is_visible": true,
            "order": 1,
            "state": {
                "value": 0,
                "format": "%s",
                "states": [
                    "channel 1",
                    "channel 2",
                    "channel 3"
                ]
            }
        }
    ],
    "categories": [
        {
            "hwid": "1",
            "uuid": "1",
            "name": "Lighting",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "image": "assets/images/no-image.jpg",
            "order": 2
        },
        {
            "hwid": "1",
            "uuid": "2",
            "name": "Sensors",
            "icon": {
                "href": "assets/svg_icons/map-marker-solid.svg"
            },
            "image": "assets/images/no-image.jpg",
            "order": 1
        },
        {
            "hwid": "1",
            "uuid": "3",
            "name": "Audio",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "image": "assets/images/no-image.jpg",
            "order": 1
        },
        {
            "hwid": "1",
            "uuid": "4",
            "name": "Heating",
            "icon": {
                "href": "assets/svg_icons/home-heating-solid.svg"
            },
            "image": "assets/images/no-image.jpg",
            "order": 1
        }
    ],
    "rooms": [
        {
            "hwid": "1",
            "uuid": "1",
            "name": "Living Room",
            "icon": {
                "href": "assets/svg_icons/couch-solid.svg"
            },
            "image": "assets/images/living-room.jpg",
            "order": 1
        },
        {
            "hwid": "1",
            "uuid": "2",
            "name": "Kitchen",
            "icon": {
                "href": "assets/svg_icons/utensils-solid.svg"
            },
            "image": "assets/images/kitchen2.jpg",
            "order": 1
        },
        {
            "hwid": "1",
            "uuid": "3",
            "name": "Bathroom",
            "icon": {
                "href": "assets/svg_icons/shower-solid.svg"
            },
            "image": "assets/images/bathroom.jpg",
            "order": 1
        },
        {
            "hwid": "1",
            "uuid": "4",
            "name": "Bedroom",
            "icon": {
                "href": "assets/svg_icons/bed-outline.svg"
            },
            "image": "assets/images/no-image.jpg",
            "order": 1
        }
    ]
}
```
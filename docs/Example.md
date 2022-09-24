Below a simple example describing the structure to specify controls, categories and rooms. Note that the icons and images use relative paths referencing the source directory of the PWA icon and image sources. Alternatively, URLs could be used, e.g. `http:/myserver.org/my_image.svg`.

To initialize the App with a structure, send it over MQTT to topic `/loxberry/app/settings/set`:

```
/loxberry/app/settings/set     -> { "controls": [ ... ],  "categories": [ ... ], "rooms": [ ... ] }  
```

Update to the structure is *incremental*, which means changes to existing objects will be overridden and old objects remain available. To flush all objects in the structure, an empty string message should be sent to `/loxberry/app/settings/set`.

```json
{
    "controls": [
        {
            "topic": "control/1",
            "name": "Lamp couch",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "switch",
            "room": "Living Room",
            "category": "Lighting",
            "is_favorite": true,
            "order": 1,
            "state": {
                "value": 0,
                "format": "%s"
            }
        },
        {
            "topic": "control/2",
            "name": "Lamp dining table",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "switch",
            "room": "Kitchen",
            "category": "Lighting",
            "is_favorite": false,
            "order": 1,
            "state": {
                "value": 0,
                "format": "%s"
            }
        },
        {
            "topic": "control/3",
            "name": "Lamp mirror",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "switch",
            "room": "Bathroom",
            "category": "Lighting",
            "is_favorite": false,
            "order": 1,
            "state": {
                "value": 0,
                "format": "%s"
            }
        },
        {
            "topic": "control/4",
            "name": "Bed lamp left",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "type": "switch",
            "room": "Bedroom",
            "category": "Lighting",
            "is_favorite": false,
            "order": 1,
            "state": {
                "value": 0,
                "format": "%s"
            }
        },
        {
            "topic": "control/5",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "text",
            "room": "Living Room",
            "category": "Sensors",
            "is_favorite": false,
            "order": 1,
            "state": {
                "value": 22.2,
                "format": "%s °C"
            }
        },
        {
            "topic": "control/6",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "text",
            "room": "Kitchen",
            "category": "Sensors",
            "is_favorite": false,
            "order": 1,
            "state": {
                "value": 22.3,
                "format": "%s °C"
            }
        },
        {
            "topic": "control/7",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "text",
            "room": "Bathroom",
            "category": "Sensors",
            "is_favorite": false,
            "order": 1,
            "state": {
                "value": 22.1,
                "format": "%s °C"
            }
        },
        {
            "topic": "control/8",
            "name": "Temperature",
            "icon": {
                "href": "assets/svg_icons/thermometer-outline.svg"
            },
            "type": "text",
            "room": "Bedroom",
            "category": "Sensors",
            "is_favorite": false,
            "order": 1,
            "state": {
                "value": 21.8,
                "format": "%s °C"
            }
        },
        {
            "topic": "control/9",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "plusminus",
            "room": "Living Room",
            "category": "Heating",
            "is_favorite": false,
            "order": 1,
            "state": {
                "value": "Automatic",
                "format": "%s"
            }
        },
        {
            "topic": "control/10",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "plusminus",
            "room": "Kitchen",
            "category": "Heating",
            "is_favorite": false,
            "order": 1,
            "state": {
                "value": "Automatic",
                "format": "%s"
            }
        },
        {
            "topic": "control/11",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "plusminus",
            "room": "Bathroom",
            "category": "Heating",
            "is_favorite": false,
            "order": 1,
            "state": {
                "value": "Automatic",
                "format": "%s"
            }
        },
        {
            "topic": "control/12",
            "name": "Thermostat",
            "icon": {
                "href": "assets/svg_icons/knob-solid.svg"
            },
            "type": "plusminus",
            "room": "Bedroom",
            "category": "Heating",
            "is_favorite": false,
            "order": 1,
            "state": {
                "value": "Automatic",
                "format": "%s"
            }
        },
        {
            "topic": "control/13",
            "name": "Musicplayer",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "Living Room",
            "category": "Audio",
            "is_favorite": false,
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
            "topic": "control/14",
            "name": "Musicplayer",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "Kitchen",
            "category": "Audio",
            "is_favorite": false,
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
            "topic": "control/15",
            "name": "Musicplayer",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "Bathroom",
            "category": "Audio",
            "is_favorite": false,
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
            "topic": "control/16",
            "name": "Musicplayer",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "type": "radio",
            "room": "Bedroom",
            "category": "Audio",
            "is_favorite": false,
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
            "topic": "category/1",
            "name": "Lighting",
            "icon": {
                "href": "assets/svg_icons/bulb-outline.svg"
            },
            "image": "assets/images/no-image.jpg",
            "order": 2
        },
        {
            "topic": "category/2",
            "name": "Sensors",
            "icon": {
                "href": "assets/svg_icons/map-marker-solid.svg"
            },
            "image": "assets/images/no-image.jpg",
            "order": 1
        },
        {
            "topic": "category/3",
            "name": "Audio",
            "icon": {
                "href": "assets/svg_icons/music-solid.svg"
            },
            "image": "assets/images/no-image.jpg",
            "order": 1
        },
        {
            "topic": "category/4",
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
            "topic": "room/1",
            "name": "Living Room",
            "icon": {
                "href": "assets/svg_icons/couch-solid.svg"
            },
            "image": "assets/images/living-room.jpg",
            "order": 1
        },
        {
            "topic": "room/2",
            "name": "Kitchen",
            "icon": {
                "href": "assets/svg_icons/utensils-solid.svg"
            },
            "image": "assets/images/kitchen2.jpg",
            "order": 1
        },
        {
            "topic": "room/3",
            "name": "Bathroom",
            "icon": {
                "href": "assets/svg_icons/shower-solid.svg"
            },
            "image": "assets/images/bathroom.jpg",
            "order": 1
        },
        {
            "topic": "room/4",
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
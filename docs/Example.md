# Example

The example below shows a simple example describing the structure to specify controls, categories and rooms. In this example, the LoxBerry App interacts with  Node-RED. Therefore the App will subscribe to MQTT prefix `nodered`.

Note that the icons and images may use relative paths, referencing the directory where icon and image sources are stored. Alternatively, URLs could be used, e.g. `http:/myserver.org/my_image.svg`.

## Load structure

To initialize the LoxBerry App with a structure, a JSON structure compatible with the Loxone Miniserver structure `LoxAPP3.json`)should be sent to topic `/nodered/structure`. A minimalistic example is given below.

### Minimal JSON structure

```json
{
  "msInfo": {
    "serialNr": "1234567890"
  },
  "controls": {
    "1": {
      "uuidAction": "1",
      "name": "Lighting Living room",
      "defaultIcon": "bulb-outline.svg",
      "type": "LightControllerV2",
      "room": "2001",
      "cat": "1001",
      "defaultRating": 1,
      "isFavorite": true,
      "isVisible": true,
      "states": {
        "activeMoods": "8001",
        "moodList": "8002"
      }
    },
    "2": {
      "uuidAction": "2",
      "name": "Lighting Kitchen",
      "defaultIcon": "bulb-outline.svg",
      "type": "Pushbutton",
      "room": "2002",
      "cat": "1001",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true,
      "states": {
        "active": "8003"
      }
    },
    "3": {
      "uuidAction": "3",
      "name": "Lighting Bath",
      "defaultIcon": "bulb-outline.svg",
      "type": "Switch",
      "room": "2003",
      "cat": "1001",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true,
      "states": {
        "active": "8004"
      }
    },
    "4": {
      "uuidAction": "4",
      "name": "Lighting Bed",
      "defaultIcon": "bulb-outline.svg",
      "type": "LightControllerV2",
      "room": "2004",
      "cat": "1001",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true,
      "states": {
        "activeMoods": "8005",
        "moodList": "8006"
      }
    },
    "5": {
      "uuidAction": "5",
      "name": "Temperature",
      "defaultIcon": "thermometer-outline.svg",
      "type": "InfoOnlyAnalog",
      "room": "2001",
      "cat": "1002",
      "defaultRating": 1,
      "isFavorite": true,
      "isVisible": true,
      "details": {
        "format": "%s °C"
      },
      "states": {
        "value": "8007"
      }
    },
    "6": {
      "uuidAction": "6",
      "name": "Temperature",
      "defaultIcon": "thermometer-outline.svg",
      "type": "InfoOnlyAnalog",
      "room": "2002",
      "cat": "1002",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true,
      "details": {
        "format": "%s °C"
      },
      "states": {
        "value": "8008"
      }
    },
    "7": {
      "uuidAction": "7",
      "name": "Temperature",
      "defaultIcon": "thermometer-outline.svg",
      "type": "InfoOnlyAnalog",
      "room": "2003",
      "cat": "1002",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true,
      "details": {
        "format": "%s °C"
      },
      "states": {
        "value": "8009"
      }
    },
    "8": {
      "uuidAction": "8",
      "name": "Temperature",
      "defaultIcon": "thermometer-outline.svg",
      "type": "InfoOnlyAnalog",
      "room": "2004",
      "cat": "1002",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true,
      "details": {
        "format": "%s °C"
      },
      "states": {
        "value": "8010"
      }
    },
    "9": {
      "uuidAction": "9",
      "name": "Thermostat",
      "defaultIcon": "knob-solid.svg",
      "type": "Slider",
      "room": "2001",
      "cat": "1004",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true,
      "details": {
        "format": "%s °C",
        "min": "10",
        "max": "25",
        "step": "1"
      },
      "states": {
        "value": "8011"
      }
    },
    "10": {
      "uuidAction": "10",
      "name": "Thermostat",
      "defaultIcon": "knob-solid.svg",
      "type": "Slider",
      "room": "2002",
      "cat": "1004",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true,
      "details": {
        "format": "%s °C",
        "min": "10",
        "max": "25",
        "step": "1"
      },
      "states": {
        "value": "8012"
      }
    },
    "11": {
      "uuidAction": "11",
      "name": "Thermostat",
      "defaultIcon": "knob-solid.svg",
      "type": "Slider",
      "room": "2003",
      "cat": "1004",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true,
      "details": {
        "format": "%s °C",
        "min": "10",
        "max": "25",
        "step": "1"
      },
      "states": {
        "value": "8013"
      }
    },
    "12": {
      "uuidAction": "12",
      "name": "Thermostat",
      "defaultIcon": "knob-solid.svg",
      "type": "Slider",
      "room": "2004",
      "cat": "1004",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true,
      "details": {
        "format": "%s °C",
        "min": "10",
        "max": "25",
        "step": "1"
      },
      "states": {
        "value": "8014"
      }
    },
    "13": {
      "uuidAction": "13",
      "name": "Musicplayer",
      "defaultIcon": "music-solid.svg",
      "type": "Radio",
      "room": "2001",
      "cat": "1003",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true,
      "details": {
        "allOff": "Off",
        "outputs": {
          "1": "Channel 1",
          "2": "Channel 2",
          "3": "Channel 3"
        }
      },
      "states": {
        "activeOutput": "8015"
      }
    },
    "14": {
      "uuidAction": "14",
      "name": "Musicplayer",
      "defaultIcon": "music-solid.svg",
      "type": "Radio",
      "room": "2002",
      "cat": "1003",
      "defaultRating": 1,
      "isFavorite": true,
      "isVisible": true,
      "details": {
        "allOff": "Off",
        "outputs": {
          "1": "Channel 1",
          "2": "Channel 2",
          "3": "Channel 3"
        }
      },
      "states": {
        "activeOutput": "8016"
      }
    },
    "15": {
      "uuidAction": "15",
      "name": "Musicplayer",
      "defaultIcon": "music-solid.svg",
      "type": "Radio",
      "room": "2003",
      "cat": "1003",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true,
      "details": {
        "allOff": "Off",
        "outputs": {
          "1": "Channel 1",
          "2": "Channel 2",
          "3": "Channel 3"
        }
      },
      "states": {
        "activeOutput": "8017"
      }
    },
    "16": {
      "uuidAction": "15",
      "name": "Musicplayer",
      "defaultIcon": "music-solid.svg",
      "type": "Radio",
      "room": "2004",
      "cat": "1003",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true,
      "details": {
        "allOff": "Off",
        "outputs": {
          "1": "Channel 1",
          "2": "Channel 2",
          "3": "Channel 3"
        }
      },
      "states": {
        "activeOutput": "8018"
      }
    }
  },
  "cats": {
    "1001": {
      "uuid": "1001",
      "name": "Lighting",
      "image": "bulb-outline.svg",
      "defaultRating": 0,
      "isFavorite": true,
      "isVisible": true
    },
    "1002": {
      "uuid": "1002",
      "name": "Sensors",
      "image": "map-marker-solid.svg",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true
    },
    "1003": {
      "uuid": "1003",
      "name": "Audio",
      "image": "music-solid.svg",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true
    },
    "1004": {
      "uuid": "1004",
      "name": "Heating",
      "image": "home-heating-solid.svg",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true
    }
  },
  "rooms": {
    "2001": {
      "uuid": "2001",
      "name": "Living Room",
      "image": "couch-solid.svg",
      "defaultRating": 0,
      "isFavorite": true,
      "isVisible": true
    },
    "2002": {
      "uuid": "2002",
      "name": "Kitchen",
      "image": "utensils-solid.svg",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true
    },
    "2003": {
      "uuid": "2003",
      "name": "Bathroom",
      "image": "shower-solid.svg",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true
    },
    "2004": {
      "uuid": "2004",
      "name": "Bedroom",
      "image": "bed-outline.svg",
      "defaultRating": 0,
      "isFavorite": false,
      "isVisible": true
    }
  }
}
```

## Set control state and values

By default, each control, category and room element will subscribe and listen to messages with the MQTT prefix `loxberry/app/<serialNr>/<uuid>/<key>`. For example, to update the name in the living room, you can send the following MQTT message:

```
loxberry/app/123456789/1/name  "My Living Room"
```

Alternatively, any key under `states` in a control can subscribe to another MQTT topic if specified as unique ID `<uuid>`, as shown in the example above. For example, the `moodList` of the living room light-controller can be defined as JSON Array and send via node-red to the MQTT server using topic `nodered/1234567890/8002`. Note that the Array should be stringified.

```json
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

After this, the active mood **Default** can be specified and send in a similar way to MQTT topic `nodered/1234567890/8001`:

```
nodered/1234567890/8001  "[1]"
```

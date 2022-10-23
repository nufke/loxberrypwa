# MQTT API

**NOTE**: MQTT topic API under development and will change!

## MQTT settings API

The MQTT settings API is used to send an initial App structure in the form of a single JSON object containing all controls, categories, and rooms, to  MQTT topic `/loxberry/app/structure`. The upload is incremental, which means changes to existing objects will be overridden and old objects remain available. To flush all objects, an empty string message should be sent to `/loxberry/app/structure`.

```
/loxberry/app/structure -> { "controls": [ ... ],  "categories": [ ... ], "rooms": [ ... ] }
```

More information on the JSON data model is given [here](JSON-data-model.md)

After sending the initial structure, each control, category, and room item in the App has multiple associated MQTT topics registered which enable updates of individual element as shown below.

## MQTT control API

The MQTT topic API for controls is listed below. The `hwid` refers to the hardware (device) ID to which the control belongs (i.e. Miniserver serialnr). The `control-uuid` is the unique identifier for the control. The `hwid` and `control-uuid` cannot be changed dynamically, but only as part of the creation of a new structure. The `room-uuid` or `category-uuid` should be given for the `room` and `category` topic respectively,  which should exist for the hardware (device) ID `hwid`. The control type should be one of the following strings: dimmer, light, light_c, link, push, radio, screen, screen_c, slider, switch, tempctrl, text, updown.

```
/loxberry/app/<hwid>/<control-uuid>/name                 -> "Light control"
/loxberry/app/<hwid>/<control-uuid>/icon/href            -> "http://myserver.org/bulb.svg"
/loxberry/app/<hwid>/<control-uuid>/icon/color           -> "#CECECE"
/loxberry/app/<hwid>/<control-uuid>/type                 -> "switch"
/loxberry/app/<hwid>/<control-uuid>/room                 -> "2001" (should match <room-uuid>)
/loxberry/app/<hwid>/<control-uuid>/category             -> "1001" (should match <category-uuid>)
/loxberry/app/<hwid>/<control-uuid>/is_favorite          -> false
/loxberry/app/<hwid>/<control-uuid>/is_visible           -> true
/loxberry/app/<hwid>/<control-uuid>/is_protected         -> false
/loxberry/app/<hwid>/<control-uuid>/order                -> 1
/loxberry/app/<hwid>/<control-uuid>/state/value          -> "1"
/loxberry/app/<hwid>/<control-uuid>/state/format         -> "%s"
/loxberry/app/<hwid>/<control-uuid>/state/color          -> "#FFFFFF"

```

## MQTT category API

The MQTT topic API for categories is listed below. The `hwid` refers to the hardware (device) ID to which the category belongs (i.e. Miniserver serialnr). The `category-uuid` is the unique identifier for the category. The `hwid` and `category-uuid` cannot be changed dynamically, but only as part of the creation of a new structure.

```
/loxberry/app/<hwid>/<category-uuid>/name               -> "Lighting"
/loxberry/app/<hwid>/<category-uuid>/icon/href          -> "http://myserver.org/lighting_icon.svg"
/loxberry/app/<hwid>/<category-uuid>/icon/color         -> "#CECECE"
/loxberry/app/<hwid>/<category-uuid>/image              -> "http://myserver.org/lighting_image.png"
/loxberry/app/<hwid>/<category-uuid>/is_visible         -> true
/loxberry/app/<hwid>/<category-uuid>/is_protected       -> false
/loxberry/app/<hwid>/<category-uuid>/order              -> 1
```

## MQTT room API

The MQTT topic API for rooms is listed below. The `hwid` refers to the hardware (device) ID to which the room belongs (i.e. Miniserver serialnr). The `room-uuid` is the unique identifier for the room. The `hwid` and `room-uuid` cannot be changed dynamically, but only as part of the creation of a new structure.

```
/loxberry/app/<hwid>/<room-uuid>/name                       -> "Living Room"
/loxberry/app/<hwid>/<room-uuid>/icon/href                  -> "http://myserver.org/living_room_icon.svg"
/loxberry/app/<hwid>/<room-uuid>/icon/color                 -> "#CECECE"
/loxberry/app/<hwid>/<room-uuid>/image                      -> "http://myserver.org/living_room_image.png"
/loxberry/app/<hwid>/<room-uuid>/is_visible                 -> true
/loxberry/app/<hwid>/<room-uuid>/is_protected               -> false
/loxberry/app/<hwid>/<room-uuid>/order                      -> 1
```

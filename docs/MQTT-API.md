# MQTT API

**NOTE**: MQTT topic API under development and will change!

## MQTT control API

The MQTT topic API for controls is listed below. Note that the topic string does not include the app-specific topic `loxberry/app`

```
/loxberry/app/<control-hwid>/<control-uuid>/name                 -> "Light control"
/loxberry/app/<control-hwid>/<control-uuid>/icon/href            -> "http://myserver.org/bulb.svg"
/loxberry/app/<control-hwid>/<control-uuid>/icon/default_color   -> "#CECECE"
/loxberry/app/<control-hwid>/<control-uuid>/type                 -> "switch"
/loxberry/app/<control-hwid>/<control-uuid>/room                 -> "Living Room"
/loxberry/app/<control-hwid>/<control-uuid>/category             -> "Lighting"
/loxberry/app/<control-hwid>/<control-uuid>/is_favorite          -> true
/loxberry/app/<control-hwid>/<control-uuid>/is_visible           -> true
/loxberry/app/<control-hwid>/<control-uuid>/is_protected         -> false
/loxberry/app/<control-hwid>/<control-uuid>/order                -> 1
/loxberry/app/<control-hwid>/<control-uuid>/state/value          -> "1"
/loxberry/app/<control-hwid>/<control-uuid>/state/format         -> "%s"
/loxberry/app/<control-hwid>/<control-uuid>/state/default_color  -> "#FFFFFF"

```

## MQTT category API

```
/loxberry/app/<category-hwid>/<category-uuid>/name               -> "Lighting"
/loxberry/app/<category-hwid>/<category-uuid>/icon/href          -> "http://myserver.org/lighting_icon.svg"
/loxberry/app/<category-hwid>/<category-uuid>/icon/default_color -> "#CECECE"
/loxberry/app/<category-hwid>/<category-uuid>/image              -> "http://myserver.org/lighting_image.png"
/loxberry/app/<category-hwid>/<category-uuid>/is_visible         -> true
/loxberry/app/<category-hwid>/<category-uuid>/is_protected       -> false
/loxberry/app/<category-hwid>/<category-uuid>/order              -> 1
```

## MQTT room API

```
/loxberry/app/<room-hwid>/<room-uuid>/name                       -> "Living Room"
/loxberry/app/<room-hwid>/<room-uuid>/icon/href                  -> "http://myserver.org/living_room_icon.svg"
/loxberry/app/<room-hwid>/<room-uuid>/icon/default_color         -> "#CECECE"
/loxberry/app/<room-hwid>/<room-uuid>/image                      -> "http://myserver.org/living_room_image.png"
/loxberry/app/<room-hwid>/<room-uuid>/is_visible                 -> true
/loxberry/app/<room-hwid>/<room-uuid>/is_protected               -> false
/loxberry/app/<room-hwid>/<room-uuid>/order                      -> 1
```

## MQTT settings API

The MQTT settings API is introduced to manage general app settings. It supports an upload of a single JSON object containing all controls, categories and rooms. Upload is incremental, which means changes to existing objects will be overridden and old objects remain available. To flush all objects, an empty string message should be sent.

```
/loxberry/app/settings/set     -> { "controls": [ ... ],  "categories": [ ... ], "rooms": [ ... ] }
```

More information on the data model is given [here](JSON-data-model.md)

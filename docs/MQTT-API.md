# MQTT API

**NOTE**: MQTT topic API under development and will change!

## MQTT control API

The MQTT topic API for controls is listed below. Note that the topic string does not include the app-specific topic `loxberry/app`

```
/loxberry/app/control/<control-uuid>/name          -> "Light control"
/loxberry/app/control/<control-uuid>/icon/href     -> "http://myserver.org/bulb.svg"
/loxberry/app/control/<control-uuid>/icon/color    -> "#CECECE"
/loxberry/app/control/<control-uuid>/type          -> "switch"
/loxberry/app/control/<control-uuid>/room          -> "Living Room"
/loxberry/app/control/<control-uuid>/category      -> "Lighting"
/loxberry/app/control/<control-uuid>/is_favorite   -> true
/loxberry/app/control/<control-uuid>/is_visible    -> true
/loxberry/app/control/<control-uuid>/is_protected  -> false
/loxberry/app/control/<control-uuid>/order         -> 1
/loxberry/app/control/<control-uuid>/state/value   -> "on"
/loxberry/app/control/<control-uuid>/state/format  -> "%s"
/loxberry/app/control/<control-uuid>/state/color   -> "#FFFFFF"

```

## MQTT category API

```
/loxberry/app/category/<category-uuid>/name         -> "Lighting"
/loxberry/app/category/<category-uuid>/icon/href    -> "http://myserver.org/lighting.svg"
/loxberry/app/category/<category-uuid>/icon/color   -> "#CECECE"
/loxberry/app/category/<category-uuid>/is_visible   -> true
/loxberry/app/category/<category-uuid>/is_protected -> false
/loxberry/app/category/<category-uuid>/order        -> 1
```

## MQTT room API

```
/loxberry/app/room/<room-uuid>/name                 -> "Living Room"
/loxberry/app/room/<room-uuid>/icon/href            -> "http://myserver.org/living_room.svg"
/loxberry/app/room/<room-uuid>/icon/color           -> "#CECECE"
/loxberry/app/room/<room-uuid>/image                -> "http://myserver.org/living_room.png"
/loxberry/app/room/<room-uuid>/is_visible           -> true
/loxberry/app/room/<room-uuid>/is_protected         -> false
/loxberry/app/room/<room-uuid>/order                -> 1
```

## MQTT settings API

The MQTT settings API is introduced to manage general app settings. It supports an upload of a single JSON object containing all controls, categories and rooms. Upload is incremental, which means changes to existing objects will be overridden and old objects remain available. To flush all objects, an empty string message should be sent. 

```
/loxberry/app/settings/set     -> { "controls": [ ... ],  "categories": [ ... ], "rooms": [ ... ] }  
```

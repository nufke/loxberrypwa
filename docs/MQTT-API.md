# MQTT API

**NOTE**: MQTT topic API under development and will change!

## MQTT topic prefix

The topic prefix can be specified in the App settings. In this example, the topic prefix `/loxberry/app` is used.

## MQTT settings API

The MQTT settings API is used to send an initial App structure in the form of a single JSON object containing all controls, categories, and rooms, to  MQTT topic `/loxberry/app/structure`. The upload is incremental, which means changes to existing objects will be overridden and old objects remain available. To flush all objects, an empty string message should be sent to `/loxberry/app/structure`.

```
/loxberry/app/structure -> { "controls": { ... },  "categories": { ... }, "rooms": { ... } }
```

More information on the JSON data model is given [here](https://github.com/nufke/loxberrypwa/wiki/JSON-data-model)

After sending the initial structure, each control, category, and room item in the App has multiple associated MQTT topics registered which enable updates of individual element as shown below.

## MQTT control API

An example for the MQTT topic API for controls is listed below.

```
/loxberry/app/<hwid>/<control-uuid>/name            -> "Light control"
/loxberry/app/<hwid>/<control-uuid>/mqtt_cmd        -> "my_mqtt_device/cmd"
/loxberry/app/<hwid>/<control-uuid>/icon/href       -> "http://myserver.org/bulb.svg"
/loxberry/app/<hwid>/<control-uuid>/icon/color      -> "#CECECE"
/loxberry/app/<hwid>/<control-uuid>/type            -> "switch"
/loxberry/app/<hwid>/<control-uuid>/room            -> "2001" (should match <room-uuid>)
/loxberry/app/<hwid>/<control-uuid>/category        -> "1001" (should match <category-uuid>)
/loxberry/app/<hwid>/<control-uuid>/is_favorite     -> false
/loxberry/app/<hwid>/<control-uuid>/is_visible      -> true
/loxberry/app/<hwid>/<control-uuid>/is_protected    -> false
/loxberry/app/<hwid>/<control-uuid>/order           -> 1
/loxberry/app/<hwid>/<control-uuid>/details/format  -> "%s"
/loxberry/app/<hwid>/<control-uuid>/states/active   -> "1"

```

## MQTT category API

An example for the MQTT topic API for categories is listed below.

```
/loxberry/app/<hwid>/<category-uuid>/name           -> "Lighting"
/loxberry/app/<hwid>/<category-uuid>/icon/href      -> "http://myserver.org/lighting_icon.svg"
/loxberry/app/<hwid>/<category-uuid>/is_visible     -> true
/loxberry/app/<hwid>/<category-uuid>/is_protected   -> false
/loxberry/app/<hwid>/<category-uuid>/order          -> 1
```

## MQTT room API

An example for the MQTT topic API for rooms is listed below.

```
/loxberry/app/<hwid>/<room-uuid>/name               -> "Living Room"
/loxberry/app/<hwid>/<room-uuid>/icon/href          -> "http://myserver.org/living_room_icon.svg"
/loxberry/app/<hwid>/<room-uuid>/is_visible         -> true
/loxberry/app/<hwid>/<room-uuid>/is_protected       -> false
/loxberry/app/<hwid>/<room-uuid>/order              -> 1
```

# MQTT API

**_NOTE: MQTT topic API under development and will change!_**

## MQTT topic prefix

The topic prefix can be specified in the App settings. In this example, the topic prefix `/loxberry/app` is used.

## MQTT control API

An example for the MQTT topic API for controls is listed below.

```
/loxberry/app/<serialNr>/<control-uuid>/name             "Light control"
/loxberry/app/<serialNr>/<control-uuid>/mqtt             "my_mqtt_device/cmd"
/loxberry/app/<serialNr>/<control-uuid>/icon/href        "http://myserver.org/bulb.svg"
/loxberry/app/<serialNr>/<control-uuid>/icon/color       "#CECECE"
/loxberry/app/<serialNr>/<control-uuid>/type             "Switch"
/loxberry/app/<serialNr>/<control-uuid>/room             "2001" (should match <room-uuid>)
/loxberry/app/<serialNr>/<control-uuid>/category         "1001" (should match <category-uuid>)
/loxberry/app/<serialNr>/<control-uuid>/isFavorite       false
/loxberry/app/<serialNr>/<control-uuid>/isVisible        true
/loxberry/app/<serialNr>/<control-uuid>/isSecured        false
/loxberry/app/<serialNr>/<control-uuid>/order            "[1, 1, 1]"
/loxberry/app/<serialNr>/<control-uuid>/details/format   "%s"
/loxberry/app/<serialNr>/<control-uuid>/states/active    "1"

```

## MQTT category API

An example for the MQTT topic API for categories is listed below.

```
/loxberry/app/<serialNr>/<category-uuid>/name            "Lighting"
/loxberry/app/<serialNr>/<category-uuid>/icon/href       "http://myserver.org/lighting_icon.svg"
/loxberry/app/<serialNr>/<category-uuid>/isVisible       true
/loxberry/app/<serialNr>/<category-uuid>/isSecured       false
/loxberry/app/<serialNr>/<category-uuid>/order           "[1, 1]"
```

## MQTT room API

An example for the MQTT topic API for rooms is listed below.

```
/loxberry/app/<serialNr>/<room-uuid>/name                "Living Room"
/loxberry/app/<serialNr>/<room-uuid>/icon/href           "http://myserver.org/living_room_icon.svg"
/loxberry/app/<serialNr>/<room-uuid>/isVisible           true
/loxberry/app/<serialNr>/<room-uuid>/isSecured           false
/loxberry/app/<serialNr>/<room-uuid>/order               "[1, 1]"
```

# JSON data model

**NOTE**: JSON data model under development and will change!

# JSON data model for controls 

This model is used within the app to manage the properties of the control elements. The elements in the data model match the MQTT topic names.  

Fields indicated with '?' are optional

```
{
  uuid: string                       (unique identifier to identify the control as MQTT topic)
  name: string                       (GUI name)
  icon: {
          href: string               (URL to SVG icon)
          color?: string             (RGB hex notation, e.g. #FFFFFF)
        }
  type: string                       (type of control, e.g., switch, button, slider, etc. See below)
  room: string                       (GUI name for Room)
  category: string                   (GUI name for Category)
  is_favorite?: Boolean              (elevate to favorite item/card)
  is_visible: Boolean                (make invisible)
  is_protected?: Boolean             (passwd/PIN protected control)
  order?: Number                     (defines order in list box)
  state: {
           value: string             (e.g. "1", "0", "22.1", "on", "off", ...)
           format: string            (message format in sprintf notation, can include pre- and post-text, such as units)
           states?: string[]         (array with valid states for radio buttons)
           color?: string            (Color in RGB hex notation, e.g. #FFFFFF)
         }
}
```

## Control type (string)

The control type is a string (enum) which defines the style of the button.

```
"link"
"push"
"radio"
"dimmer"
"slider"
"switch"
"up_down"
"text" (no button)
```

# JSON data model for categories

```
{
  uuid: string                       (unique identifier to identify the category as MQTT topic)
  name: string                       (GUI name)
  icon: {
          href: string               (URL to SVG icon)
          color?: string             (RGB hex notation, e.g. #FFFFFF)
        }
  is_visible: Boolean                (make invisible)
  is_protected?: Boolean             (passwd/PIN protected control)
  order?: Number                     (defines order in list box)
}
```

# JSON data model for rooms

```
{
  uuid: string                       (unique identifier to identify the room as MQTT topic)
  name: string                       (GUI name)
  icon: {
          href: string               (URL to SVG icon)
          color?: string             (RGB hex notation, e.g. #FFFFFF)
        }
  is_visible: Boolean                (make invisible)
  is_protected?: Boolean             (passwd/PIN protected control)
  order?: Number                     (defines order in list box)
}
```

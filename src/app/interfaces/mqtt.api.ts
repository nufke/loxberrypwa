// MQTT topics API, used to register the MQTT topics
// note: topic /states/# is NOT added, this is managed via nested MQTT topics

export const MqttTopics = [
  "/mqtt/#",
  "/name",
  "/icon/#",
  "/type",
  "/room",
  "/category",
  "/is_favorite",
  "/is_visible",
  "/is_protected",
  "/order",
  "/details/#"
];

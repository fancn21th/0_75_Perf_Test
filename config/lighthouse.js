"use strict";

module.exports = {
  extends: "lighthouse:default",
  settings: {
    emulatedFormFactor: "desktop",
    onlyAudits: [
      "first-meaningful-paint"
      // 'speed-index-metric',
      // 'estimated-input-latency',
      // 'first-interactive',
      // 'consistently-interactive',
    ]
  }
};

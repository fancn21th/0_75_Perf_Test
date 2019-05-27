"use strict";
// refer to more config at https://github.com/GoogleChrome/lighthouse/tree/v4.3.1/lighthouse-core/config
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

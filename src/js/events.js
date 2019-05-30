window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "UA-80975232-1");
function sendEvent(operator, category, label) {
  gtag("event", operator, {
    event_category: category,
    event_label: label
  });
}

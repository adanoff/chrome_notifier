// rule to match a google play music url
var gplay_music_rule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {
        hostContains: 'play.google.com',
        pathContains: 'music',
        schemes: ['http', 'https']
      }
    })
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

// on install/upgrade
chrome.runtime.onInstalled.addListener(function() {

  // remove all rules and add gplay rule
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([gplay_music_rule]);
  });

});

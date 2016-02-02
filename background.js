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

// re-inject content script
chrome.runtime.onInstalled.addListener(startupInject);
function startupInject() {

  chrome.tabs.query({url: "*://play.google.com/music/*"},
    function (tabs) {

      for (var i in tabs) {
        chrome.tabs.executeScript(tabs[i].id, {file: "observer.js"});
      }

    });

}

// listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log(sender.tab);
  sendResponse('10-4: ' + sender.tab.id);
});

var previous = "";

// TODO grab the image url
var observer = new window.MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      var target = mutation.target;
      // notify(mutation.target);
      if (target.matches('#playerSongInfo')) {
        var titleEl = target.querySelector('#currently-playing-title');
        var detailsEl = target.querySelector('.currently-playing-details');
        var imgEl = target.querySelector('#playerBarArt');
        var img = imgEl.src;
        var title = titleEl.innerText;
        var artist = detailsEl.querySelector('.player-artist').innerText;
        var album = detailsEl.querySelector('.player-album').innerText;
        // console.log(target);
        if (previous != title) {
          // console.log(title + ' - ' + artist + ' - ' + album + ' - ' + img);
          notify(title, artist, album, img);
        }
        previous = title;
      }
    });

});

var config = {childList: true, subtree: true};
observer.observe(window.document, config);

// notify extension of DOM change
function notify(title, artist, album, src) {
  try {

    chrome.runtime.sendMessage({
      'title': title,
      'artist': artist,
      'album': album,
      'src': src
    }, function(response) {
      console.log('response received: ' + response);
    });

  } catch(e) { // happens if parent is no longer available
    console.warn('could not communicate with parent extension, deregistering observer');
    observer.disconnect();
  }
}

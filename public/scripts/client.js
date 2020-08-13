/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escapeTweetText =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(object) {
  let timestamp = `${object.created_at}`;
  let relativeDate = moment.unix(timestamp / 1000).fromNow();
  let $tweet = `
    <article class="tweet">
      <header>
        <div class="profile">
          <img src="${object.user.avatars}"/>
          <h7>${object.user.name}<h7>
        </div>
        <div class="username">
          <h7>${object.user.handle}</h7>
        </div>
      </header>
      <p>${escapeTweetText(object.content.text)}</p>
      <footer>
        <div>${relativeDate}</div>
        <div class="social-actions">
          <img src="images/flag.png">
          <img src="images/retweet.png">
          <img src="images/like.png">
        </div>
      </footer>
  `;
  $('#all-tweets').prepend($tweet);
};

const renderTweets = function(array) {
  for (let tweet of array) {
    createTweetElement(tweet);
  }
};

const loadTweets = function() {
  $.ajax({ url: '/tweets', method: 'GET' })
    .then(function(response) {
      renderTweets(response);
    });
};

$(document).ready(function() {
  $('#new-tweet').on('submit', function(event) {
    event.preventDefault();
    if (this.text.value.length > 0 && this.text.value.length <= 140) {
      let tweet = $(this).serialize();
      let postURL = $(this).attr("action");
      $.ajax({ url: postURL , method: 'POST', data: tweet })
        .then(function() {
          $('#tweet-text').val('');
          loadTweets();
        });
    } else if (!this.text.value.length) {
      alert("Uh oh, looks like your tweet is empty!");
    } else if (this.text.value.length > 140) {
      alert("Uh oh, looks like your tweet is too long!");
    }
  });
  
  loadTweets();

});
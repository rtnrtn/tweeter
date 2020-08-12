/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
      <p>${object.content.text}</p>
      <footer>
        <div>${relativeDate}</div>
        <div class="social-actions">
          <img src="images/flag.png">
          <img src="images/retweet.png">
          <img src="images/like.png">
        </div>
      </footer>
  `;
  $('#all-tweets').append($tweet);
};

const renderTweets = function(array) {
  for (let tweet of array) {
    createTweetElement(tweet);
  }
};

// $(document).ready(function() {
//   renderTweets(tweetData);
// });

$(document).ready(function() {
  $('#new-tweet').on('submit', function(event) {
    let tweet = $(this).serialize();
    let postURL = $(this).attr("action");
    event.preventDefault();
    $.ajax({ url: postURL , method: 'POST', data: tweet })
      .then(function(response) {
        renderTweets(response);
      });
  });
});
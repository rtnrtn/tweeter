/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

const loadTweets = function() {
  $.ajax({ url: '/tweets', method: 'GET' })
    .then(function(response) {
      console.log(response);
      renderTweets(response);
    });
};

$(document).ready(function() {
  $('#new-tweet').on('submit', function(event) {
    let tweet = $(this).serialize();
    let postURL = $(this).attr("action");
    event.preventDefault();
    $.ajax({ url: postURL , method: 'POST', data: tweet });
      
  });

  loadTweets();

});
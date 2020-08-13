/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* Function to prevent XSS with escaping */
const escapeTweetText =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/* Function to create each tweet submitted and embed into HTML */
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

/* Function that takes and array of tweets and push them to the createTweetElement function */
const renderTweets = function(array) {
  for (let tweet of array) {
    createTweetElement(tweet);
  }
};

/* Function that GETs all tweets to pass to the renderTweets function */
const loadTweets = function() {
  $.ajax({ url: '/tweets', method: 'GET' })
    .then(function(response) {
      renderTweets(response);
    });
};

/*
** When document is ready, the below will:
** 1) hide the error section,
** 2) on submitting a new tweet, will:
**    a) prevent page refresh
**    b) validate tweet is within character limit and either:
**      i) extract all information needed to post the tweet, or
**      ii) show an appropriate error message
*/
$(document).ready(function() {
  $('#error').hide();
  $('#new-tweet').on('submit', function(event) {
    event.preventDefault();
    $('#error').hide();
    if (this.text.value.length > 0 && this.text.value.length <= 140) {
      let tweet = $(this).serialize();
      let postURL = $(this).attr("action");
      $.ajax({ url: postURL , method: 'POST', data: tweet })
        .then(function() {
          $('#tweet-text').val('');
          loadTweets();
        });
    } else if (!this.text.value.length) {
      $('#error').html("Uh oh, your tweet is empty!").slideDown("slow");
    } else if (this.text.value.length > 140) {
      $('#error').html("Uh oh, your tweet is too long!").slideDown("slow");
    }
  });

  /* The below will enable the 'Write a new tweet' button in the nav to act as a toggle: if the textarea is already visible, clicking the button will scroll down to the top of the tweet feed, otherwise it will scroll to and select the textarea. */
  $('#compose-tweet').on('click', function(event) {
    if ($(window).scrollTop() < 200) {
      $('html, body').animate({
        scrollTop: $('#all-tweets').offset().top - $('nav').outerHeight()
      }, 1000);
    } else {
      $('html, body').animate({
        scrollTop: $('#compose').offset().top
      }, 1000);
      $('#tweet-text').focus();
      return false;
    }
  });

  /* The below loads 'previously posted' in-memory database of tweets. */
  loadTweets();

});
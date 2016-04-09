
// NOOOO don't do thaaat!!
var ids = {
  facebook: {
    clientID: '228697120802438',
    clientSecret: 'ec8adaf8fbce30425a416614d78d804b',
    callbackURL: 'http://localhost:2000/auth/facebook/callback'
  }
};


// INSTEAD do something like the following, by saving your client and secret keys as
// environment variables. 

// var ids = {
// 	facebook : {
// 	    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
// 	    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
// 	    FACEBOOK_CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL
// 	}
// }


module.exports = ids;


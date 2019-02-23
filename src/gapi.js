import $script from 'scriptjs';
window._listener = new window.EventTarget();
let gapi;

$script('https://apis.google.com/js/api.js', function () {
  gapi = window.gapi;
  gapi.load('client:auth2', initClient);
});

const signIn = new window.Event('signIn');
const logOut = new window.Event('logOut');

function initClient () {
  gapi.client.init({
    apiKey: 'AIzaSyDQ7Liy12Wd0n4YJFzDj04juIj4svZ2kKk',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    clientId: '834821477690-tg64qrbotugtaimm6gae2b8rtfv6cc1o.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events'
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function updateSigninStatus (isSignedIn) {
  // When signin status changes, this function is called.
  // If the signin status is changed to signedIn, we make an API call.

  if (isSignedIn) {
    window._listener.dispatchEvent(signIn);
  } else window._listener.dispatchEvent(logOut);
}

export const handleSignInClick = e => gapi.auth2.getAuthInstance().signIn();

export const handleSignOutClick = e => {
  gapi.auth2.getAuthInstance().signOut();
  window._listener.dispatchEvent(logOut);
};

export const on = (type, cb) => window._listener.addEventListener(type, e => {
  if (typeof cb === 'function') cb();
});

export const getCalendars = () => gapi.client.calendar.calendarList.list();

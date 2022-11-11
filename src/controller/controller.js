const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  "233170142779-2m5tmauh7v9oc5n2ur1n11qa3id1jrba.apps.googleusercontent.com",
  "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",
  "https://localhost:3000/rest/v1/calendar/redirect"
);
const authorizationUrl = oauth2Client.generateAuthUrl({
  scope: "https://www.googleapis.com/auth/calendar.readonly",
  include_granted_scopes: true,
});

const GoogleCalendarInitView = async function (req, res) {
  return res.status(302).redirect(authorizationUrl);
};

module.exports = { GoogleCalendarInitView };

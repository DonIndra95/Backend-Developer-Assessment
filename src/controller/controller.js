const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  "233170142779-2m5tmauh7v9oc5n2ur1n11qa3id1jrba.apps.googleusercontent.com",
  "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",
  "https://87f7-2405-201-800b-e04d-8644-620c-eddb-131e.in.ngrok.io/rest/v1/calendar/redirect"
);
const authorizationUrl = oauth2Client.generateAuthUrl({
  scope: "https://www.googleapis.com/auth/calendar.readonly",
  include_granted_scopes: true,
});
console.log(authorizationUrl);
const GoogleCalendarInitView = async function (req, res) {
  return res.status(302).redirect(authorizationUrl);
};

const GoogleCalendarRedirectView = async function (req, res) {
  try {
    const code = req.query.code;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const result = await calendar.events.list({
      calendarId: "primary",
      singleEvents: true,
      orderBy: "startTime",
    });
    const eventsArray = result.data.items;
    if (!eventsArray || eventsArray.length == 0)
      return res.send({ status: false, message: "No events found" });

    const eventLists = [];

    eventsArray.map((event) => {
      const start = event.start.dateTime || event.start.date;
      eventLists.push({ startTime: start, eventSummary: event.summary });
    });

    res.status(200).send({ status: true, data: eventLists });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { GoogleCalendarInitView, GoogleCalendarRedirectView };

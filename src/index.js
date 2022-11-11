const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const mongoose = require("mongoose");
const tokenModel = require("./models/tokenModel");

mongoose
  .connect(
    "mongodb+srv://IndrashishRoy:windows10@radon-cohort-cluster.gtmdsvp.mongodb.net/Calender-Token-DB?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

// Reads previously authorized credentials from MongoDb.

async function loadSavedCredentialsIfExist() {
  try {
    const credentials = await tokenModel
      .findOne()
      .select({
        _id: 0,
        type: 1,
        refresh_token: 1,
        client_id: 1,
        client_secret: 1,
      });

    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

//Storing credentials in MongoDb server.

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = {
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  };
  await tokenModel.create(payload);
}

// Load or request or authorization to call APIs.
async function GoogleCalendarInitView() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  //console.log(client.credentials);
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

//Lists the events on the user's primary calendar.

async function GoogleCalendarRedirectView(auth) {
  console.log(auth)
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.events.list({
    calendarId: "primary",
    singleEvents: true,
    orderBy: "startTime",
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log("No upcoming events found.");
    return;
  }
  console.log("All events:");
  events.map((event) => {
    const start = event.start.dateTime || event.start.date;
    console.log(`${start} - ${event.summary}`);
  });
}

GoogleCalendarInitView().then(GoogleCalendarRedirectView).catch(console.error);

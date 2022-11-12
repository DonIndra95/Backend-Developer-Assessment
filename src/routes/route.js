const express = require("express");
const {
  GoogleCalendarInitView,
  GoogleCalendarRedirectView,
} = require("../controller/controller");
const router = express.Router();

router.get("/rest/v1/calendar/init", GoogleCalendarInitView);
router.get("/rest/v1/calendar/redirect", GoogleCalendarRedirectView);

module.exports = router;

const express=require("express")
const { GoogleCalendarInitView } = require("../controller/controller")
const router=express.Router()

router.get("/rest/v1/calendar/init",GoogleCalendarInitView)

module.exports=router
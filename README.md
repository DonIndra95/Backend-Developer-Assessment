# Backend-Developer-Assessment
Backend Developer Assessment

Problem: In this assignment you have to implement google calendar integration using rest api. You need to use the OAuth2 mechanism to get users calendar access. Below are detail of API endpoint and corresponding views which you need to implement - 
/rest/v1/calendar/init/ - GoogleCalendarInitView()
This view should start step 1 of the OAuth. Which will prompt the user for his/her credentials.
/rest/v1/calendar/redirect/ -> GoogleCalendarRedirectView() 
This view will do two things - 
i) Handle redirect requests sent by google with code for token. You need to implement a mechanism to get access_token from given code.
ii) Once you get the access_token get a list of events in the user's calendar.

You need to write the code in NodeJs. Please try not to use any existing third-party library other then google’s provided standard libraries unless and until very necessary to use.

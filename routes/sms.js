const express = require('express');
const router = express.Router();

/* Import MessageMedia's messaging API SDK */
const lib = require('messagemedia-messages-sdk');

/**
 * sendMessage
 * <hr/>
 * <p>Send SMS phone number and message to MessageMedia API</p>
 * @param phone
 * @param content
 * @param res
 */
const sendMessage = (phone, content, res) => {

  /* Use Basic Auth to double check after ingress passing security */
  lib.Configuration.basicAuthUserName = "PBfztK4GMKHNOPlXP9HN";
  lib.Configuration.basicAuthPassword = "2AMVJHgRyXlog5EBlHTdkzOopHgLvC";

  /* Set up the messages controller */
  let controller = lib.MessagesController;

  /* Create the message body to contain the message(s) below */
  let body = new lib.SendMessagesRequest();

  body.messages = [];

  /* Create the message */
  body.messages[0] = new lib.Message();

  /* Set the message content */
  body.messages[0].content = content;

  /* Set the phone number */
  body.messages[0].destinationNumber = phone;

  /* Have the controller call the message API */
  controller.sendMessages(body, function(error, response, context) {
    if (error) {
      console.log(error);
      res.json({"result" : "Fail", "reason" : error});
    } else {
      console.log(response);
      res.json({"result" : "Success", "reason" : "Message sent"});
    }
  });
}

/* Post the message request to the MessageMedia API */
router.post('/', (req, res, next) => {
  res.set('Content-Type', 'application/json');
  sendMessage(req.body.phone, req.body.content, res);
  // res.json(x);
});

/* Export this router */
module.exports = router;

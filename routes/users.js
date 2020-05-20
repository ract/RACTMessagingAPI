const express = require('express');
const router = express.Router();
const lib = require('messagemedia-messages-sdk');

const sendMessage = (phone, content) => {

  /* Basic Auth */
  lib.Configuration.basicAuthUserName = "PBfztK4GMKHNOPlXP9HN";
  lib.Configuration.basicAuthPassword = "2AMVJHgRyXlog5EBlHTdkzOopHgLvC";

  /* HMAC
  lib.Configuration.hmacAuthUserName = "YOUR_HMAC_API_KEY";
  lib.Configuration.hmacAuthPassword = "YOUR_HMAC_SECRET_KEY";
  */

  let controller = lib.MessagesController;

  let body = new lib.SendMessagesRequest();

  body.messages = [];

  body.messages[0] = new lib.Message();

  body.messages[0].content = content;
  body.messages[0].destinationNumber = phone;

  controller.sendMessages(body, function(error, response, context) {
    if (error) {
      console.log(error);
    } else {
      console.log(response);
      return response;
    }
  });
}


/* GET users listing. */
router.post('/', (req, res, next) => {
  res.set('Content-Type', 'application/json');
  res.json(sendMessage(req.body.phone, req.body.content));
});


module.exports = router;

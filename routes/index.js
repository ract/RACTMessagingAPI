const express = require('express');
const router = express.Router();

/* Return a 404 error for the default route */
router.get('/', (req, res, next) => {
  res.status(404).send({"result" : "Fail", "reason":"End point " + req.url + " does not exist"});
});

/* Export the index router */
module.exports = router;

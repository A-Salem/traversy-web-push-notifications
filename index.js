const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const port = 5000;

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey = "BF5ST8CPGUeQyfnkqPVOJdWXxzqSPCvcoSHVxbK016pJLFtA2ENk9agJMlTV-WI4QRxKUaYGWL9Uug9-EflNMZo";
const privateVapidKey = "CcrrtH4WRIKFZYa6vAAiCyrehVUP1L6FMRLW8UnMpb4";

// Define who send Notifications
webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// Define Subscribe Route
app.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json();

  // Create payload
  const payload = JSON.stringify({ title: "Push Test"});

  // Pass object into sendNotification
  webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

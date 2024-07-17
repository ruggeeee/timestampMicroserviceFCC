var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // Some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Route to handle timestamp conversion
app.get('/api/:date?', (req, res) => {
  let dateInput = req.params.date;
  let date;

  // If no date parameter is provided, use current date
  if (!dateInput) {
    date = new Date();
  } else {
    // Check if the dateInput is a number (Unix timestamp)
    if (!isNaN(dateInput)) {
      date = new Date(parseInt(dateInput));
    } else {
      // Handle string date input
      date = new Date(dateInput);
    }
  }

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

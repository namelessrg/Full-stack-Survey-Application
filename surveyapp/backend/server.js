const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let surveyResponses = [];

app.post("/submit-survey", (req, res) => {
  const surveyData = req.body;

  // Check for duplicate survey data
  const isDuplicate = surveyResponses.some(response => {
    return JSON.stringify(response) === JSON.stringify(surveyData);
  });

  if (isDuplicate) {
    return res.status(400).json({
      success: false,
      message: "Duplicate survey submission detected.",
    });
  }

  // Add the survey data to the responses array
  surveyResponses.push(surveyData);

  console.log("Survey Data:", surveyData);

  res.json({
    success: true,
    data: surveyData,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

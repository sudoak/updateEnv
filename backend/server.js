require("dotenv").config({ path: `${__dirname}/P1/.env` });

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const envfile = require("envfile");

const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes

app.get("/getenvironment/:process", (req, res, next) => {
  try {
    const { process } = req.params;
    if (process) {
      const folder_process = dotenv.parse(fs.readFileSync(`./${process}/.env`));

      res.status(200).json({ process: folder_process });
    } else {
      throw new Error("Enter Proper Params");
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      next("Please enter proper process file name");
    }
    next(error);
  }
});

app.get("/setEnvironment/:process/:key/:value", async (req, res, next) => {
  // console.log(process.env);
  try {
    const { process, key, value } = req.params;
    if (process && key && value) {
      const read_process = dotenv.parse(fs.readFileSync(`./${process}/.env`));
      const temp = {
        ...read_process,
        [key]: value
      };
      fs.writeFileSync(`${process}/.env`, envfile.stringifySync(temp));
      var updated_process = dotenv.parse(fs.readFileSync(`./${process}/.env`));
      res.status(201).json({ process: temp });
    } else {
      throw new Error("Enter Proper Params");
    }
  } catch (error) {
    console.log(error, "set");
    if (error.code === "ENOENT") {
      next("Please enter proper process file name");
    }
    next(error);
  }

  // Repopulating process.env

  for (let k in updated_process) {
    process.env[k] = updated_process[k];
  }
});

app.use(errorHandler);

function errorHandler(err, req, res, next) {
  res.status(500);
  res.json({ error: err + "" });
}

app.get("*", (req, res) => res.status(503).json({ error: "Cant find API" }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

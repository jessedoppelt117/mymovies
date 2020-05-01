const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

function getRows(server) {
  let content = {
    installed: {
      client_id: process.env.GCLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_secret: process.env.GCLIENT_SECRET,
      redirect_uris: ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
    }
  };
  authorize(content, callAPI, server);
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, server) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  token = {
    access_token: process.env.GACCESS_TOKEN,
    refresh_token: process.env.GREFRESH_TOKEN,
    token_type: "Bearer",
    expiry_date: 1587615020531
  };

  oAuth2Client.setCredentials(token);
  callback(oAuth2Client, server);
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          "Error while trying to retrieve access token",
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function callAPI(auth, server) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: "13_iX2eKjEXO2KqDYPws7p_Ohls-aYRq7Ncn0BjxIZNE",
      range: "Sheet1!A1:Z"
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const rows = res.data.values;
      if (rows.length) {
        server.json(generateResponse(rows));
      } else {
        console.log("No data found.");
      }
    }
  );
}

function generateResponse(rows) {
  if (rows.length) {
    var mainColumns = {};
    var extraColumns = {};
    var columns = [];
    var data = [];
    var extraData = [];
    for (var i = 0; i < rows[0].length; i++) {
      if (!rows[0][i].includes("(extra)")) {
        let accessor = rows[0][i].replace(" ", "").toLowerCase();
        mainColumns[i] = accessor;
        columns.push({
          Header: rows[0][i],
          accessor: accessor
        });
      } else {
        let s = rows[0][i].replace("(extra)", "");
        let parts = s.split("-");
        extraColumns[i] = { name: parts[0], type: parts[1] };
      }
    }

    for (var r = 1; r < rows.length; r++) {
      var obj = {};
      var extra = [];
      for (var c = 0; c < rows[r].length; c++) {
        if (mainColumns.hasOwnProperty(c)) {
          obj[mainColumns[c]] = rows[r][c];
        } else {
          let extraEl = JSON.parse(JSON.stringify(extraColumns[c]));
          extraEl["data"] = rows[r][c];
          extra.push(extraEl);
        }
      }
      data.push(obj);
      extraData.push(extra);
    }
    return { columns: columns, data: data, extraData: extraData };
  } else {
    return { columns: [] };
  }
}

module.exports = getRows;

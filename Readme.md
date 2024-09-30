# Suvam's Image Subscription App

## Overview

The **Image Subscription App** allows users to submit their email addresses to subscribe for updates. Submitted email addresses are automatically stored in a Google Sheet for easy management. This app utilizes HTML, CSS, JavaScript, and Google Apps Script.

## Features

- **Email Subscription**: Users can enter their email addresses to subscribe.
- **Google Sheets Integration**: Automatically stores submitted email addresses in a Google Sheet.
- **Real-time Feedback**: Provides users with a confirmation message upon successful submission.
- **Responsive Design**: Designed to be visually appealing and responsive across various devices.


## Technologies Used

- HTML
- CSS
- JavaScript


# License
This project is licensed under the MIT License.

# SUVAM MOHAPATRA #


## Setup Instructions

### 1. Create a New Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and start a new spreadsheet with the Blank template.
2. Rename the spreadsheet to `Email Subscribers` (or any name you prefer).
3. In the first row, add the following headers:


### 2. Create a Google Apps Script

1. Click on `Extensions` > `Apps Script` in your Google Sheet.
2. Rename the project to `Submit Form to Google Sheets`.
3. Delete the existing code in the `Code.gs` tab and replace it with the following script:
```javascript
var sheetName = 'Sheet1';
var scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```
* Save the script by selecting File > Save.

# 3. Run the Setup Function
Go to Run > Run Function > intialSetup.
Authorize the script by signing in with your Google account and clicking Allow.

# 4. Add a New Project Trigger
Click on Triggers (the clock icon) in the left sidebar.
Click + Add Trigger.
Set the function to doPost, the deployment to Head, and the event type to From spreadsheet > On form submit.
Click Save.

# 5. Publish the Project as a Web App
Click on Deploy > Test deployments > Manage deployments.
Click New deployment and choose Web app.
Set the project version to New, set Execute the app as to Me, and Who has access to Anyone.
Click Deploy and copy the Current web app URL.


# 6. Input Your Web App URL
Open index.html.
Replace <SCRIPT URL> in the scriptURL variable with your web app UR

```JavaScript
<script>
  const scriptURL = '<SCRIPT URL>';
  const form = document.forms['submit-to-google-sheet'];

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message));
  });
</script>
```

# 7. Adding Additional Form Data
To capture more data, add new input fields in your HTML form and create corresponding columns in your Google Sheet with matching names:

```JavaScript
<form name="submit-to-google-sheet">
  <input name="email" type="email" placeholder="Email" required>
  <input name="firstName" type="text" placeholder="First Name">
  <input name="lastName" type="text" placeholder="Last Name">
  <button type="submit">Send</button>
</form>
```

* In your Google Sheet, add new headers:
A1: timestamp
B1: email
C1: firstName
D1: lastName


# 8. Related Polyfills
Some features might not be fully supported by all browsers. Use these polyfills for better compatibility:

```
<script src="https://wzrd.in/standalone/formdata-polyfill"></script>
<script src="https://wzrd.in/standalone/promise-polyfill@latest"></script>
<script src="https://wzrd.in/standalone/whatwg-fetch@latest"></script>
```


# Feedback and Contributions
Have feedback, requests, or issues? Please create a new issue or pull request. For discussions, contact me before making substantial changes.

# Related Articles
Google Spreadsheets as a Database – INSERT with Apps Script form POST/GET submit method
Step by Step Setup to Send Form Data to Google Sheets
Google Sheet Form Post
How to Submit an HTML Form to Google Sheets…without Google Forms
Send Email from a Static HTML Form using Google Apps Mail!

# Documentation
Google Apps Script
Fetch API
FormData
HTML <form> Element
Document.forms
Sending Forms Through JavaScript



### SUVAM MOHAPATRA ###


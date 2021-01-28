const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
const {v4: uuid} = require('uuid');
// const LRU = require('lru-cache');

// https://docs.aws.amazon.com/chime/latest/dg/meetings-sdk.html#mtg-limits
// max 250 meetings
// https://docs.aws.amazon.com/chime/latest/dg/mtgs-sdk-mtgs.html
// https://docs.aws.amazon.com/chime/latest/dg/key-concepts.html
// https://docs.aws.amazon.com/chime/latest/dg/service-architecture.html

// const meetings = new LRU(1000);
let meeting = null;
let meetingCounter = 0;

const app = express();
app.use(cors());

const port = 3333;
const activeSessions = [];
const creds = new AWS.Credentials('key', 'secret');
AWS.config.credentials = creds;

AWS.config.apiVersions = {
  chime: '2018-05-01'
  // other service API versions
};

const chime = new AWS.Chime({region: 'us-east-1'});
chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');

// helpers
async function isActiveMeeting(meeting) {
  let info = null;
  try {
    info = await chime.getMeeting({
      MeetingId: meeting.Meeting.MeetingId
    }).promise();
  } catch (e) {
    console.error(e);
  }
  return !(!info || !info.Meeting || !info.Meeting.MeetingId);
}

async function getMeeting() {
  if (activeSessions.length) {
    // @todo sprawdzić czy nie wygasła
    return activeSessions.pop();
  }
  if (meeting) {
    const isActive = await isActiveMeeting(meeting);
    console.log('==isActive==', isActive);
    if (!isActive) {
      meeting = null;
      meetingCounter = 0;
    }
  }
  if (null === meeting) {
    meeting = await chime.createMeeting({
      ClientRequestToken: uuid(),
      MediaRegion: 'eu-central-1'
    }).promise();
  }
  // activeSessions.push(meeting);
  // meetings.set(meeting.Meeting.MeetingId, meeting);
  return meeting;
}

async function createAttendee(meeting) {
  console.log('==createAttendee==', meeting.Meeting.MeetingId);
  return chime.createAttendee({
    MeetingId: meeting.Meeting.MeetingId,
    ExternalUserId: uuid()
  }).promise();
}

// join
app.get('/join', async (req, res) => {
  const meeting = await getMeeting();
  const attendee = await createAttendee(meeting);
  ++meetingCounter;
  res.send(JSON.stringify({
    meeting,
    attendee
  }));
});

// reset
app.get('/reset', async (req, res) => {
  meeting = null;
  meetingCounter = 0;
  res.send('OK');
});

// close
app.get('/close/:meetingId', async (req, res) => {
  // const meeting = meetings.get(req.params.meetingId);
  // if (meeting) {
  //   activeSessions.push(meeting);
  // }
  if (meetingCounter > 0) {
    --meetingCounter;
  }
  res.send('OK');
});

// open-session
app.get('/open-meetings', (req, res) => {
  res.send(String(meetingCounter));
});

app.listen(port, () => {
  console.log(`API Server listening at http://localhost:${port}`);
});

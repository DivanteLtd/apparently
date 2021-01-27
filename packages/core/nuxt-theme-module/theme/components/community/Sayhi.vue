<template>
<div id="sauhi">
    <video id="video" style="width:100px;height:100px;background:#ddd;"></video>
    <SfSection title-heading="Say Hi to Joanna" class="title">
        <p>Friendly hint:</p>
        <p>Both of you viewed “cozy red t-shirt"</p>
    </SfSection>
    <SfButton class="color-primary" @click="join">
      Join chat
    </SfButton>
    <SfButton class="color-primary" @click="end">
      Cancel chat
    </SfButton>
</div>
</template>
<script>
import {
  SfSection,
  SfLink,
  SfBanner,
  SfButton
} from '@storefront-ui/vue';

import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration
} from 'amazon-chime-sdk-js';

export default {
  name: 'Connecting',
  components: {
    SfSection,
    SfButton
  },
  data() {
    return {
      meetingId: null,
      meetingSession: null
    };
  },
  created: async function() {
    const {meeting, attendee} = JSON.parse(localStorage.getItem("chime"))
    this.meetingId = meeting.Meeting.MeetingId;
                    const logger = new ConsoleLogger('ChimeMeetingLogs', LogLevel.INFO);
                    const deviceController = new DefaultDeviceController(logger);
                    const configuration = new MeetingSessionConfiguration(meeting, attendee);
                    this.meetingSession = new DefaultMeetingSession(configuration, logger, deviceController);
                    const videoElement = document.getElementById('video');
                    const tokenElement = document.getElementById('token');
                    const observer = {
                        audioVideoDidStart: () => {
                            this.meetingSession.audioVideo.startLocalVideoTile();
                        },
                        videoTileDidUpdate: tileState => {
                            this.meetingSession.audioVideo.bindVideoElement(tileState.tileId, videoElement);
                        }
                    }
                    this.meetingSession.audioVideo.addObserver(observer);
                    const videoInputDevices = await this.meetingSession.audioVideo.listVideoInputDevices();
                    const firstVideoDeviceId = videoInputDevices[0].deviceId;
                    await this.meetingSession.audioVideo.chooseVideoInputDevice(firstVideoDeviceId);
                    this.meetingSession.audioVideo.start();
                    tokenElement.innerText = this.meetingId;
  },
  methods: {
    end() {
            console.log("==meetingId==", this.meetingId);
            if (this.meetingSession) {
                this.meetingSession.audioVideo.stop();
                fetch(`https://93b312e824f8.ngrok.io/close/${this.meetingId}`)
                    .then(
                      () => {
                        console.log("==meetingId end==", this.meetingId);
                        }
                    );
            }
            this.$emit('step', 'Thankyou')            
    },
    join() {
            fetch('https://93b312e824f8.ngrok.io/join')
                .then(response => response.json())
                .then(async ({meeting, attendee}) => {
                    this.meetingId = meeting.Meeting.MeetingId;
                    const logger = new ConsoleLogger('ChimeMeetingLogs', LogLevel.INFO);
                    const deviceController = new DefaultDeviceController(logger);
                    const configuration = new MeetingSessionConfiguration(meeting, attendee);
                    this.meetingSession = new DefaultMeetingSession(configuration, logger, deviceController);
                    const videoElement = document.getElementById('video');
                    const tokenElement = document.getElementById('token');
                    const observer = {
                        audioVideoDidStart: () => {
                            this.meetingSession.audioVideo.startLocalVideoTile();
                        },
                        videoTileDidUpdate: tileState => {
                            this.meetingSession.audioVideo.bindVideoElement(tileState.tileId, videoElement);
                        }
                    }
                    this.meetingSession.audioVideo.addObserver(observer);
                    const videoInputDevices = await this.meetingSession.audioVideo.listVideoInputDevices();
                    const firstVideoDeviceId = videoInputDevices[0].deviceId;
                    await this.meetingSession.audioVideo.chooseVideoInputDevice(firstVideoDeviceId);
                    this.meetingSession.audioVideo.start();
                    tokenElement.innerText = this.meetingId;
                });
        },
    stepForward() {
      this.$emit('step', 'Sayhi')
    }
  }
};
</script>
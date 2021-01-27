<template>
<div id="form">
  <button @click="join">JOIN</button>
  <video id="video" style="width:100px;height:100px;background:#ddd;"></video>
  <button @click="end">[ X ]</button>
  <div id="token"></div>
    <!-- <SfBanner image="/community/connecting.png" />
    <SfSection title-heading="Connecting audio with others..." class="title">
        <p>Continue using website as normally, we will</p>
        <p>connect you with other customer shortly.</p>
    </SfSection>
    <SfLink @click="end">
       Cancel chat
    </SfLink> -->
</div>
</template>
<script>
import {
  SfSection,
  SfLink,
  SfBanner
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
    SfLink,
    SfBanner
  },
  data() {
    return {
      meetingId: null,
      meetingSession: null
    };
  },
  methods: {
    end() {
            console.log("==meetingId==", this.meetingId);
            if (this.meetingSession) {
                this.meetingSession.audioVideo.stop();
                const tokenElement = document.getElementById('token');
                tokenElement.innerText = "";
                fetch(`https://4eb0445eaae3.ngrok.io/close/${this.meetingId}`)
                    .then(console.log);
            }
    },
    join() {
            fetch('https://4eb0445eaae3.ngrok.io/join')
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

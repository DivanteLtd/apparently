<template>
<div id="sayhi">
    <video id="video"></video>
    <audio id="audio"></audio>
    <SfSection title-heading="Say Hi to Joanna" class="title">
        <p>Friendly hint:</p>
        <p>Both of you viewed “cozy red t-shirt"</p>
    </SfSection>
    <SfButton class="color-primary" @click="end">
      Cancel chat
    </SfButton>
</div>
</template>
<script>
import {
  SfSection,
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
  mounted: async function() {
    const {meeting, attendee} = JSON.parse(localStorage.getItem("chime"))
    this.meetingId = meeting.Meeting.MeetingId;
    const logger = new ConsoleLogger('ChimeMeetingLogs', LogLevel.INFO);
    const deviceController = new DefaultDeviceController(logger);
    const configuration = new MeetingSessionConfiguration(meeting, attendee);
    this.meetingSession = new DefaultMeetingSession(configuration, logger, deviceController);
    const videoElement = document.getElementById('video');
    const observer = {
        audioVideoDidStart: () => {
            this.meetingSession.audioVideo.startLocalVideoTile();
        },
        videoTileDidUpdate: tileState => {
          if (!tileState.boundAttendeeId || tileState.localTile || tileState.isContent) {
            return;
          }
          this.meetingSession.audioVideo.bindVideoElement(tileState.tileId, videoElement);
        }
    }
    const audioElement = document.getElementById('audio');
    const audioInputDevices = await this.meetingSession.audioVideo.listAudioInputDevices();
    const audioOutputDevices = await this.meetingSession.audioVideo.listAudioOutputDevices();
    const firstAudioInputDevice = audioInputDevices[0];
    const firstAudioOutputDevice = audioOutputDevices[0];
    await this.meetingSession.audioVideo.chooseAudioInputDevice(firstAudioInputDevice.deviceId);
    await this.meetingSession.audioVideo.chooseAudioOutputDevice(
        firstAudioOutputDevice.deviceId
    );
    await this.meetingSession.audioVideo.bindAudioElement(audioElement);
    // const unmuted = this.meetingSession.audioVideo.realtimeUnmuteLocalAudio();
    // if (unmuted) {
    //   console.log('Other attendees can hear your audio');
    // } else {
    //   // See the realtimeSetCanUnmuteLocalAudio use case below.
    //   console.log('You cannot unmute yourself');
    // }
    this.meetingSession.audioVideo.addObserver(observer);
    const videoInputDevices = await this.meetingSession.audioVideo.listVideoInputDevices();
    const firstVideoDeviceId = videoInputDevices[0].deviceId;
    await this.meetingSession.audioVideo.chooseVideoInputDevice(firstVideoDeviceId);
    this.meetingSession.audioVideo.start();
  },
  methods: {
    end() {
            console.log("==meetingId==", this.meetingId);
            if (this.meetingSession) {
                this.meetingSession.audioVideo.stop();
                fetch(`https://api.cherryontop.2b2b.pl/close/${this.meetingId}`)
                    .then(
                      () => {
                        console.log("==meetingId end==", this.meetingId);
                        }
                    );
            }
            localStorage.setItem("chime", null)
            this.$emit('step', 'Thankyou')
    },
    join() {
            fetch('https://api.cherryontop.2b2b.pl/join')
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
                    const audioElement = document.getElementById('audio');
                    const audioInputDevices = await this.meetingSession.audioVideo.listAudioInputDevices();
                    const audioOutputDevices = await this.meetingSession.audioVideo.listAudioOutputDevices();
                    const firstAudioInputDevice = audioInputDevices[0];
                    const firstAudioOutputDevice = audioOutputDevices[0];
                    await this.meetingSession.audioVideo.chooseAudioInputDevice(firstAudioInputDevice.deviceId);
                    await this.meetingSession.audioVideo.chooseAudioOutputDevice(
                        firstAudioOutputDevice.deviceId
                    );
                    await this.meetingSession.audioVideo.bindAudioElement(audioElement);
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
<style lang="scss">
  #sayhi {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
  }
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .sf-section {
    --section-margin: var(--spacer-xl) 0;
    --section-content-margin: var(--spacer-base);
  }

  .sf-button {
    margin: var(--spacer-xs) 0;
  }

  #video {
    border-radius: 2rem;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048),
      0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.012),
      0 41.8px 33.4px rgba(0, 0, 0, 0.016),
      0 30px 80px rgba(0, 0, 0, 0.12)
      ;
    background: var(--c-gray-variant);
    width: 47rem;
    height: 30rem;
  }
</style>

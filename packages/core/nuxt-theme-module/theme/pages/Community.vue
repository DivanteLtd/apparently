<template>
  <div id="community">
      <component @step="stepForward" v-bind:is="component" />
  </div>
</template>
<script>
import Join from '~/components/community/Join.vue'
import Form from '~/components/community/Form.vue'
import Connecting from '~/components/community/Connecting.vue'
import Sayhi from '~/components/community/Sayhi.vue'
import Thankyou from '~/components/community/Thankyou.vue'
import Joinanother from '~/components/community/Joinanother.vue'

import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration
} from 'amazon-chime-sdk-js';


export default {
  name: 'Community',
  components: {
    Join,
    Form,
    Connecting,
    Sayhi,
    Thankyou,
    Joinanother
  },
  data() {
    return {
      component: "Join"
    };
  },
  created: function() {
      fetch(`https://api.cherryontop.2b2b.pl/open-meetings`)
          .then(response => response.text())
          .then((response) => {
            console.log(response)
            if (response > 0) {
              console.log("IN")
              fetch('https://api.cherryontop.2b2b.pl/join')
                .then(response => response.json())
                .then(async ({meeting, attendee}) => {
                  localStorage.setItem('chime', JSON.stringify({meeting, attendee}));
                });
              this.component = 'Joinanother'
            }
          });

    },
  methods: {
    stepForward(stepName) {
      this.component = stepName;
    }
  }
};
</script>

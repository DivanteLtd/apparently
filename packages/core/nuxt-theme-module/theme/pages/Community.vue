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
      fetch(`https://93b312e824f8.ngrok.io/open-meetings`)
          .then(response => response.text())
          .then((response) => {
            console.log(response)
            if (response > 0) {
              console.log("IN")
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
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

export default {
  name: 'Community',
  components: {
    Join,
    Form,
    Connecting,
    Sayhi
  },
  data() {
    return {
      component: "Join"
    };
  },
  methods: {
    stepForward(stepName) {
      this.component = stepName;
    }
  }
};
</script>
<template>
<div id="join">
    <SfBanner image="/community/joinanother.png" />
    <SfSection title-heading="Joanna invites you to chat" class="title">
        <p>Invitation lasts for <strong>15</strong> more seconds</p>
    </SfSection>
    <SfButton class="color-primary" @click="stepForward">
      Join chat
    </SfButton>
    <SfButton class="color-primary" @click="stepForward">
      Cancel chat
    </SfButton>
</div>
</template>
<script>

import {
  SfBanner,
  SfSection,
  SfButton
} from '@storefront-ui/vue';

export default {
  name: 'Joinanother',
  components: {
    SfBanner,
    SfSection,
    SfButton,
  },
  data() {
    return {
      
    };
  },
  methods: {
    stepForward() {
      this.$emit('step', 'Form')
    }
  }
};
</script>
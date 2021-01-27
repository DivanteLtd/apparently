<template>
<div id="join">
    <SfBanner image="/community/community.png" />
    <SfSection title-heading="Other moms are here to help" class="title">
        <p>Connect and chat with other people to talk about</p>
        <p>your experience of motherhood, baby-care routine,</p>
        <p>and becoming a super-mom!</p>
    </SfSection>
    <SfButton class="color-primary" @click="stepForward">
      Join chat
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
  name: 'Join',
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
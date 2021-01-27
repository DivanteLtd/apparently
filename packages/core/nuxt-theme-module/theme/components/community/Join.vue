<template>
<div id="join">
    <SfImage src="/community/community.png" />
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
  SfImage,
  SfSection,
  SfButton
} from '@storefront-ui/vue';

export default {
  name: 'Join',
  components: {
    SfImage,
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
<style lang="scss">
  #join {
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
</style>
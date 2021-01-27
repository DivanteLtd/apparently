<template>
<div id="join">
    <SfImage src="/community/joinanother.png" />
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
  SfImage,
  SfSection,
  SfButton
} from '@storefront-ui/vue';

export default {
  name: 'Joinanother',
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

  .sf-button {
    margin: var(--spacer-xs) 0;
  }
</style>
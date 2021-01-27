<template>
<div id="form">
    <SfSection title-heading="Whats your name?" class="title">
        <p>It’s nice to introduce yourself to a stranger,</p>
        <p>it will help you kickstart a conversation.</p>
    </SfSection>
    <SfInput label="Name" name="name" type="text" valid />
    <SfButton class="color-primary" @click="stepForward">
      Join chat
    </SfButton>
</div>
</template>
<script>


import {
  SfSection,
  SfButton,
  SfInput
} from '@storefront-ui/vue';

export default {
  name: 'Form',
  components: {
    SfSection,
    SfButton,
    SfInput
  },
  data() {
    return {
    };
  },
  methods: {
    stepForward() {
      this.$emit('step', 'Sayhi')
    }
  }
};
</script>

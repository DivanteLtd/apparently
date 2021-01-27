<template>
<div id="form">
    <SfSection title-heading="Thanks for helping others!" class="title">
        <p>We appreciate time and effort you put into helping others,</p>
        <p> thats why we want to give you 20 Canpol Points, collect</p>
        <p>them and get discounts for Canpol products.</p>
    </SfSection>
    <SfButton class="color-primary" @click="stepForward">
      Collect my points
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
  name: 'Sayhi',
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
    end() {
      this.$emit('step', 'Thankyou')
    }
  }
};
</script>

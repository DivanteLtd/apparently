<template>
<div id="thankyou">
  <SfBanner image="/community/thankyou.png" />
  <SfSection title-heading="Thanks for helping others!" class="title">
      <p>We appreciate time and effort you put into helping others,</p>
      <p> thats why we want to give you 20 Canpol Points, collect</p>
      <p>them and get discounts for Canpol products.</p>
  </SfSection>
  <SfButton class="color-primary" @click="collect" disabled>
    Collect my points
  </SfButton>
  <p>Ooops, seems like you’re not logged in.</p>
  <p>Plase 
    <SfLink  target="_blank">
    log in
  </SfLink> or 
  <SfLink  target="_blank">
    register
  </SfLink> 
   to claim your points.</p>
</div>
</template>
<script>


import {
  SfSection,
  SfButton,
  SfInput,
  SfBanner,
  SfLink
} from '@storefront-ui/vue';

export default {
  name: 'Thankyou',
  components: {
    SfSection,
    SfButton,
    SfInput,
    SfBanner,
    SfLink
  },
  data() {
    return {
    };
  },
  methods: {
    end() {
      this.$emit('step', 'Thankyou')
    },
    collect() {}
  }
};
</script>

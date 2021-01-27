<template>
<div id="form">
    <SfBanner image="/community/connecting.png" />
    <SfSection title-heading="Connecting audio with others..." class="title">
        <p>Continue using website as normally, we will</p>
        <p>connect you with other customer shortly.</p>
    </SfSection>
    <SfLink @click="stepForward">
       Cancel chat
    </SfLink>
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
  name: 'Connecting',
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
  created: function() {
    fetch('https://93b312e824f8.ngrok.io/join')
                .then(response => response.json())
                .then(async ({meeting, attendee}) => {
                  localStorage.setItem('chime', JSON.stringify({meeting, attendee}));
                });
    var myVar = setInterval(function(){
      fetch(`https://93b312e824f8.ngrok.io/open-meetings`)
            .then(response => response.text())
            .then((response) => {
              console.log(response)
              if (response > 1) {
                console.log("IN")
                this.$emit('step', 'Sayhi')
              }
            });
    }, 5000);
    // clears the interval
    const myStopFunction = () =>  {
        this.$emit('step', 'Sayhi')
        clearInterval(myVar);
    }
    // cancel after 1 min
    setTimeout(myStopFunction, 1 * 60 * 1000)
    
  },
  methods: {
    stepForward() {
      this.$emit('step', 'Sayhi')
    },
    end() {
      this.$emit('step', 'Thankyou')
    }
  }
};
</script>

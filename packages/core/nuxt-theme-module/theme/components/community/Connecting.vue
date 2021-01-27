<template>
<div id="form">
    <SfImage src="/community/connecting.png" />
    <SfSection title-heading="Connecting audio with others..." class="title">
        <p>Continue using website as normally, we will</p>
        <p>connect you with other customer shortly.</p>
    </SfSection>
    <SfButton @click="stepForward">
       Cancel chat
    </SfButton>
</div>
</template>
<script>


import {
  SfSection,
  SfButton,
  SfInput,
  SfImage
} from '@storefront-ui/vue';

export default {
  name: 'Connecting',
  components: {
    SfSection,
    SfButton,
    SfInput,
    SfImage
  },
  data() {
    return {
    };
  },
  created: async function() {
    // await fetch('https://api.cherryontop.2b2b.pl/join')
    //             .then(response => response.json())
    //             .then(async ({meeting, attendee}) => {
    //               localStorage.setItem('chime', JSON.stringify({meeting, attendee}));
    //             });
    //             console.log("WTF")
    //             this.$emit('step', 'Sayhi')
    // if (!localStorage.getItem("chime")) {
      fetch('https://api.cherryontop.2b2b.pl/join')
                .then(response => response.json())
                .then(async ({meeting, attendee}) => {
                  localStorage.setItem('chime', JSON.stringify({meeting, attendee}));
                });
    // }
    var myVar = setInterval(() => {
      fetch(`https://api.cherryontop.2b2b.pl/open-meetings`)
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
<style lang="scss">
  #form {
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
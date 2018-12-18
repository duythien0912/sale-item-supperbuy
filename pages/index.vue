<template>
  <section>
    <div
      id="google_translate_element"
      class="bg-grey-darkest"
    />
    <div>
      <SaleDailyNew />
    </div>
  </section>
</template>

<script>

import SaleDailyNew from '~/components/SaleDailyNew.vue'

export default {
  components: {
    SaleDailyNew
  },
  head: {
    script: [
      { src: "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit", type: 'text/javascript' },
      { innerHTML: "function googleTranslateElementInit () { new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element'); }", type: 'text/javascript', charset: 'utf-8' }
    ]

  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
#google_translate_element {
  position: fixed;
  bottom: 10vh;
  left: 1vw;
  z-index: 1000;
  /* background-color: black; */
  padding: 10px;
  border-radius: 4px;
}
.goog-logo-link {
  display: none !important;
}
.goog-te-gadget {
  height: 24px !important;
  overflow: hidden;
}
</style>

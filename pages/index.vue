<template>
  <section>
    <div>
      <SaleDailyNew/>
    </div>
  </section>
</template>

<script>
import SaleDailyNew from '~/components/SaleDailyNew.vue'

export default {
  components: {
    SaleDailyNew
  },
  data() {
    return {
      title: 'Trends Product from SupperBuy!'
    }
  },

  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'trends',
          name: 'trends',
          content: 'Trends Product from SupperBuy'
        }
      ]
    }
  }
}
</script>

<style>
.goog-te-combo {
  -webkit-appearance: none;
}
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>

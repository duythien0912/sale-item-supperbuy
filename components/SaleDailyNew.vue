<template>
  <table class="text-left" style="border-collapse:collapse">
    <thead>
      <tr>
        <th
          v-for="(thColumnItem, index) in thColumn"
          :key="`thColumnItem.id-${index}`"
          class="py-2 px-4 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light"
        >{{ thColumnItem.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(resSDNItem, index) in resSDN"
        :key="`resSDNItem-${index}`"
        class="hover:bg-blue-lightest"
      >
        <td
          v-for="(resSDNItemItem, index) in resSDNItem"
          :key="`resSDNItemItem-${index}`"
          class="py-2 px-4 border-b border-grey-light max-w-xs"
        >
          <div v-if="checkImageLink(resSDNItemItem)">
            <img :src="resSDNItemItem">
          </div>
          <div v-else-if="checkLink(resSDNItemItem)">
            <a :href="resSDNItemItem" :target="'_black'">{{ resSDNItemItem }}</a>
          </div>
          <div v-else>{{ resSDNItemItem }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      resSDN: '',
      thColumn: []
    }
  },
  async mounted() {
    // Request with full url becasue we are in JSDom env
    const { data } = await this.$axios.$get(
      'https://front.superbuy.com/shoppingguide/sale-daily-new?count=20'
    )

    const thcl = []
    if (data && data[0]) {
      Object.keys(data[0]).map(function(key, index) {
        thcl.push({ name: key, id: `thcl-${index}` })
      })
    }

    this.resSDN = data
    this.thColumn = thcl
  },

  methods: {
    checkImageLink: function(string) {
      const regex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/gm
      const check = regex.test(string)
      if (check === true) {
        return 'ok'
      } else {
        return null
      }
    },
    checkLink: function(string) {
      const regex = /(http)?s?:?(\/\/[^"']*)/gm
      const check = regex.test(string)
      if (check === true) {
        return 'ok'
      } else {
        return null
      }
    }
  }
}
</script>

<style>
</style>

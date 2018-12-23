<template>
  <div>
    <div v-if="loading" id="ipl-progress-indicator" class="ipl-progress-indicator">
      <div class="ipl-progress-indicator-head">
        <div class="first-indicator"/>
        <div class="second-indicator"/>
      </div>
    </div>

    <button
      class="z-1000 py-2 px-4 shadow-md no-underline rounded-full bg-blue text-white font-sans font-semibold text-xl border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none fixed pin-t pin-r mt-8 mr-8"
      @click="startInterval"
    >Get New
      <!-- <span v-if="sync">
        <img src="~/assets/image/Spinner.svg">
      </span>-->
    </button>

    <table class="text-left word-break-all w-full" style="border-collapse:collapse">
      <thead>
        <tr class="hidden md:table-row">
          <th
            v-for="(thColumnItem, index) in thColumn"
            v-if="CheckColumnGet(thColumnItem.name)"
            :key="`thColumnItem.id-${index}`"
            class="py-2 px-4 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light text-center"
          >{{ thColumnItem.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(resSDNItem, indexResSDNItem) in resSDN"
          :key="`resSDNItem-${indexResSDNItem}`"
          class="hover:bg-blue-lightest flex flex-col md:table-row"
        >
          <td
            v-for="(resSDNItemItem, indexResSDNItemItem) in resSDNItem"
            v-if="CheckColumnGet(indexResSDNItemItem)"
            :key="`resSDNItemItem-${indexResSDNItemItem}`"
            class="py-2 px-4 border-b border-grey-light text-center md:max-w-10em max-w-full"
          >
            <a
              v-if="checkImageLink(resSDNItemItem, indexResSDNItemItem)"
              :href="resSDNItem.goodsLink"
              :target="'_black'"
            >
              <v-lazy-image
                v-if="indexResSDNItemItem === 'goodsPicUrl'"
                :src="resSDNItemItem"
                class="max-w-full md:max-w-10em"
              />
              <v-lazy-image
                v-else
                :src="resSDNItemItem"
                class="max-w-full hidden md:inline md:max-w-5em"
              />
            </a>
            <a
              v-else-if="checkTitle(indexResSDNItemItem)"
              :href="resSDNItem.goodsLink"
              :target="'_black'"
              class="no-underline text-teal-dark hover:text-purple-light"
            >{{ resSDNItemItem }}</a>
            <p v-else class="text-teal-dark">{{ resSDNItemItem }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import VLazyImage from 'v-lazy-image'

import { merge_array } from './mergeArray'

export default {
  components: {
    VLazyImage
  },

  data() {
    return {
      resSDN: [],
      thColumn: [],
      loading: false,
      sync: false
    }
  },
  async created() {
    this.start()
    await this.getData()
    this.finish()
  },

  beforeDestroy() {
    clearInterval(this.polling)
  },

  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },

    getData: async function() {
      try {
        // this.$nuxt.$loading.start()

        const { data } = await this.$axios.$get(
          'https://front.superbuy.com/shoppingguide/sale-daily-new?count=40'
        )

        const thcl = []
        if (data && data[0]) {
          Object.keys(data[0]).map(function(key, index) {
            thcl.push({ name: key, id: `thcl-${index}` })
          })
        }

        this.resSDN = data
        this.thColumn = thcl
        // this.$nuxt.$loading.finish()
      } catch (error) {
        console.log(error)
      }
    },

    reGetData: async function() {
      console.log('renew data')

      this.start()

      // this.$nuxt.$loading.start()

      const { data } = await this.$axios.$get(
        'https://front.superbuy.com/shoppingguide/sale-daily-new?count=20'
      )

      this.resSDN = data
      this.finish()

      // this.$nuxt.$loading.finish()
    },

    startInterval: function() {
      this.resSDN = []
      this.reGetData()

      // this.sync = !this.sync
      // clearInterval(this.polling)
      // if (this.sync === true) {

      //   this.reGetData()

      //   this.polling = setInterval(() => {
      //     this.reGetData()
      //   }, 5000);
      // } else {
      // }
    },

    checkImageLink: function(string, title) {
      const columnGet = ['goodsPicUrl', 'buyerAvatar']

      const regex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/gm
      const check = regex.test(string)
      if (check === true) {
        return 'ok'
      } else if (columnGet.includes(title)) {
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
    },
    checkTitle: function(name) {
      if (name === 'goodsTitle') {
        return 'ok'
      } else {
        return null
      }
    },
    consoleLogAll: function(obje, obje2) {
      console.log(obje, obje2)
      return null
    },
    CheckColumnGet: function(name) {
      const columnGet = [
        'goodsPicUrl',
        'goodsTitle',
        // 'goodsLink',
        'goodsPrice',
        'buyerAvatar',
        'buyerName'
        // 'statePicUrl'
      ]
      const check = columnGet.includes(name)
      if (check) {
        return 'ok'
      } else {
        return null
      }
    },
    openNewWindow: function(link) {
      return window.open(link)
    }
  }
}
</script>

<style>
.max-w-5em {
  max-width: 5em;
}
@media (min-width: 768px) {
  .md\:max-w-5em {
    max-width: 5em;
  }
  .md\:max-w-10em {
    max-width: 10em;
  }
}

.z-1000 {
  z-index: 1000;
}
.v-lazy-image {
  filter: blur(3px);
  transition: filter 1.3s;
  will-change: filter;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
.max-w-10em {
  max-width: 10em;
}
.max-w-5em {
  max-width: 5em;
}
.word-break-all {
  word-break: break-all;
}

.ipl-progress-indicator.available {
  opacity: 0;
}
.ipl-progress-indicator {
  /* background-color: #f5f5f5; */
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: 1;
  pointer-events: none;
  -webkit-transition: opacity cubic-bezier(0.4, 0, 0.2, 1) 436ms;
  -moz-transition: opacity cubic-bezier(0.4, 0, 0.2, 1) 436ms;
  transition: opacity cubic-bezier(0.4, 0, 0.2, 1) 436ms;
  z-index: 9999;
}
.insp-logo-frame {
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  flex-direction: column;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  justify-content: center;
  -webkit-animation: fadein 436ms;
  -moz-animation: fadein 436ms;
  animation: fadein 436ms;
  height: 98%;
}
.insp-logo-frame-img {
  width: 112px;
  height: 112px;
  -webkit-align-self: center;
  -moz-align-self: center;
  align-self: center;
  border-radius: 50%;
}
.ipl-progress-indicator-head {
  background-color: #fceeff;
  height: 3px;
  overflow: hidden;
  position: relative;
}
.ipl-progress-indicator .first-indicator,
.ipl-progress-indicator .second-indicator {
  background-color: #ffa9e5;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  transform-origin: left center;
  -webkit-transform: scaleX(0);
  -moz-transform: scaleX(0);
  transform: scaleX(0);
}
.ipl-progress-indicator .first-indicator {
  -webkit-animation: first-indicator 2000ms linear infinite;
  -moz-animation: first-indicator 2000ms linear infinite;
  animation: first-indicator 2000ms linear infinite;
}
.ipl-progress-indicator .second-indicator {
  -webkit-animation: second-indicator 2000ms linear infinite;
  -moz-animation: second-indicator 2000ms linear infinite;
  animation: second-indicator 2000ms linear infinite;
}
.ipl-progress-indicator .insp-logo {
  animation: App-logo-spin infinite 20s linear;
  border-radius: 50%;
  -webkit-align-self: center;
  -moz-align-self: center;
  align-self: center;
}
@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes first-indicator {
  0% {
    transform: translate(0%) scaleX(0);
  }
  25% {
    transform: translate(0%) scaleX(0.5);
  }
  50% {
    transform: translate(25%) scaleX(0.75);
  }
  75% {
    transform: translate(100%) scaleX(0);
  }
  100% {
    transform: translate(100%) scaleX(0);
  }
}
@keyframes second-indicator {
  0% {
    transform: translate(0%) scaleX(0);
  }
  60% {
    transform: translate(0%) scaleX(0);
  }
  80% {
    transform: translate(0%) scaleX(0.6);
  }
  100% {
    transform: translate(100%) scaleX(0.1);
  }
}
</style>

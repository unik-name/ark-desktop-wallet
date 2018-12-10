<template>
  <div class="Unikard flex flex-col items-center mb-5">
    <Transition name="fade">
      <div
        v-if="unikname && unikname.profile"
        class="Unikard__card unik-name-details"
        md-theme="dark-grey"
        md-theme-watch
      >
        <div class="Unikard__title">
          <div class="Unikard__title__text flex flex-row items-center">
            <span :class="`Unikard__profile_picture ${unikname.type}`">
              <img :src="unikname.profile.picture">
            </span>
            <span class="Unikard__profile__unikname ml-2">
              @{{ unikname.resolver.unikname }}
            </span>
          </div>
        </div>
        <div class="Unikard__content flex flex-col">
          <div class="security flex flex-row my-3 mx-3">
            <div class="trust">
              <span class="Unikard__subtitle">
                Trust :
              </span>
              <span class="stars">
                <span
                  v-for="n in unikRange(1,unikname.security.trust)"
                  :key="`s${n}`"
                  class="Unikard__star ml-1"
                >
                  ★
                </span>
                <span
                  v-for="n in unikRange(1, 5 - unikname.security.trust)"
                  :key="`r${n}`"
                  class="Unikard__star Unikard__star__empty mr-1"
                >
                  ☆
                </span>
              </span>
            </div>
          </div>
          <div class="Unikard__support flex flex-col pt-5 mx-3 my-3">
            <div class="Unikard__subtitle mb-2">
              Supported by
              <span v-if="unikname.resolver.label && unikname.resolver.label !== 'default'">
                #{{ unikname.resolver.label }}
              </span>:
            </div>
            <div class="Unikard__support__types flex flex-row flex-wrap">
              <span
                v-for="type in unikname.supportedTypes"
                :key="`supp${type.type}`"
                class="Unikard__support__types__type px-2 py-1 mt-3 mr-2 flex flex-row justify-start items-center"
              >
                <img
                  :src="type.image"
                  class="mr-1"
                >
                <span>
                  {{ type.type }}
                </span>
              </span>
            </div>
          </div>
          <div class="flex flex-column justify-center mt-2">
            <a
              class="Unikard__link"
              href="https://unik-name.com"
            >
              unik-name.com
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'Unikard',
  props: {
    unikname: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    unikRange (min, max, step) {
      step = step || 1
      var input = []
      for (var i = min; i <= max; i += step) {
        input.push(i)
      }
      return input
    }
  }

}

</script>

<style lang="postcss" scoped>
.Unikard__card {
    background: #2A2B82;
    width: 100%;
    max-width: 350px;
    border-radius: 10px;
    color: #fff;
}

.Unikard__profile_picture img {
    width: 60px;
    height: 60px;
    border-radius: 50%;

}

.Unikard__profile__unikname {
    font-size: 1.6em;
    font-weight: bold;
}

.Unikard__title {
    background: #201c60;
    padding: 0.5rem 0.5rem 0 0.75rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.Unikard__subtitle {
  font-size: 1.2em;
  font-weight: bold;
}

.Unikard__star {
  font-size: 1.2em;
}

.Unikard__star__empty {
  font-size: 1.15em;
}

.Unikard__content {
    padding: 0.5rem;
}

.Unikard__support {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.Unikard__support__types__type {
  background-color: #fff;
  color: #000 !important;
  border-radius: 30px;
}

.Unikard__link, .Unikard__link:visited, .Unikard__link:hover, .Unikard__link:focus, .Unikard__link:active {
  color: #fff;
  text-decoration: none;
  outline: none;
}

.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

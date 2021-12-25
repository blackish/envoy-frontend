<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <RateLimits/>
  </div>
</template>

<script>
// @ is an alias to /src
import RateLimits from '@/components/RateLimits.vue'

export default {
  name: 'RateLimitsView',
  components: {
    RateLimits
  }
}
</script>

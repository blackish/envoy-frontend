<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <AuthzS3/>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthzS3 from '@/components/AuthzS3.vue'

export default {
  name: 'AuthzS3View',
  components: {
    AuthzS3
  }
}
</script>

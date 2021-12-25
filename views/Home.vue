<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Nodes/>
  </div>
</template>

<script>
// @ is an alias to /src
import Nodes from '@/components/Nodes.vue'

export default {
  name: 'Home',
  components: {
    Nodes
  }
}
</script>

<template>
  <div>
    <div>
      <el-input :value="data.priority"><template slot="prepend">Priority</template></el-input>
    </div>
    <div v-if="hasCircuitBreakerMaxConnections">
      <el-input :value="data.maxConnections"><template slot="prepend">Max Connections</template></el-input>
    </div>
    <div v-if="hasCircuitBreakerMaxPendingRequests">
      <el-input :value="data.maxPendingRequests"><template slot="prepend">Max Pending Requests</template></el-input>
    </div>
    <div v-if="hasCircuitBreakerMaxRequests">
      <el-input :value="data.maxRequests"><template slot="prepend">Max Requests</template></el-input>
    </div>
    <div v-if="hasCircuitBreakerMaxRetries">
      <el-input :value="data.maxRetries"><template slot="prepend">Max Retries</template></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CircuitBreaker',
  props: {
    data: Object
  },
  data () {
    return {
    }
  },
  computed: {
    hasCircuitBreakerMaxConnections: function () {
      if ( this.data.maxConnections != undefined ) {
        return true
      }
      return false
    },
    hasCircuitBreakerMaxPendingRequests: function () {
      if ( this.data.maxPendingRequests != undefined ){
        return true;
      }
      return false
    },
    hasCircuitBreakerMaxRequests: function () {
      if ( this.data.maxRequests ){
        return true;
      }
      return false
    },
    hasCircuitBreakerMaxRetries: function () {
      if ( this.data.maxRetries ){
        return true;
      }
      return false
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

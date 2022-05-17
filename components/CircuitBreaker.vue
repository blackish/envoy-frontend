<template>
  <div>
    <div>
      <el-input :value="data.priority"><template slot="prepend">Priority</template></el-input>
    </div>
    <div v-if="hasCircuitBreakersMaxConnections">
      <el-input :value="data.MaxConnections"><template slot="prepend">Max Connections</template></el-input>
    </div>
    <div v-if="hasCircuitBreakersMaxPendingRequests">
      <el-input :value="data.MaxPendingRequests"><template slot="prepend">Max Pending Requests</template></el-input>
    </div>
    <div v-if="hasCircuitBreakersMaxRequests">
      <el-input :value="data.MaxRequests"><template slot="prepend">Max Requests</template></el-input>
    </div>
    <div v-if="hasCircuitBreakersMaxRetries">
      <el-input :value="data.MaxRetries"><template slot="prepend">Max Retries</template></el-input>
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
      if ( this.data.maxConnections ) {
        return true
      }
      return false
    },
    hasCircuitBreakerMaxPendingRequests: function () {
      if ( this.data.maxPendingRequests ){
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

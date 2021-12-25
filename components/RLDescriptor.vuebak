<template>
  <div>
    <el-row v-if="hasRequestHeaders">
      <el-col>
        <el-input :value="data.requestHeaders.headerName"><template slot="prepend">Header name</template></el-input>
      </el-col>
      <el-col>
        <el-input :value="data.requestHeaders.descriptorKey"><template slot="prepend">Descriptor key</template></el-input>
      </el-col>
      <el-col>
        <el-input :value="data.requestHeaders.skipIfAbsent"><template slot="prepend">Skip descriptor if absent</template></el-input>
      </el-col>
    </el-row>
    <el-row v-if="hasGenericKey">
      <el-col>
        <el-input :value="data.genericKey.descriptorKey"><template slot="prepend">Descriptor key</template></el-input>
      </el-col>
      <el-col>
        <el-input :value="data.genericKey.descriptorValue"><template slot="prepend">Descriptor value</template></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RLDescriptor',
  props: {
    rindex: Number,
    data: Object
  },
  data () {
    return {
    }
  },
  computed: {
    hasRequestHeaders: function () {
      if ( this.data.requestHeaders ) {
        return true
      }
      return false
    },
    hasGenericKey: function () {
      if ( this.data.genericKey ){
        return true;
      }
      return false
    },
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

<template>
  <div>
    <el-row>
      <el-col :span="5">
        Hash type: {{hashType}}
      </el-col>
      <el-col :span="5">
        Terminal: {{data.terminal}}
      </el-col>
      <div v-if="hashType=='cookie'">
        <el-col :span="10">
          Cookie: {{data.cookie.name}}
          <span v-if="isCookieTtl">
            TTL: {{data.cookie.ttl}}
          </span>
        </el-col>
      </div>
      <div v-if="hashType=='header'">
        <el-col :span="10">
          Header: {{data.header.headerName}}
          <span v-if="isRegexRewrite">
            Regex: {{data.header.regexRewrite.pattern.regex}} Substitution: {{data.header.regexRewrite.substitution}}
          </span>
        </el-col>
      </div>
      <div v-if="hashType=='connectionProperties'">
        <el-col :span="10">
          SourceIP: {{data.connectionProperties.sourceIp}}
        </el-col>
      </div>
      <div v-if="hashType=='queryParameter'">
        <el-col :span="10">
          Name: {{data.queryParameter.name}}
        </el-col>
      </div>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'HashPolicy',
  props: {
    data: Object
  },
  data () {
    return {
    }
  },
  computed: {
    hashType: function () {
      if ( this.data.cookie ) {
        return "cookie"
      }
      if ( this.data.header ) {
        return "header"
      }
      if ( this.data.connectionProperties ) {
        return "connectionProperties"
      }
      if ( this.data.queryParameter ) {
        return "queryParameter"
      }
      return ""
    },
    isCookieTtl: function () {
      if ( this.data.cookie ) {
        if ( this.data.cookie.ttl ) {
          return true
        }
      }
      return false
    },
    isRegexRewrite: function () {
      if ( this.data.header ) {
        if ( this.data.header.regexRewrite ) {
          return true
        }
      }
      return false
    }
  },
  methods: {
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

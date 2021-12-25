<template>
  <div>
    <el-row>
      <el-col>
        <el-input :value="data.name"><template slot="prepend">Header name</template></el-input>
      </el-col>
      <el-col v-if="matchType == 'exactMatch'">
        <el-input :value="data.exactMatch"><template slot="prepend">Exact Match</template></el-input>
      </el-col>
      <el-col v-if="matchType == 'safeRegexMatch'">
        <el-input :value="data.safeRegexMatch.regex"><template slot="prepend">Regex Match</template></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Headers',
  props: {
    data: Object
  },
  data () {
    return {
    }
  },
  computed: {
    matchType: function () {
      if ( this.data.exactMatch ) {
        return "exactMatch"
      }
      if ( this.data.safeRegexMatch ) {
        return "safeRegexMatch"
      }
      return ""
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

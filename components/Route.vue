<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-input :value="matchValue"><template slot="prepend">{{matchType}}</template></el-input>
      </el-col>
    </el-row>
    <div v-if="hasHeaders">
      <el-row v-for="hdr in data.match.headers" :key="hdr">
        <Headers :data="hdr"/>
      </el-row>
    </div>
    <el-row v-if="routeAction">
      <el-col :span="20">
        <el-input :value="actionValue"><template slot="prepend">Cluster</template></el-input>
      </el-col>
    </el-row>
    <el-row v-if="actionRewriteType != ''">
      <el-col :span="20">
        <el-input :value="actionRewriteValue"><template slot="prepend">{{actionRewriteType}}</template></el-input>
      </el-col>
    </el-row>
    <el-row v-if="actionRewriteType=='Regex rewrite'">
      <el-col :span="20">
        <el-input :value="actionSubstitute"><template slot="prepend">Substitute</template></el-input>
      </el-col>
    </el-row>
    <el-row v-if="timeout">
      <el-col :span="20">
        <el-input :value="data.route.timeout"><template slot="prepend">Route timeout</template></el-input>
      </el-col>
    </el-row>
    <div v-if="routeAction">
      <el-row>
      <el-col :span="20">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Consistent hash policy</span><el-button style="float: right; padding: 3px 0" type="text" @click="consistentHashVisible=true">Add hash policy</el-button>
        </div>
        <div v-if="hasHashPolicy">
          <el-row v-for="(hp,hpi) in data.route.hashPolicy" :key="hp">
            <el-col :span="3">
              <el-button type="danger" @click="$emit('delConsistentHash',hpi, rindex)">Delete</el-button>
              <el-button icon="el-icon-arrow-up" @click="$emit('upConsistentHash',hpi, rindex)"></el-button>
              <el-button icon="el-icon-arrow-down" @click="$emit('downConsistentHash',hpi, rindex)"></el-button>
            </el-col>
            <el-col :span="20">
              <HashPolicy :data="hp"></HashPolicy>
            </el-col>
          </el-row>
        </div>
      </el-card>
      </el-col>
      </el-row>
    </div>
    <el-dialog title="Add consistent hash" :visible.sync="consistentHashVisible">
      <el-form ref="consistentHashForm">
        <el-form-item label="Hash type">
          <el-select v-model="consistentHashForm.hashType">
            <el-option value="cookie" label="cookie"></el-option>
            <el-option value="header" label="header"></el-option>
            <el-option value="connectionProperties" label="connection properties"></el-option>
            <el-option value="queryParameter" label="query parameter"></el-option>
          </el-select>
        </el-form-item>
        <div v-if="consistentHashForm.hashType==`cookie`">
          <el-form-item label="Cookie name">
            <el-input v-model="consistentHashForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Ttl">
            <el-input v-model.number="consistentHashForm.cookieTtl" type="number"></el-input>
            <el-select v-model="consistentHashForm.cookieTtlUnit">
              <el-option value="s" label="second"></el-option>
              <el-option value="m" label="minute"></el-option>
              <el-option value="h" label="hour"></el-option>
              <el-option value="d" label="day"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-if="consistentHashForm.hashType=='header'">
          <el-form-item label="Header name">
            <el-input v-model="consistentHashForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Replace header">
            <el-switch v-model="consistentHashForm.useRegex"></el-switch>
          </el-form-item>
          <div v-if="consistentHashForm.useRegex">
            <el-form-item label="Regex pattern">
              <el-input v-model="consistentHashForm.pattern"></el-input>
            </el-form-item>
            <el-form-item label="Regex substitution">
              <el-input v-model="consistentHashForm.substitution"></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-if="consistentHashForm.hashType=='connectionProperties'">
          <el-form-item label="Use source IP">
            <el-switch v-model="consistentHashForm.useSourceIp"></el-switch>
          </el-form-item>
        </div>
        <div v-if="consistentHashForm.hashType=='queryParameter'">
          <el-form-item label="Parameter name">
            <el-input v-model="consistentHashForm.name"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="Terminal">
          <el-switch v-model="consistentHashForm.terminal"></el-switch>
        </el-form-item>
        <el-button type="primary" @click="submitConsistentHash">Set</el-button>
        <el-button>Cancel</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import HashPolicy from '@/components/HashPolicy.vue'
import Headers from '@/components/Headers.vue'
export default {
  name: 'Route',
  props: {
    rindex: Number,
    data: Object
  },
  data () {
    return {
      consistentHashVisible: false,
      consistentHashForm: {
        hashType: "cookie",
        cookieTtl: 0,
        cookieTtlUnit: "",
        name: "",
        useRegex: false,
        pattern: "",
        substitution: "",
        useSourceIp: false,
        terminal: true
      }
    }
  },
  computed: {
    hasHashPolicy: function () {
      if ( this.data.route ){
        if ( this.data.route.hashPolicy ) {
          return true;
        }
      }
      return false
    },
    hasHeaders: function () {
      if ( this.data.match ) {
        if ( this.data.match.headers ) {
          return true
        }
      }
      return false
    },
    matchType: function () {
      if ( this.data.match ) {
        if ( this.data.match.safeRegex ) {
          return "Regex"
        }
        if ( this.data.match.prefix ) {
          return "Prefix"
        }
        if ( this.data.match.path ) {
          return "Path"
        }
        if ( this.data.match.headers ) {
          return "headers"
        }
      }
      return ""
    },
    matchValue: function () {
      if ( this.data.match ) {
        if ( this.data.match.safeRegex ) {
          return this.data.match.safeRegex.regex
        }
        if ( this.data.match.prefix ) {
          return this.data.match.prefix
        }
        if ( this.data.match.path ) {
          return this.data.match.path
        }
      }
      return ""
    },
    timeout: function () {
      if ( this.data.route ) {
        if ( this.data.route.timeout ) {
          return true
        }
      }
      return false
    },
    routeAction: function () {
      if ( this.data.route ) {
        return true
      }
      return false
    },
    redirectAction: function () {
      if ( this.data.redirect ) {
        return true
      }
      return false
    },
    actionValue: function () {
      if ( this.data.route ) {
        return this.data.route.cluster
      }
      return ""
    },
    actionRewriteType: function () {
      if ( this.data.redirect ) {
        if ( this.data.redirect.httpsRedirect ) {
          return "httpsRedirect"
        }
        if ( this.data.redirect.hostRedirect ) {
          return "Host redirect"
        }
        if ( this.data.redirect.pathRedirect ) {
          return "Path redirect"
        }
        if ( this.data.redirect.prefixRewrite ) {
          return "Prefix rewrite"
        }
      }
      if ( this.data.route ) {
        if ( this.data.route.prefixRewrite ) {
          return "Prefix rewrite"
        }
        if ( this.data.route.hostRewriteLiteral ) {
          return "Host rewrite"
        }
        if ( this.data.route.regexRewrite ) {
          return "Regex rewrite"
        }
      }
      return ""
    },
    actionSubstitute: function () {
      if ( this.data.route ) {
        if ( this.data.route.regexRewrite ) {
          return this.data.route.regexRewrite.substitution
        }
      }
      return ""
    },
    actionRewriteValue: function () {
      if ( this.data.redirect ) {
        if ( this.data.redirect.httpsRedirect ) {
          return this.data.redirect.httpsRedirect
        }
        if ( this.data.redirect.hostRedirect ) {
          return this.data.redirect.hostRedirect
        }
        if ( this.data.redirect.pathRedirect ) {
          return this.data.redirect.pathRedirect
        }
        if ( this.data.redirect.prefixRewrite ) {
          return this.data.redirect.prefixRewrite
        }
      }
      if ( this.data.route ) {
        if ( this.data.route.prefixRewrite ) {
          return this.data.route.prefixRewrite
        }
        if ( this.data.route.hostRewriteLiteral ) {
          return this.data.route.hostRewriteLiteral
        }
        if ( this.data.route.regexRewrite ) {
          return this.data.route.regexRewrite.safeRegex.regex
        }
      }
      return ""

    }
  },
  methods: {
    submitConsistentHash: function() {
      console.log(this.rindex)
      this.$emit("addConsistentHash", this.consistentHashForm, this.rindex)
      this.consistentHashVisible = false
    }
  },
  components: {
    HashPolicy,
    Headers
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

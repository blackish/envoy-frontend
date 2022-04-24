<template>
<div>
<el-row>
  <el-col :span="20">
    <el-input :value="data.name"><template slot="prepend">VirtualHost name:</template></el-input>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Domain match</span><el-button style="float: right; padding: 3px 0" type="text" @click="addDomainMatchVisible=true">Add domain match</el-button>
      </div>
      <div v-if="domainMatchExist">
        <el-row v-for="(dom,dindex) in data.domains" :key="dom">
          <el-col>
            <el-input :value="dom"><template slot="prepend">Domain:</template><template slot="append"><el-button icon="el-icon-delete" @click="$emit('delDom',index,dindex)"></el-button></template></el-input>
          </el-col>
        </el-row>
      </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="4">
      <el-button type="success" @click="addRLDescriptorVisible=true">Add Global RateLimit Descriptor</el-button>
    </el-col>
    <el-col :span="20">
      <div v-if="hasRLDescriptors">
        <el-row v-for="(rl,rlindex) in data.rateLimits[0].actions" :key="rl">
          <el-col>
            <RLDescriptor :data="rl" :rindex="rlindex"/>
          </el-col>
          <el-col>
            <el-button icon="el-icon-delete" @click="$emit('delRLDescriptor',index,rlindex)"></el-button>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="4">
      <el-button type="success" @click="addRouteVisible=true">Add route</el-button>
    </el-col>
    <el-col :span="20">
      <el-row v-for="(r,rindex) in data.routes" :key="r">
        <el-col>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{r.name}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="$emit('delRoute',index,rindex)">delete</el-button>
              <el-button style="float: left; padding: 3px 0" icon="el-icon-arrow-up" @click="$emit('upRoute',index,rindex)"></el-button>
              <el-button style="float: left; padding: 3px 0" icon="el-icon-arrow-down" @click="$emit('downRoute',index,rindex)"></el-button>
            </div>
            <div>
              <Route :data="r" :rindex="rindex" @addConsistentHash="addRouteConsistentHash" @delConsistentHash="delRouteConsistentHash" @upConsistentHash="upRouteConsistentHash" @downConsistentHash="downRouteConsistentHash"></Route>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-dialog title="Add match domain" :visible.sync="addDomainMatchVisible">
    <el-form ref="addDomainMatchForm">
      <el-form-item label="Match domain">
        <el-input v-model="addDomainMatchForm.domain"></el-input>
      </el-form-item>
      <el-button type="primary" @click="$emit('addDom',index,addDomainMatchForm.domain);addDomainMatchVisible=false">Add</el-button>
      <el-button>Cancel</el-button>
    </el-form>
  </el-dialog>
  <el-dialog title="Add route" :visible.sync="addRouteVisible">
    <el-form ref="addRouteForm">
      <el-form-item label="Route name">
        <el-input v-model="addRouteForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Match type">
        <el-select v-model="addRouteForm.matchType" placeholder="select" default-first-option=true>
          <el-option label="Regex" value="regex"></el-option>
          <el-option label="Prefix" value="prefix"></el-option>
          <el-option label="Path" value="path"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Match header">
        <el-checkbox v-model="addRouteForm.matchHeader"/>
      </el-form-item>
      <el-form-item label="Match value">
        <el-input v-model="addRouteForm.matchValue"></el-input>
      </el-form-item>
      <div v-if="addRouteForm.matchHeader">
        <el-table :data="addRouteForm.headers">
          <el-table-column label="Name" prop="name"/>
          <el-table-column label="Match Type" prop="type"/>
          <el-table-column label="Match Value" prop="value"/>
          <el-table-column label="">
            <template slot-scope="scope">
              <el-button @click="$delete(addRouteForm.headers,scope.$index)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item label="Header Name">
          <el-input v-model="addRouteForm.headerName"></el-input>
        </el-form-item>
        <el-form-item label="Match type">
          <el-select v-model="addRouteForm.headerMatchType">
            <el-option label="Header Exist" value="exist"/>
            <el-option label="Exact Match" value="exactMatch"/>
            <el-option label="Regex Match" value="safeRegexMatch"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="addRouteForm.headerMatchType != 'exist'">
          <el-input v-model="addRouteForm.headerValue"></el-input>
        </el-form-item>
        <el-button @click="addRouteForm.headers.push({name: addRouteForm.headerName, type: addRouteForm.headerMatchType, value: addRouteForm.headerValue});addRouteForm.headerValue=''">Add</el-button>
      </div>
      <el-form-item label="Action type">
        <el-select v-model="addRouteForm.actionType" placeholder="Select" default-first-option=true>
          <el-option label="route" value="route"></el-option>
          <el-option label="redirect" value="redirect"></el-option>
        </el-select>
      </el-form-item>
      <div v-if="addRouteForm.actionType=='route'">
        <el-form-item label="Cluster">
          <el-select v-model="addRouteForm.cluster">
            <div v-for="c in configClusters.data.clusters" :key="c">
              <el-option :label="c.name" :value="c.name"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="Timeout(seconds)">
          <el-checkbox v-model="addRouteForm.timeout"></el-checkbox>
          <el-input v-model.number="addRouteForm.timeoutValue" type="number" :disabled="!addRouteForm.timeout"></el-input>
        </el-form-item>
        <el-form-item label="Rewrite type">
          <el-select v-model="addRouteForm.actionRewriteType" placeholder="select" default-first-option=true>
            <el-option label="No rewrite" value="noRewrite"></el-option>
            <el-option label="Host rewrite" value="hostRewrite"></el-option>
            <el-option label="Prefix rewrite" value="prefixRewrite"></el-option>
            <el-option label="Regex rewrite" value="regexRewrite"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Rewrite value" v-if="addRouteForm.actionRewriteType!='noRewrite'">
          <el-input v-model="addRouteForm.actionRewriteValue"></el-input>
        </el-form-item>
        <el-form-item v-if="addRouteForm.actionRewriteType=='regexRewrite'" label="Substitution">
          <el-input v-model="addRouteForm.actionRewriteSubstitution"></el-input>
        </el-form-item>
      </div>
      <div v-if="addRouteForm.actionType=='redirect'">
        <el-form-item label="Redirect type">
          <el-select v-model="addRouteForm.actionRedirectType" placeholder="select" :default-first-option="true">
            <el-option label="HTTP to HTTPS schema redirect" value="httpsRedirect"></el-option>
            <el-option label="Host redirect" value="hostRedirect"></el-option>
            <el-option label="Path redirect" value="pathRedirect"></el-option>
            <el-option label="Prefix rewrite" value="prefixRewrite"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Redirect value" v-if="addRouteForm.actionRedirectType != 'httpsRedirect'">
          <el-input v-model="addRouteForm.actionRedirectValue"></el-input>
        </el-form-item>
      </div>
      <el-button type="primary" @click="$emit('addRoute',index,addRouteForm);addRouteVisible=false">Add</el-button>
      <el-button>Cancel</el-button>
    </el-form>
  </el-dialog>
  <el-dialog title="Add RateLimit descriptor" :visible.sync="addRLDescriptorVisible">
    <el-form ref="addRLDescriptorForm">
      <el-form-item label="Descriptor type">
        <el-select v-model="addRLDescriptorForm.type" placeholder="select" :default-first-option="true">
          <el-option label="Request Headers" value="requestHeaders"></el-option>
          <el-option label="Generic Key" value="genericKey"></el-option>
        </el-select>
      </el-form-item>
      <div v-if='addRLDescriptorForm.type=="requestHeaders"'>
        <el-form-item label="Header name">
          <el-input v-model="addRLDescriptorForm.headerName"></el-input>
        </el-form-item>
        <el-form-item label="Descriptor key">
          <el-input v-model="addRLDescriptorForm.descriptorKey"></el-input>
        </el-form-item>
        <el-form-item label="Skip descriptor if header absent">
          <el-switch v-model="addRLDescriptorForm.skipIfAbsent"></el-switch>
        </el-form-item>
      </div>
      <div v-if='addRLDescriptorForm.type=="genericKey"'>
        <el-form-item label="Descriptor key">
          <el-input v-model="addRLDescriptorForm.descriptorKey"></el-input>
        </el-form-item>
        <el-form-item label="Descriptor value">
          <el-input v-model="addRLDescriptorForm.descriptorValue"></el-input>
        </el-form-item>
      </div>
      <el-button type="primary" @click="$emit('addRLDescriptor',index,addRLDescriptorForm);addRLDescriptorVisible=false">Add</el-button>
      <el-button>Cancel</el-button>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import Route from '@/components/Route.vue'
import RLDescriptor from '@/components/RLDescriptor.vue'
import Vue from "vue"
import VueChimera from "vue-chimera"
Vue.use(VueChimera, {
  baseURL: "http://10.99.6.41:8080/api/v1"
  // Chimera default options
})
export default {
  name: 'VirtualHost',
  props: {
    data: Object,
    index: Number,
    nodeid: String
  },
  data () {
    return {
      addRLDescriptorVisible: false,
      addRLDescriptorForm: {
        type: "",
        headerName: "",
        descriptorKey: "",
        descriptorValue: "",
        skipIfAbsent: false
      },
      addRouteForm: {
        name: "",
        timeout: false,
        timeoutValue: 0,
        cluster: "",
        actionType: "",
        actionRewriteType: "",
        actionRewriteValue: "",
        actionRewriteSubstitution: "",
        matchType: "",
        matchValue: "",
        matchHeader: false,
        headers: Array(),
        headerName: "",
        headerMatchType: "",
        headerValue: "",
        actionRedirectType: "",
        actionRedirectValue: ""
      },
      addRouteVisible: false,
      addDomainMatchVisible: false,
      addDomainMatchForm: {
        domain: ""
      }
    }
  },
  chimera: {
    configClusters () {
      return {
        url: '/config/' + this.nodeid + "/clusters/",
        auto: true,
        on: {
          success () {
          }
        }
      }
    }
  },
  computed: {
    domainMatchExist: function() {
      return true
    },
    hasRLDescriptors: function() {
      if(this.data.rateLimits) {
        if (this.data.rateLimits.length > 0) {
          if ( this.data.rateLimits[0].actions ) {
            return true
          }
        }
      }
      return false
    }
  },
  components: {
    Route,
    RLDescriptor
  },
  methods: {
    addRouteConsistentHash (form, ri) {
      this.$emit("addConsistentHash", form, ri, this.index)
    },
    delRouteConsistentHash (chi, ri) {
      this.$emit("delConsistentHash", chi, ri, this.index)
    },
    upRouteConsistentHash (chi, ri) {
      console.log(chi)
      console.log(ri)
      console.log(this.index)
      this.$emit("upConsistentHash", chi, ri, this.index)
    },
    downRouteConsistentHash (chi, ri) {
      this.$emit("downConsistentHash", chi, ri, this.index)
    }
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

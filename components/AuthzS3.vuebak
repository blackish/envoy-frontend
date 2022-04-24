<template>
  <div class="hello">
    <h1>Last loaded {{configAuthzS3.lastLoaded}}</h1>
    <el-button type="success" @click="$chimera.saveAuthzS3.reload()">Save</el-button>
    <el-button type="success" @click="addNamespaceVisible=true">Add namespace</el-button>
    <div v-if="hasNamespaces">
      <el-row v-for="(ns,nsi) in configAuthzS3.data.authzs3.config.namespaces" :key="ns">
        <el-col :span="4">
          <el-button type="danger" @click="deleteNamespace(nsi)">Delete</el-button>
        </el-col>
        <el-col :span="20">
          <AuthzS3NS :data="ns" :ns="nsi"/>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="Add namespace" :visible.sync="addNamespaceVisible">
      <el-form ref="addNamespaceForm">
        <el-form-item label="Namespace">
          <el-input v-model="addNamespaceForm.namespace" placeholder="envoy"></el-input>
        </el-form-item>
        <el-form-item label="Permit on default">
          <el-checkbox v-model="addNamespaceForm.action"></el-checkbox>
        </el-form-item>
        <el-button type="primary" @click="addNamespaceSubmit">Set</el-button>
        <el-button>Cancel</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue"
import AuthzS3NS from '@/components/AuthzS3NS.vue'
import VueChimera from "vue-chimera"
Vue.use(VueChimera, {
  baseURL: "http://10.99.6.41:8080/api/v1"
  // Chimera default options
})
export default {
  name: 'AuthzS3',
  props: {
    msg: String
  },
  data() {
    return {
      addNamespaceVisible: false,
      addNamespaceForm: {
        namespace: "",
        action: false
      }
    }
  },
  computed: {
    hasConfig: function () {
      if ( !this.configAuthzS3.data.authzs3.config ) {
        return false
      }
      return true
    },
    hasNamespaces: function () {
      if ( !this.configAuthzS3.data.authzs3 ) {
        return false
      }
      if ( !this.configAuthzS3.data.authzs3.config ){
        return false
      }
      if ( this.configAuthzS3.data.authzs3.config.namespaces ) {
        return true
      }
      return false
    },
  },
  chimera: {
    configAuthzS3 () {
      return {
        url: '/authzs3/',
        auto: true,
        method: "get",
        on: {
          success (){
          }
        }
      }
    },
    saveAuthzS3 () {
      return {
        url: '/authzs3/',
        auto: false,
        method: "put",
        params: JSON.stringify(this.configAuthzS3.data.authzs3),
        on: {
          success (){
            this.$chimera.configAuthzS3.reload()
          }
        }
      }
    }
  },
  methods: {
    addNamespaceSubmit () {
      if ( !this.configAuthzS3.data.authzs3.config ){
        this.$set(this.configAuthzS3.data,"authzs3", {config: Object()})
      }
      if (!this.configAuthzS3.data.authzs3.config.namespaces){
        this.$set(this.configAuthzS3.data.authzs3.config,"namespaces", Object())
      }
      this.$set(this.configAuthzS3.data.authzs3.config.namespaces,this.addNamespaceForm.namespace,{action: this.addNamespaceForm.action})
      this.addNamespaceVisible = false
    },
    deleteNamespace (i) {
      this.$delete(this.configAuthzS3.data.authzs3.config.namespaces,i)
    }
  },
  components: {
    AuthzS3NS
  },
  mounted() {
    this.$chimera.configAuthzS3.reload()
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

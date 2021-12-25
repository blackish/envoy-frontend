<template>
  <div>
    <h1>{{nodeid}}</h1>
    <el-divider>Secrets</el-divider>
    <el-row v-for="i in configSecrets.data.secrets" :key="i">
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{i.name}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="deleteSecret=i.name;$chimera.deleteSecret.reload()">Delete</el-button>
          </div>
          <div v-if="i.tlsCertificate">
            <div>Server side certificate</div>
            <el-input :value="i.tlsCertificate.issuer"><template slot="prepend">Issuer</template></el-input>
            <el-input :value="i.tlsCertificate.subject"><template slot="prepend">Subject</template></el-input>
            <el-input :value="i.tlsCertificate.notBefore"><template slot="prepend">Not before</template></el-input>
            <el-input :value="i.tlsCertificate.notAfter"><template slot="prepend">Not after</template></el-input>
          </div>
          <div v-if="i.validationContextCa">
            <div>Validation CA</div>
            <el-input :value="i.validationContextCa.issuer"><template slot="prepend">Issuer</template></el-input>
            <el-input :value="i.validationContextCa.subject"><template slot="prepend">Subject</template></el-input>
            <el-input :value="i.validationContextCa.notBefore"><template slot="prepend">Not before</template></el-input>
            <el-input :value="i.validationContextCa.notAfter"><template slot="prepend">Not after</template></el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-button type="success" @click="addSecretVisible=true">Add Secret</el-button>
    <el-dialog title="Add secret" :visible.sync="addSecretVisible">
      <el-form ref="addSecretForm">
        <el-form-item label="Secret name">
          <el-input v-model="addSecretForm.name" placeholder="secret"></el-input>
        </el-form-item>
        <el-form-item label="Secret type">
          <el-select v-model="addSecretForm.secretType" placeholder="select" default-first-option=true>
            <el-option label="TLS Certificate" value="tlsCertificate"></el-option>
            <el-option label="Validation context" value="validationContext"></el-option>
          </el-select>
        </el-form-item>
        <div v-if="addSecretForm.secretType == 'tlsCertificate'">
          <el-form-item label="Certificate">
            <el-input type="textarea" v-model="addSecretForm.tlsCertificate"></el-input>
          </el-form-item>
          <el-form-item label="Private key">
            <el-input type="textarea" v-model="addSecretForm.privateKey"></el-input>
          </el-form-item>
        </div>
        <div v-if="addSecretForm.secretType == 'validationContext'">
          <el-form-item label="Trusted CA">
            <el-input type="textarea" v-model="addSecretForm.trustedCa"></el-input>
          </el-form-item>
        </div>
        <el-button type="primary" @click="addSecretSubmit">Set</el-button>
        <el-button>Cancel</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue"
import VueChimera from "vue-chimera"
Vue.use(VueChimera, {
  baseURL: "http://10.99.6.41:8080/api/v1"
  // Chimera default options
})
export default {
  name: 'Secrets',
  props: {
    nodeid: String
  },
  data: function () {
    return {
      addRouteVisible: false,
      addRouteForm: {
        iface: "",
        nexthop: "",
        net: ""
      },
      addSecretVisible: false,
      addSecretForm: {
        name: "",
        secretType: "",
        tlsCertificate: "",
        privateKey: "",
        trustedCa: ""
      },
      addSecretParams: "",
      deleteSecret: ""
    }
  },
  chimera: {
    configSecrets () {
      return {
        url: '/config/' + this.nodeid + "/secrets/",
        auto: true,
        method: "get",
      }
    },
    addSecret (){
      return {
        url: '/config/' + this.nodeid + '/secrets/',
        auto: false,
        method: "put",
        params: this.addSecretParams,
        on: {
          success (){
            this.addSecretVisible = false
            this.$chimera.configSecrets.reload()
          }
        }
      }
    },
    deleteSecret (){
      return {
        url: '/config/' + this.nodeid + '/secrets/' + this.deleteSecret,
        auto: false,
        method: "delete",
        on: {
          success (){
            this.$chimera.configSecrets.reload()
          }
        }
      }
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
    addSecretSubmit: function () {
      var secret = Object();
      var crt = ""
      var key = ""
      this.$set(secret, "name", this.addSecretForm.name)
      if ( this.addSecretForm.secretType == "tlsCertificate" ){
        crt = this.addSecretForm.tlsCertificate.replace(/\n/g,"\n")
        key = this.addSecretForm.privateKey.replace(/\n/g,"\n")
        this.$set(secret, "tlsCertificate", Object())
        this.$set(secret.tlsCertificate, "certificateChain", Object())
        this.$set(secret.tlsCertificate.certificateChain, "inlineString", crt )
        this.$set(secret.tlsCertificate, "privateKey", Object())
        this.$set(secret.tlsCertificate.privateKey, "inlineString", key )
      }
      if ( this.addSecretForm.secretType == "validationContext" ){
        crt = this.addSecretForm.trustedCa.replace(/\n/g,"\n")
        this.$set(secret,"validationContext", Object())
        this.$set(secret.validationContext,"trustedCa", Object())
        this.$set(secret.validationContext.trustedCa,"inlineString", crt)
      }
      this.addSecretParams = JSON.stringify(secret)
      this.$chimera.addSecret.reload()
    }
  },
  mounted () {
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
<style>
  .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>

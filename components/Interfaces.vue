<template>
  <div>
    <h1>{{nodeid}}</h1>
    <el-divider>Interfaces</el-divider>
    <el-row v-for="i in configInterfaces.data.ifaces" :key="i">
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{i.name}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="addAddressForm.name=i.name;addAddressVisible=true">Add address</el-button>
          </div>
          <div v-for="addr in i.ipnet" :key="addr">
            <el-input :value="addr"><template slot="prepend">Address</template><template slot="append"><el-button icon="el-icon-delete" @click="addAddressForm.name=i.name;$delete(addAddressForm.ipnet,0);addAddressForm.ipnet.push(addr);$chimera.deleteInterface.reload()"></el-button></template></el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider>Routes</el-divider>
    <el-row v-for="rt in configRoutes.data.routes" :key="rt">
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{rt.net}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="addRouteForm.net=rt.net;addRouteForm.nexthop=rt.nexthop;addRouteForm.iface=rt.iface;$chimera.deleteRoute.reload()">Delete</el-button>
          </div>
          <div>
            <el-input :value="rt.nexthop"><template slot="prepend">Nexthop</template></el-input>
            <el-input :value="rt.iface"><template slot="prepend">Interface</template></el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-button type="success" @click="addRouteVisible=true">Add route</el-button>
    <el-dialog title="Add ip address" :visible.sync="addAddressVisible">
      <el-form ref="addAddressForm">
        <el-form-item label="Address with prefix">
          <el-input v-model="addAddressForm.ipnet[0]" placeholder="192.168.1.1/24"></el-input>
        </el-form-item>
        <el-button type="primary" @click="addAddressVisible=false;$chimera.saveInterface.reload()">Set</el-button>
        <el-button>Cancel</el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="Add ip route" :visible.sync="addRouteVisible">
      <el-form ref="addRouteForm">
        <el-form-item label="Prefix">
          <el-input v-model="addRouteForm.net" placeholder="192.168.1.0/24"></el-input>
        </el-form-item>
        <el-form-item label="Next hop">
          <el-input v-model="addRouteForm.nexthop"></el-input>
        </el-form-item>
        <el-form-item label="Interface">
          <el-select v-model="addRouteForm.iface">
            <el-option v-for="i in configInterfaces.data.ifaces" :key="i.name" :label="i.name" :value="i.name"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="addRouteVisible=false;$chimera.saveRoute.reload()">Set</el-button>
        <el-button>Cancel</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue"
import VueChimera from "vue-chimera"
Vue.use(VueChimera, {
  baseURL: "http://127.0.0.1:8080/api/v1"
  // Chimera default options
})
export default {
  name: 'Interfaces',
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
      addAddressVisible: false,
      addAddressForm: {
        ipnet: [""],
        name: ""
      },
    }
  },
  chimera: {
    configInterfaces () {
      return {
        url: '/config/' + this.nodeid + "/interfaces",
        auto: true,
        method: "get",
      }
    },
    configRoutes () {
      return {
        url: '/config/' + this.nodeid + "/routes",
        auto: true,
        method: "get",
      }
    },
    saveRoute (){
      return {
        url: '/config/' + this.nodeid + '/routes',
        auto: false,
        method: "put",
        params: JSON.stringify(this.addRouteForm),
        on: {
          success (){
            this.$chimera.configRoutes.reload()
          }
        }
      }
    },
    deleteRoute (){
      return {
        url: '/config/' + this.nodeid + '/routes',
        auto: false,
        method: "delete",
        params: JSON.stringify(this.addRouteForm),
        on: {
          success (){
            this.$chimera.configRoutes.reload()
          }
        }
      }
    },
    saveInterface (){
      return {
        url: '/config/' + this.nodeid + '/interfaces',
        auto: false,
        method: "put",
        params: JSON.stringify(this.addAddressForm),
        on: {
          success (){
            this.$chimera.configInterfaces.reload()
          }
        }
      }
    },
    deleteInterface (){
      return {
        url: '/config/' + this.nodeid + '/interfaces',
        auto: false,
        method: "delete",
        params: JSON.stringify(this.addAddressForm),
        on: {
          success (){
            this.$chimera.configInterfaces.reload()
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

<template>
  <div>
    <el-alert title="Config consistent" type="success" v-show="isConfigConsistent"></el-alert>
    <el-alert title="Config inconsistent" type="error" v-show="!isConfigConsistent"></el-alert>
        <div><h1>{{ this.$route.params.id }}</h1></div>
    <el-tabs v-model="nodeModel">
      <el-tab-pane label="Status" name="status">
        <div v-if="liveClusters.data.nodes[$route.params.id]">
          <el-row>
            <el-col :span="24">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>Node status</span>
                </div>
                <div>Node version: {{this.liveNodes.data.nodes[this.$route.params.id].version}}</div>
                <div>Node status: {{this.liveNodes.data.nodes[this.$route.params.id].state}}</div>
                <div>Node uptime: {{this.liveNodes.data.nodes[this.$route.params.id].uptime_current_epoch}}</div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>Sync status</span>
                </div>
                <div>Synced: {{this.liveSync.data.synced}}</div>
                <div>Last synced at: {{this.liveSync.data.updated}}</div>
                <div v-if="liveSync.data.synced=='False'">
                  <div>Sync status: {{this.liveSync.data.status}}</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-delimiter>Clusters</el-delimiter>
          <el-row v-for="c in liveClusters.data.nodes[$route.params.id]" :key="c">
            <el-col :span="24">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{c["cluster.name"]}}</span>
                </div>
                <el-row v-for="ce in c['cluster.endpoints']" :key="ce">
                  <el-col :span="20">
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <span>{{ce["endpoint.address"]}}</span>
                      </div>
                      <div>Status: {{ce["endpoint.health"]}}</div>
                      <div>Total requests: {{ce["endpoint.rq_total"]}}</div>
                      <div>Successful requests: {{ce["endpoint.rq_success"]}}</div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form ref="newLogging">
                <el-form-item label="Module">
                  <el-select v-model="newLogging.module" placeholder="module">
                    <el-option label="client" value="client"></el-option>
                    <el-option label="config" value="config"></el-option>
                    <el-option label="connection" value="connection"></el-option>
                    <el-option label="conn_handler" value="conn_handler"></el-option>
                    <el-option label="decompression" value="decompression"></el-option>
                    <el-option label="grpc" value="grpc"></el-option>
                    <el-option label="hc" value="hc"></el-option>
                    <el-option label="health_checker" value="health_checker"></el-option>
                    <el-option label="http" value="http"></el-option>
                    <el-option label="http2" value="http2"></el-option>
                    <el-option label="init" value="init"></el-option>
                    <el-option label="main" value="main"></el-option>
                    <el-option label="misc" value="misc"></el-option>
                    <el-option label="quic" value="quic"></el-option>
                    <el-option label="quic_stream" value="quic_stream"></el-option>
                    <el-option label="pool" value="pool"></el-option>
                    <el-option label="router" value="router"></el-option>
                    <el-option label="runtime" value="runtime"></el-option>
                    <el-option label="stats" value="stats"></el-option>
                    <el-option label="secret" value="secret"></el-option>
                    <el-option label="tracing" value="tracing"></el-option>
                    <el-option label="upstream" value="upstream"></el-option>
                    <el-option label="udp" value="udp"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Loglevel">
                  <el-select v-model="newLogging.loglevel" placeholder="loglevel">
                    <el-option label="info" value="info"></el-option>
                    <el-option label="debug" value="debug"></el-option>
                    <el-option label="trace" value="trace"></el-option>
                  </el-select>
                </el-form-item>
                <el-button type="success" @click="this.$chimera.putLiveLogging.reload()">Set</el-button>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>Log level</span>
                </div>
                <el-row v-for="l in liveLogging.data.logging" :key="l">
                  <el-col :span="20">
                    <span>{{l.module}}: {{l.loglevel}}</span>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Listeners" name="listeners">
        <el-row v-for="l in configListeners.data.listeners" v-bind:key="l">
          <el-col :span="10">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ l.name }}</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push({ name: 'Listener', params: { id: nodeid, l_id: l.name }})">Edit</el-button>
                <el-button style="float: left; padding: 3px 0" type="text" @click="toDeleteListener=l.name;$chimera.deleteListener.reload()">Delete</el-button>
              </div>
              <div class="text item">
                {{ l.address.socketAddress.address }}:{{ l.address.socketAddress.portValue }}
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-button type="success" @click="addListenerVisible=true">Add listener</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Cluster" name="cluster">
        <el-row v-for="c in configClusters.data.clusters" v-bind:key="c">
          <el-col :span="10">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ c.name }}</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push({ name: 'Cluster', params: { id: nodeid, c_id: c.name }})">Edit</el-button>
                <el-button style="float: left; padding: 3px 0" type="text" @click="toDeleteCluster=c.name;$chimera.deleteCluster.reload()">Delete</el-button>
              </div>
              <div class="text item">
                {{ c.type }}
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-button type="success" @click="addClusterVisible=true">Add cluster</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Interfaces" name="interfaces">
        <el-row>
          <el-col :span="10">
            <Interfaces :nodeid="this.nodeid"></interfaces>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Secrets" name="secrets">
        <el-row>
          <el-col :span="10">
            <Secrets :nodeid="this.nodeid"></Secrets>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="AddListener" :visible.sync="addListenerVisible">
      <el-form ref="addListenerObject">
        <el-form-item label="Name">
          <el-input v-model="addListenerObject.name"></el-input>
        </el-form-item>
        <el-button type="primary" @click="$router.push({ name: 'Listener', params: { id: nodeid, l_id: addListenerObject.name }})">Set</el-button>
        <el-button>Cancel</el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="AddCluster" :visible.sync="addClusterVisible">
      <el-form ref="addClusterObject">
        <el-form-item label="Name">
          <el-input v-model="addClusterObject.name"></el-input>
        </el-form-item>
        <el-button type="primary" @click="$router.push({ name: 'Cluster', params: { id: nodeid, c_id: addClusterObject.name }})">Set</el-button>
        <el-button>Cancel</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue"
import VueChimera from "vue-chimera"
import Interfaces from '@/components/Interfaces.vue'
import Secrets from '@/components/Secrets.vue'
Vue.use(VueChimera, {
//  baseURL: "process.env.BASEURL"
  baseURL: "http://10.99.6.41:8080/api/v1"
  // Chimera default options
})
export default {
  name: 'Node',
  data: function () {
    return {
      isConfigConsistent: false,
      nodeid: this.$route.params.id,
			dialogTableVisible: false,
      nodeModel: "listeners",
      newLogging: {
        module: "",
        loglevel: ""
      },
      toDeleteListener: "",
      toDeleteCluster: "",
      addClusterVisible: false,
      addClusterObject: {
        name: ""
      },
      addListenerVisible: false,
      addListenerObject: {
        name: "",
        address: {
          socketAddress: {
            address: "",
            portValue: 0
          }
        },
        filterChains: []
      }
    }
  },
  chimera: {
    configConsistent () {
      return {
        url: '/config/' + this.nodeid + '/configstatus',
        auto: true,
        on: {
          success () {
            if ( this.configConsistent.data.configstatus == 'consistent' ) {
              this.isConfigConsistent = true
            } else {
              this.isConfigConsistent = false
            }
          }
        }
      }
    },
    configListeners () {
      return {
        url: '/config/' + this.nodeid + "/listeners/",
        auto: true,
        on: {
          success () {
          }
        }
      }
    },
    liveNodes () {
      return {
        url: '/live/nodes',
        auto: true,
        on: {
          success () {
          }
        }
      }
    },
    liveClusters () {
      return {
        url: '/live/nodes/' + this.nodeid + '/clusters',
        auto: true,
        on: {
          success () {
          }
        }
      }
    },
    liveLogging () {
      return {
        url: '/live/nodes/' + this.nodeid + '/logging',
        auto: true,
        on: {
          success () {
          }
        }
      }
    },
    configClusters () {
      return {
        url: '/config/' + this.nodeid + "/clusters/",
        auto: true,
        on: {
          success () {
          }
        }
      }
    },
    liveSync () {
      return {
        url: '/live/nodes/' + this.nodeid + '/sync',
        auto: true,
        on: {
          success () {
          }
        }
      }
    },
    putLiveLogging () {
      return {
        url: '/live/nodes/' + this.nodeid + '/logging',
        auto: false,
        method: "put",
        params: JSON.stringify(this.newLogging),
        on: {
          success () {
            this.$chimera.libeLogging.reload()
          }
        }
      }
    },
    deleteCluster() {
      return {
        url: '/config/' + this.nodeid + '/clusters/' + this.toDeleteCluster,
        auto: false,
        method: "delete",
        on: {
          success (){
            this.$chimera.configClusters.reload()
          }
        }
      }
    },
    deleteListener() {
      return {
        url: '/config/' + this.nodeid + '/listeners/' + this.toDeleteListener,
        auto: false,
        method: "delete",
        on: {
          success (){
            this.$chimera.configListeners.reload()
          }
        }
      }
    }
  },
  components: {
    Interfaces,
    Secrets
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

<template>
  <div class="hello">
    <el-table :data="nodes.data.nodes">
    <el-table-column prop="name" label="name"/>
    <el-table-column prop="address" label="address"/>
    <el-table-column label="">
      <template slot-scope="scope">
      <span @click="$router.push({ name: 'Node', params: { id: scope.row.name }})">
      <el-button type="success">edit</el-button>
      </span>
      <el-button type="danger" @click="deleteNode=scope.row.name;$chimera.deleteNode.reload()">delete</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-button type="success" @click="addNodeVisible=true">Add node</el-button>
  <el-dialog title="Add node" :visible.sync="addNodeVisible">
    <el-form ref="addNodeForm">
      <el-form-item label="Node name">
        <el-input v-model="addNodeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Node address">
        <el-input v-model="addNodeForm.address"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitAddNode">Set</el-button>
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
  name: 'Nodes',
  props: {
    msg: String
  },
  chimera: {
    nodes: "/config/",
    saveNode () {
      return {
        url: '/config/' + this.addNodeForm.name,
        auto: false,
        method: "put",
        params: JSON.stringify(this.addNodeForm),
        on: {
          success (){
            this.$chimera.nodes.reload()
          }
        }
      }
    },
    deleteNode () {
      return {
        url: '/config/' + this.deleteNode,
        auto: false,
        method: "delete",
        on: {
          success (){
            this.$chimera.nodes.reload()
          }
        }
      }
    },
  },
  data: function () {
    return {
      addNodeVisible: false,
      addNodeForm: {
        name: "",
        address: ""
      },
      deleteNode: ""
    }
  },
  methods: {
    submitAddNode () {
      this.$chimera.saveNode.reload()
      this.addNodeVisible = false
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

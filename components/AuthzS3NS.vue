<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ns}}</span><el-button style="float: right; padding: 3px 0" type="text" @click="addAddressVisible = true">Add address</el-button>
      </div>
      <div slot="header" class="clearfix">
        <el-input :value="data.action"><template slot="prepend">Action:</template></el-input>
      </div>
      <div v-if="hasSources">
        <el-row v-for="(s,si) in data.sources" :key="s">
          <el-col :span="15"><el-input :value="si" disabled><template slot="prepend">Address</template></el-input></el-col><el-col :span="4"><el-input :value="s.action" disabled><template slot="prepend">Permit</template></el-input></el-col><el-col :span="2"><el-button icon="el-icon-delete" @click="deleteAddress(si)"></el-button></el-col>
        </el-row>
      </div>
    </el-card>
    <el-dialog title="Add Address" :visible.sync="addAddressVisible">
      <el-form ref="addAddressForm">
        <el-form-item label="Address">
          <el-input v-model="addAddressForm.address" placeholder="envoy"></el-input>
        </el-form-item>
        <el-form-item label="Permit">
          <el-checkbox v-model="addAddressForm.action"></el-checkbox>
        </el-form-item>
        <el-button type="primary" @click="addAddressSubmit">Set</el-button>
        <el-button>Cancel</el-button>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'AuthzS3NS',
  props: {
    ns: Number,
    data: Object
  },
  data () {
    return {
      addAddressVisible: false,
      addAddressForm: {
        address: "",
        action: false
      }
    }
  },
  computed: {
    hasSources: function () {
      if ( this.data.sources ) {
        return true
      }
      return false
    },
  },
  methods: {
    addAddressSubmit() {
      if (!this.data.sources){
        this.$set(this.data, "sources", Object())
      }
      this.$set(this.data.sources,this.addAddressForm.address, {action: this.addAddressForm.action})
      this.addAddressVisible = false
    },
    deleteAddress(i){
      this.$delete(this.data.sources,i)
    }
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

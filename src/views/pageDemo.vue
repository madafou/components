<template>
  <div style="width: 100; height: 100%" class="chart-demo">
    <!-- <json-editor v-model="options" :options="{ mode: 'code', search: false }" :showBtns="false" :plus="true" height="100%"
      @error="onError" /> -->
    <!-- <vue-json-editor v-model="options" :showBtns="false" mode="code" lang="zh" :expanded-on-start="true" /> -->
    <ct-table stripe :data="tableData" :table-header="tableHeader">
      <span slot="header" slot-scope="{ row, $index }">
        自定义表头
      </span>
      <span slot="address1" slot-scope="{ row, $index }">
        地址1
      </span>
      <span slot="address2" slot-scope="{ row, $index }">
        地址2
      </span>
      <span slot="address" slot-scope="{ row, $index }">
        {{ row.address }}
      </span>
    </ct-table>

  </div>
</template>
<script>
import VJsoneditor from 'v-jsoneditor/src/index'
import jsonEditor from './jsonEdtor.vue'
import vueJsonEditor from 'vue-json-editor'
export default {
  name: 'pageDemo',
  components: {
    jsonEditor,
    vueJsonEditor
  },
  data() {
    return {
      tableHeader: [
        { label: '复选框', type: 'selection' },
        { label: '序号', type: 'index' },
        { label: '姓名', prop: 'name' },
        { label: '日期', prop: 'date' },
        {
          label: '地址', header: 'header', slotColumn: 'address',
          children: [
            {
              label: '地址1',
              header: 'address1',
              prop: 'address1'
            },
            {
              label: '地址2',
              header: 'address2',
              prop: 'address2'
            }
          ]
        },
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        address1: 'address1',
        address2: 'address2',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        address1: 'address1',
        address2: 'address2',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
    }
  },
  mounted() {
  },
  methods: {
    onError(ev) {
      console.log(ev)
    }
  }
}

</script>
<style scoped lang="scss">
.chart-demo {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  .chart-wrap {
    width: 50%;
    height: 100%;
  }
}
</style>
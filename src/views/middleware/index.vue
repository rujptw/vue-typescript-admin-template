<!--
 * @Date: 2020-12-16 10:09:44
 * @LastEditors: sam
 * @LastEditTime: 2020-12-25 16:57:43
 * @FilePath: /vue-typescript-admin-template/src/views/middleware/index.vue
-->
<template>
  <div class="app-container middle-container">
      <v-table
        :table-data="tableData"
        :table-config="tableConfig"
        :operate-config="operateConfig"
        :total="total"
        :limit="limit"
        :page="page"
        @listenSize="listenSize"
        @listenCurrent="listenCurrent"
        @listenOperate="listenOperate"
      />
    <!-- TODO:可做成通用的dialog-->
    <el-dialog title="redis管理" :visible.sync="showSetting"  :close-on-click-modal="false" custom-class="add-edit-dialog my-dialog" :before-close="handleSettingClose">
        <el-tabs :tab-position="tabPosition" type="border-card" style="height: 500px;">
        <el-tab-pane label="服务">
          <div class="status-container">
            <span class="status-title">当前状态:</span>
            <span class="status-value">开启</span>
            <span class="status-icon">
              <font-awesome-icon :icon="['fas', 'caret-right']"></font-awesome-icon>
            </span>
          </div>
          <div class="status-operate">
            <el-button  @click.native.prevent="stopServices" size="medium">停止</el-button>
            <el-button  @click.native.prevent="restartServices" size="medium">重启</el-button>
            <el-button  @click.native.prevent="reloadConfig" size="medium">重载配置</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置修改">
          <p> 提示: 使用ctrl+s进行搜索, ctrl+g查找下一个</p>
            <codemirror
            class="code-editor"
            ref="cmEditor"
            :value="code"
            :options="cmOptions"
            @ready="onCmReady"
            @focus="onCmFocus"
            @input="onCmCodeChange"
          />
        <el-button @click.native.prevent="saveConf" size="middle">保存</el-button>
        </el-tab-pane>

      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="handleSettingClose" >关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator'
import VSeperate from 'comp/Seperate/index.vue'
import VTable from 'comp/table/index.vue'
import searchMixin from 'mixin/search'

// import { Tree as ElTree } from 'element-ui'
// import { TreeData } from 'element-ui/types/tree'

@Component({
  name: 'Tree',
  components: {
    VSeperate,
    VTable
  }
})
export default class middleWare extends Mixins(searchMixin) {
    tableConfig:any=[
      {
        label: '中间件名称',
        prop: 'middleWareName',
        show: true,
        minWidth: '120px'
      },
      { label: '说明', prop: 'desc', show: true, minWidth: '120px' },
      { label: '状态', prop: 'status', show: true }
    ]

    tableData=[
      {
        middleWareName: 'redis',
        desc: '分布式',
        status: '在线'
      },
      {
        middleWareName: 'ngnix',
        desc: '转发代理',
        status: '在线'
      }
    ]

    operateConfig=[
      {
        name: '设置',
        operate: 'manage',
        type: 'primary'
      },
      {
        name: '安装',
        operate: 'manage',
        type: 'primary'
      },
      {
        name: '卸载',
        operate: 'manage',
        type: 'primary'
      }
    ]

    // 编辑器设置
    code = 'ssl_prefer_server_ciphers   on;'
    cmOptions={
      tabSize: 4,
      mode: 'text/x-nginx-conf',
      styleActiveLine: true,
      theme: 'paraiso-light',
      lineNumbers: true,
      line: true
    }

    onCmReady(cm:any) {
      console.log('the editor is readied!', cm)
    }

    onCmFocus(cm:any) {
      console.log('the editor is focused!', cm)
    }

    onCmCodeChange(newCode:any) {
      console.log('this is new code', newCode)
      this.code = newCode
    }

    // get codemirror() {
    //   return this.$refs.cmEditor.codemirror
    // }

    // 设置
    showSetting=false
    tabPosition='left'
    /**
     * 停止服务
     */
    stopServices() {
      console.log('stopServices')
    }

    /**
     *重启服务
     */
    restartServices() {
      console.log('restartServices')
    }

    /**
     *重载配置
     */
    reloadConfig() {
      console.log('reloadConfig')
    }

    mounted() {
      console.log('mounted')
    }

    handleSettingClose() {
      this.showSetting = false
    }

    listenSize() {
      console.log('listenSize')
    }

    listenCurrent() {
      console.log('listenCurrent')
    }

    listenOperate(operate:any) {
      const data = operate.scope.row
      const key = operate.key
      if (key === 'manage') {
        console.log('manage')
        this.showSetting = true
      }
    }
  // private filterText = '';
  // private data2 = [{
  //   id: 1,
  //   label: 'Level one 1',
  //   children: [{
  //     id: 4,
  //     label: 'Level two 1-1',
  //     children: [{
  //       id: 9,
  //       label: 'Level three 1-1-1'
  //     }, {
  //       id: 10,
  //       label: 'Level three 1-1-2'
  //     }]
  //   }]
  // }, {
  //   id: 2,
  //   label: 'Level one 2',
  //   children: [{
  //     id: 5,
  //     label: 'Level two 2-1'
  //   }, {
  //     id: 6,
  //     label: 'Level two 2-2'
  //   }]
  // }, {
  //   id: 3,
  //   label: 'Level one 3',
  //   children: [{
  //     id: 7,
  //     label: 'Level two 3-1'
  //   }, {
  //     id: 8,
  //     label: 'Level two 3-2'
  //   }]
  // }];

  // private defaultProps = {
  //   children: 'children',
  //   label: 'label'
  // };

  // @Watch('filterText')
  // private onFilterTextChange(value: string) {
  //   (this.$refs.tree2 as ElTree).filter(value)
  // }

  // private filterNode(value: string, data: TreeData) {
  //   if (!value) { return true }
  //   return data.label && data.label.indexOf(value) !== -1
  // }
}
</script>

<style lang="scss" scoped>
 ::v-deep{
   .my-dialog .el-dialog__body{
      padding: 0px;
   }
   .my-dialog .el-tabs--border-card{
     box-shadow: none;
     border: none;
   }
 }
 .status-container{
   display: flex;
   align-items: center;
   margin-bottom:15px;
   .status-title,.status-value,.status-icon{
     font-size: 16px;
   }
   .status-value{
     margin-right: 5px;
   }
   .status-icon{
     color: green;
   }
 }
 .code-editor{
   margin-top:15px;
   margin-bottom:15px;
   height: 100%;
 }

</style>

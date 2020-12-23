<!--
 * @Date: 2020-12-16 10:09:44
 * @LastEditors: sam
 * @LastEditTime: 2020-12-23 17:53:24
 * @FilePath: /vue-typescript-admin-template/src/views/dataBase/index.vue
-->
<template>
  <div class="app-container">
    <div class="search search__container">
      <el-form
        ref="dataBaseSearch"
        :inline="true"
        :model="searchForm"
        :label-position="labelPosition"
        class="employer-put-search"
      >
        <!-- :rules="checkRules" -->

        <el-row>
          <el-form-item label="数据库名称:" name="name" class="policy-no" prop="name">
            <el-input
              v-model.trim="searchForm.name"
              type="text"
              :maxlength="32"
              autocomplete="off"
            />
          </el-form-item>
           <span class="btn__position">
            <el-form-item>
              <el-button size="medium" type="primary" @click="search">搜索</el-button>
               <el-button size="medium" @click="resetForm">重置</el-button>
            </el-form-item>
          </span>
        </el-row>
      </el-form>
    </div>
   <VSeperate></VSeperate>
    <el-row class="other-btn__action">
      <el-button size="medium" type="primary" icon="el-icon-plus" @click="addNew">添加数据库</el-button>
      <el-button size="medium" type="primary"  @click="addNew">root密码修改</el-button>
    </el-row>
      <v-table
        :is-selection="isSelection"
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
      <!-- 新增和编辑 -->
    <el-dialog :title="title" :visible.sync="showAddOrEdit2" width="480px" :close-on-click-modal="false" custom-class="add-edit-dialog my-dialog" :before-close="handleAddOrEditClose2">
      <div class="detail-add-edit2">
        <el-form
          ref="addOrEditRef2"
          :inline="true"
          :model="addOrEditForm2"
          :rules="addOrEditRule"
          class=""
          label-position="left"
        >
          <el-row :gutter="0">
            <el-col :span="24">
              <el-form-item label="银行名称" prop="bankName">
                <el-input
                  v-model.trim="addOrEditForm2.bankName"
                  type="text"
                  autocomplete="off"
                  clearable
                  class="my-form-search-input"
                  style="width: 280px"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="24">
              <el-form-item label="银行行号" prop="protocolNo">
                <el-input
                  v-model.trim="addOrEditForm2.protocolNo"
                  type="text"
                  autocomplete="off"
                  clearable
                  class="my-form-search-input"
                  style="width: 280px"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="24">
              <el-form-item label="是否支持" prop="isSupport">
                <el-switch v-model="addOrEditForm2.isSupport" active-text="是" inactive-text="否" active-value="1" inactive-value="0" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="handleAddOrEditClose2">取消</el-button>
        <el-button type="primary" @click.native.prevent="handleAddOrEditOk2">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
// 需要 文件路径 + 文件名才能正确引入,
import VSeperate from 'comp/Seperate/index.vue'
import VTable from 'comp/table/index.vue'
import { memory } from 'console'
import searchMixin from 'mixin/search'
import { Component, Mixins } from 'vue-property-decorator'
interface search{
  name:''
}

@Component({
  name: 'dataBase',
  components: {
    VSeperate,
    VTable
  }
})
export default class dataBase extends Mixins(searchMixin) {
      labelPosition='right';
      isSelection=true;
      searchForm:search = {
        name: ''
      }

      tableData : any[]=[
        {
          dataBaseName: 'sit',
          userName: 'admin',
          password: 123456,
          backup: '无备份',
          memo: 'test'

        }
      ]

      tableConfig:any=[
        {
          label: '数据库名',
          prop: 'dataBaseName',
          show: true,
          minWidth: '120px'
        },
        { label: '用户姓名', prop: 'userName', show: true, minWidth: '120px' },
        { label: '密码', prop: 'password' },
        { label: '备份', prop: 'backup', show: true, minWidth: '200px' },
        { label: '备注', prop: 'memo', show: true, minWidth: '120px' }

      ]

      operateConfig=[
        {
          name: '管理',
          operate: 'manage',
          type: 'primary'
        },
        {
          name: '工具',
          operate: 'tool',
          type: 'info'
        },
        {
          name: '权限',
          operate: 'authority',
          type: 'success'
        },
        {
          name: '改密',
          operate: 'changePass',
          type: 'warning'
        },
        {
          name: '删除',
          operate: 'remove',
          type: 'danger'
        }
      ]

      newDataBase={
        dataBaseName: '',
        password: '',
        authority: ''
      }

      search() {
        console.log(this.searchForm)
        this.page = 1
        this.limit = 10
        this.loadData({ ...this.searchForm, page: 1, limit: 10 } /* getUserManageList */
        )
      }

      addNew() {

      }

      listenOperate() {

      }

      listenSize(limit:number) {
        this.limit = limit
        this.loadData({ ...this.searchForm, limit } /* getUserManageList */)
      }

      listenCurrent(page:number) {
        this.page = page
        this.loadData({ ...this.searchForm, page } /* getUserManageList */)
      }

      resetForm() {
        console.log(this.searchForm)
        // this.$refs.userSearch.resetFields()
        this.limit = 10
        this.page = 1
        this.loadData({
          page: 1,
          limit: 10,
          username: '',
          name: '',
          enabled: ''
        } /* getUserManageList */)
      }
}
</script>

<style lang="scss" scoped>

</style>

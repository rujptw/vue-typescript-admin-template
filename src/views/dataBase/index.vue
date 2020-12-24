<!--
 * @Date: 2020-12-16 10:09:44
 * @LastEditors: sam
 * @LastEditTime: 2020-12-24 16:42:50
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
      <el-button size="medium" type="primary"  @click="changeRoot">root密码修改</el-button>
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
          label-position="right"
        >
          <el-row :gutter="0">
            <el-col :span="24">
              <el-form-item label="数据库名称" prop="dataBaseName">
                <el-input
                  v-model.trim="addOrEditForm2.dataBaseName"
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
              <el-form-item label="密码" prop="password" class="pass-container" label-width="82px">
                <el-input
                  v-model.trim="addOrEditForm2.password"
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
              <el-form-item label="访问权限" prop="authority" label-width="82px">
                  <el-select v-model="addOrEditForm2.authority" placeholder="请选择">
                    <el-option
                      v-for="item in authorityOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
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
    <!-- 修改root密码 -->
    <el-dialog title="设置数据库密码" :visible.sync="showRoot" width="480px" :close-on-click-modal="false" custom-class="add-edit-dialog my-dialog" :before-close="handleRootPassClose">
      <div class="detail-add-edit2">
        <el-form
          ref="addOrEditRef2"
          :inline="true"
          :model="rootPassForm"
          :rules="rootPassRule"
          class=""
          label-position="right"
        >
          <el-row :gutter="0">
            <el-col :span="24">
              <el-form-item label="root密码" prop="passsword">
                <el-input
                  v-model.trim="rootPassForm.passsword"
                  type="text"
                  autocomplete="off"
                  clearable
                  class="my-form-search-input"
                  style="width: 280px"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="handleRootClose">取消</el-button>
        <el-button type="primary" @click.native.prevent="handleRootOk">确定</el-button>
      </div>
    </el-dialog>
    <!--  单个数据库密码设置-->
    <el-dialog title="修改数据库密码" :visible.sync="showPassChange" width="480px" :close-on-click-modal="false" custom-class="add-edit-dialog my-dialog" :before-close="handlePassChangeClose">
      <div class="detail-add-edit2">
        <el-form
          ref="addOrEditRef2"
          :inline="true"
          :model="passForm"
          :rules="passFormRule"
          class=""
          label-position="right"
        >
          <el-row :gutter="0">
            <el-col :span="24">
              <el-form-item label="用户名" prop="userName">
                <el-input
                  v-model.trim="passForm.userName"
                  type="text"
                  autocomplete="off"
                  clearable
                  class="my-form-search-input"
                  style="width: 280px"
                />
              </el-form-item>
              <el-form-item label="新密码" prop="passsword">
                <el-input
                  v-model.trim="passForm.passsword"
                  type="text"
                  autocomplete="off"
                  clearable
                  class="my-form-search-input"
                  style="width: 280px"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="handlePassChangeClose">取消</el-button>
        <el-button type="primary" @click.native.prevent="handlePassChangeOk">确定</el-button>
      </div>
    </el-dialog>
    <!-- 设置数据库权限 -->
    <el-dialog title="设置数据库权限" :visible.sync="showAuthChange" width="480px" :close-on-click-modal="false" custom-class="add-edit-dialog my-dialog" :before-close="handleAuthChangeClose">
      <div class="detail-add-edit2">
        <el-form
          ref="addOrEditRef2"
          :inline="true"
          :model="authForm"
          :rules="authFormRule"
          class=""
          label-position="right"
        >
          <el-row :gutter="0">
            <el-col :span="24">
              <el-form-item label="访问权限" prop="authority" label-width="82px">
                  <el-select v-model="authForm.authority" placeholder="请选择">
                    <el-option
                      v-for="item in authorityOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="handleAuthChangeClose">取消</el-button>
        <el-button type="primary" @click.native.prevent="handleAuthChangeOk">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
// 需要 文件路径 + 文件名才能正确引入,
import VSeperate from 'comp/Seperate/index.vue'
import VTable from 'comp/table/index.vue'
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

      // 新增-dialog
      title='新增'
      showAddOrEdit2=false
      addOrEditForm2={
        dataBaseName: '',
        password: '',
        authority: ''

      }

      addOrEditRule = {
        bankName: { required: true, message: '数据库名称不能为空', trigger: 'blur' },
        password: { required: true, message: '密码不能为空', trigger: 'blur' },
        authority: { required: true, message: '访问权限不能为空', trigger: 'blur' }
      }

      authorityOptions=[
        {
          value: 'local',
          label: '本地服务器'
        },
        {
          value: 'all',
          label: '所有人'
        },
        {
          value: 'assign',
          label: '指定ip'
        }
      ]

      handleAddOrEditClose2() {
        this.showAddOrEdit2 = false
        // this.$refs.addOrEditRef2.resetFields()
      }

      handleAddOrEditOk2() {
        // this.$refs.addOrEditRef2.validate(valid => {
        //   if (valid) {
        //   }
        // })
      }

      // 新增-dialog
      // root密码-dialog
      showRoot=false;
      handleRootPassClose() {
        this.showRoot = false
      }

      rootPassRule={
        passsword: { required: true, message: 'root密码不能为空', trigger: 'blur' }
      }

      rootPassForm = {
        passsword: ''
      }

      handleRootClose() {
        this.showRoot = false
      }

      handleRootOk() {
        console.log('handleRootOk')
      }

      // root密码-dialog
      // 单个数据库改密
      showPassChange=false

      passForm={
        userName: '',
        password: ''
      }

      passFormRule={
        userName: { required: true, message: '用户名不能为空', trigger: 'blur' },
        passsword: { required: true, message: '新密码不能为空', trigger: 'blur' }
      }

      handlePassChangeClose() {
        this.showPassChange = false
      }

      handlePassChangeOk() {
        console.log('handlePassOk')
      }

      // 单个数据库改密
      // 单个数据库权限设置
      showAuthChange = false;
      authForm={
        authority: ''
      }

      authFormRule={
        authority: { required: true, message: '访问权限不能为空', trigger: 'blur' }

      }

      handleAuthChangeClose() {
        this.showAuthChange = false
      }

      handleAuthChangeOk() {
        console.log('handleAuthChangeOk')
      }

      // 单个数据库权限设置

      search() {
        console.log(this.searchForm)
        this.page = 1
        this.limit = 10
        this.loadData({ ...this.searchForm, page: 1, limit: 10 } /* getUserManageList */
        )
      }

      addNew() {
        this.showAddOrEdit2 = true
      }

      changeRoot() {
        this.showRoot = true
      }

      // 删除数据库
      deleteUser(data:any) {
        const id = data.id
        this.$confirm(`确定删除"${data.name}"用户？`, '', {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          showClose: false,
          type: 'warning'
        })
          .then(async() => {
            try {
            } catch (error) {
              console.log('error', error)
            }
          })
          .catch(err => {
            console.log('err', err)
          }
          )
      }

      listenOperate(operate:any) {
        const data = operate.scope.row
        const key = operate.key
        console.log('key', key)
        console.log('data', data)
        if (key === 'remove') {
          this.deleteUser(data)
        }
        if (key === 'changePass') {
          this.showPassChange = true
        }
        if (key === 'authority') {
          this.showAuthChange = true
        }
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

<template>
  <div>
    <el-card style="height: 80px">
      <el-form class="user_search">
        <el-form-item label="用户名">
          <el-input placeholder="请输入搜索用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            :disabled="keyword ? false : true"
            @click="search"
          >
            搜索
          </el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="primary" @click="deleteSelectUser">批量删除</el-button>
      <el-table
        border
        style="margin: 10px 0"
        :data="userArr"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          label="#"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column
          label="用户名字"
          align="center"
          prop="username"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户名称"
          align="center"
          prop="name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户角色"
          align="center"
          prop="rolename"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setRole(scope.row)"
            >
              分配角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateUser(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${scope.row.username}?`"
              width="260px"
              @confirm="deleteUser(scope.row.id)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        :current-page="pageNo"
        :page-size="pageSize"
        backgroud
        @current-change="getHasUser"
        layout="prev, pager, next, jumper, ->, total"
      ></el-pagination>
    </el-card>
    <el-drawer v-model="drawer" title="添加用户">
      <template #footer>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </template>
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input
            v-model="userParams.username"
            placeholder="请输入用户姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input
            v-model="userParams.name"
            placeholder="请输入用户昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
          <el-input
            v-model="userParams.password"
            placeholder="请输入用户密码"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 分配角色的抽屉 -->
    <el-drawer v-model="drawer1" title="分配角色">
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input v-model="userParams.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox
              @change="handleCheckAllChange"
              v-model="checkAll"
              :indeterminate="isIndeterminate"
            >
              全选
            </el-checkbox>
            <!-- 显示职位的的复选框 -->
            <el-checkbox-group
              v-model="userRole"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="(role, index) in allRole"
                :key="index"
                :label="role"
              >
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="confirmClick">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqSelectUser,
} from '@/api/acl/user'
import type {
  useResponseData,
  Records,
  User,
  AllRole,
  AllRoleResponseData,
  SetRoleData,
} from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
let total = ref<number>(0)
let pageSize = ref<number>(5)
let pageNo = ref<number>(1)
let userArr = ref<Records>([])
//定义响应式数据:收集用户输入进来的关键字
let keyword = ref<string>('')
// 控制抽屉的显示和隐藏
let drawer = ref<boolean>(false)
// 分配角色的抽屉
let drawer1 = ref<boolean>(false)
//存储全部职位的数据
let allRole = ref<AllRole>([])
//当前用户已有的职位
let userRole = ref<AllRole>([])
//收集用户信息的响应式数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
//获取form组件实例
let formRef = ref<any>()
onMounted(() => {
  getHasUser()
})
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  const result: useResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code === 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}
const addUser = () => {
  //抽屉显示出来
  drawer.value = true
  //清空数据
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  //清除上一次的错误的提示信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
const updateUser = (row: any) => {
  drawer.value = true
  Object.assign(userParams, row)
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}
const save = async () => {
  const result: any = await reqAddOrUpdateUser(userParams)
  if (result.code === 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    // 获取最新的全部账号的信息
    // getHasUser(userParams.id ? pageNo.value : 1)
    //浏览器自动刷新一次
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新成功' : '添加成功',
    })
  }
}
const cancel = () => {
  drawer.value = false
}
//校验用户名字回调函数
const validatorUsername = (rule: any, value: any, callBack: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户名字至少五位'))
  }
}
//校验用户名字回调函数
const validatorname = (rule: any, value: any, callBack: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户昵称至少五位'))
  }
}
const validatorPassword = (rule: any, value: any, callBack: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 6) {
    callBack()
  } else {
    callBack(new Error('用户密码至少六位'))
  }
}
//表单校验的规则对象
const rules = {
  //用户名字
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  //用户昵称
  name: [{ required: true, trigger: 'blur', validator: validatorname }],
  //用户的密码
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}
//分配角色按钮的回调
const setRole = async (row: User) => {
  //存储已有的用户信息
  Object.assign(userParams, row)
  //获取全部的职位的数据与当前用户已有的职位的数据
  let result: AllRoleResponseData = await reqAllRole(userParams.id as number)
  if (result.code == 200) {
    //存储全部的职位
    allRole.value = result.data.allRolesList
    //存储当前用户已有的职位
    userRole.value = result.data.assignRoles
    //抽屉显示出来
    drawer1.value = true
  }
}

//收集顶部复选框全选数据
const checkAll = ref<boolean>(false)
//控制顶部全选复选框不确定的样式
const isIndeterminate = ref<boolean>(true)
//顶部的全部复选框的change事件
const handleCheckAllChange = (val: boolean) => {
  //val:true(全选)|false(没有全选)
  userRole.value = val ? allRole.value : []
  //不确定的样式(确定样式)
  isIndeterminate.value = false
}
//顶部全部的复选框的change事件
const handleCheckedCitiesChange = (value: string[]) => {
  //顶部复选框的勾选数据
  //代表:勾选上的项目个数与全部的职位个数相等，顶部的复选框勾选上
  checkAll.value = value.length === allRole.value.length
  //不确定的样式
  isIndeterminate.value = value.length !== allRole.value.length
}
//确定按钮的回调(分配职位)
const confirmClick = async () => {
  //收集参数
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => {
      return item.id as number
    }),
  }
  //分配用户的职位
  let result: any = await reqSetUserRole(data)
  if (result.code == 200) {
    //提示信息
    ElMessage({ type: 'success', message: '分配职务成功' })
    //关闭抽屉
    drawer1.value = false
    //获取更新完毕用户的信息,更新完毕留在当前页
    getHasUser(pageNo.value)
  }
}
//删除某一个用户
const deleteUser = async (userId: number) => {
  let result: any = await reqRemoveUser(userId)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}

//准备一个数组存储批量删除的用户的ID
let selectIdArr = ref<User[]>([])
//table复选框勾选的时候会触发的事件
const selectChange = (value: any) => {
  selectIdArr.value = value
}
//批量删除按钮的回调
const deleteSelectUser = async () => {
  //整理批量删除的参数
  let idsList: any = selectIdArr.value.map((item) => {
    return item.id
  })
  //批量删除的请求
  let result: any = await reqSelectUser(idsList)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}
//搜索按钮的回调
const search = () => {
  //根据关键字获取相应的用户数据
  getHasUser()
  //清空关键字
  keyword.value = ''
}
//重置按钮
import useLayOutSettingStore from '@/store/modules/setting.ts'
const settingStore = useLayOutSettingStore()
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
</script>
<style lang="scss" scoped>
.user_search {
  display: flex;
  justify-content: space-between;
}
</style>

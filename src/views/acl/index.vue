<template>
  <div>
    <el-card>
      <el-form>
        <el-form-item label="用户名">
          <el-input placeholder="请输入搜索用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary">添加用户</el-button>
      <el-button type="primary">批量删除</el-button>
      <el-table border>
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center"></el-table-column>
        <el-table-column label="#" align="center"></el-table-column>
        <el-table-column label="#" align="center"></el-table-column>
        <el-table-column label="#" align="center"></el-table-column>
        <el-table-column label="#" align="center"></el-table-column>
        <el-table-column label="#" align="center"></el-table-column>
        <el-table-column label="#" align="center"></el-table-column>
        <el-table-column label="#" align="center"></el-table-column>
      </el-table>
      <el-pagination
        total="10"
        current-page="1"
        page-size="3"
        @current-change="changePage"
        layout="prev, pager, next, jumper, ->, total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
const changePage = (page: number) => {
  console.log(page)
}
</script>
<style lang="scss" scoped></style>

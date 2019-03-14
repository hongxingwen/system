<template>
  <div class="comp__sidebar">
    <div class="comp__sidebar">
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-vertical-demo"
        router
      >
        <template v-for="(item) in menuList">
          <el-submenu
            v-if="item.children.length > 0"
            :index="item.resId"
            :key="item.resId"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.resName}}</span>
            </template>
            <el-menu-item-group
              v-for="child in item.children"
              :key="child.resId"
            >
              <el-menu-item
                :route="child.butRule"
                :index="child.butRule"
              >{{child.resName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item
            :index="item.butRule"
            :route="item.butRule"
            v-else
            :key="item.resId"
          >
            <i class="el-icon-location"></i>
            <span>{{item.resName}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
import menuList from '../model/menu'
export default {
  created() {
    // console.log('this.$parents.routerFlag', this.$parent.routerFlag)
    // this.init()
  },
  data() {
    return {
      menuList
    }
  },
  methods: {
    // init() {
    // }
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath)
    // }
  }
}
</script>

<style lang="scss">
.comp__sidebar,
.comp__sidebar--menu {
  height: 100%;
  width: 200px;
  background: #eee;
}

.comp__sidebar {
  position: absolute;
  top: 0;
  left: 0;
}

.comp__sidebar--menu {
}
</style>

<template>
  <div class="topbarContent">
    <el-row>
      <el-col :span="18">
        <div class="menuContent">
          <el-dropdown>
            <img :src="titleImg" width="60" height="60" class="el-img">
            <span class="el-dropdown-link">
              {{ proIndex.name }}<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a class="projectSetting">项目设置</a></el-dropdown-item>
              <el-dropdown-item>创建</el-dropdown-item>
              <el-dropdown-item>导入</el-dropdown-item>
              <el-dropdown-item>所有项目</el-dropdown-item>
              <el-divider />
              <el-dropdown-item><a class="projectSetting">我的项目</a></el-dropdown-item>
              <el-dropdown-item @click.native="toLayout('项目1','项目','Dashboard')">项目1</el-dropdown-item>
              <el-dropdown-item @click.native="toLayout('项目2','项目','Dashboard')">项目2</el-dropdown-item>
              <el-divider />
              <el-dropdown-item><a class="projectSetting">团队设置</a></el-dropdown-item>
              <el-dropdown-item>创建</el-dropdown-item>
              <el-dropdown-item>导入</el-dropdown-item>
              <el-dropdown-item>所有团队</el-dropdown-item>
              <el-divider />
              <el-dropdown-item><a class="projectSetting">我的团队</a></el-dropdown-item>
              <el-dropdown-item @click.native="toLayout('团队1','团队','Bug')">团队1</el-dropdown-item>
              <el-dropdown-item @click.native="toLayout('团队2','团队','Bug')">团队2</el-dropdown-item>
              <el-divider />
              <el-dropdown-item><a class="projectSetting">系统设置</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- menu切换 -->
          <div>
            <el-menu v-if="currentType==='项目'" :default-active="'dashboard'" class="el-menu" mode="horizontal" @select="handleSelect">
              <el-menu-item index="dashboard">Dashboard</el-menu-item>
              <el-menu-item index="backlogs">Backlogs</el-menu-item>
              <el-menu-item index="planning">Planning</el-menu-item>
              <el-menu-item index="taskBoard">TaskBoard</el-menu-item>
              <el-menu-item index="features">Features</el-menu-item>
            </el-menu>
            <el-menu v-if="currentType==='团队'" :default-active="'backlogs'" class="el-menu" mode="horizontal" @select="handleSelect">
              <el-menu-item index="backlogs">backlogs</el-menu-item>
              <el-menu-item index="planning">planning</el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right-menu">
          <!-- 搜索框 -->
          <search id="header-search" class="right-menu-item" />
          <!-- 消息通知 -->
          <HeaderNotice class="action" />
          <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="avatar-wrapper">
              <div class="block"><el-avatar :size="30" :src="circleUrl" /></div>
              <span>{{ this.$store.getters.userInfo.realName }}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span style="display:block;">控制台</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span style="display:block;">个人信息</span>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">
                <span style="display:block;">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import titleImg from '@/assets/low-code.png'
import HeaderNotice from './headerNotice'
import Search from '@/components/HeaderSearch'
export default {
  components: {
    Search,
    HeaderNotice
  },
  data() {
    return {
      titleImg: titleImg,
      proIndex: {},
      currentType: '',
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$emit('changeCurrentMenu', key)
    },
    // 跳转到对应项目
    toLayout(name, type, title) {
      this.$emit('changeUrl', name, type)
      this.currentType = type
      this.proIndex = {
        name,
        type
      }
    },
    // 系统登出
    async logout() {
      await this.$store.dispatch('user/logout')
      // 退出到登录页
      this.$router.push(`/`)
    }
  }

}
</script>

<style lang="scss" scoped>
 .topbarContent{
     .menuContent{
       display: flex;
     }
     .el-dropdown{
       display: inline-flex;
       cursor: pointer;
     }
     .el-dropdown-link{
       line-height: 60px;
     }
     .el-img{
         padding:8px;
         margin-left:10px;
     }
      .el-menu{
      margin-left:30px;
      border-bottom:none !important;
      .el-menu--horizontal{
        border-bottom:none !important;
      }
  }

  .right-menu {
    display: flex;
    float: right;
    height: 100%;
    line-height: 43px;
    .svg-icon{
      margin-top:16px;
    }
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-flex;
      padding: 0 8px;
      height: 100%;
      font-size: 16px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        // &:hover {
        //   background: rgba(0, 0, 0, .025)
        // }
      }
    }

    .avatar-container {
      margin-right: 20px;
      width:102x;
      .avatar-wrapper {
        display: flex;
        margin-top: 5px;
        position: relative;
         .block{
          line-height: 54px;
          margin-right: 8px;
         }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
 }
 .el-dropdown-menu{
   width: 150px;
     .projectSetting{
       color:#111;
       font-weight:400;
     }
     .el-divider--horizontal{
       margin:3px 0px;
     }
 }
</style>

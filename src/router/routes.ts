export const constantRoute = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/layout/Index.vue'),
    redirect: '/overview',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    children: [
      {
        path: '/overview',
        name: 'Overview',
        component: () => import('@/views/overview/Index.vue'),
        meta: {
          title: '总览',
          hidden: false,
          icon: 'el-icon-menu',
        },
      },
    ],
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/layout/Index.vue'),
    meta: {
      title: '用户管理',
      hidden: false,
      icon: 'el-icon-s-tools',
    },
    children: [
      {
        path: '/user/user-management',
        name: 'UserManagement',
        component: () => import('@/views/user-management/UserManagement.vue'),
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'el-icon-s-tools',
        },
      },
    ],
  },
  {
    path: '/sys',
    name: 'System',
    component: () => import('@/views/layout/Index.vue'),
    meta: {
      title: '系统管理',
      hidden: false,
      icon: 'el-icon-s-tools',
    },
    children: [
      {
        path: '/auth/permission-assignment',
        name: 'PermissionAssignment',
        redirect: '',
        meta: {
          title: '权限管理',
          hidden: false,
          icon: 'el-icon-user',
        },
        children: [
          {
            path: '/sys/permission-list',
            name: 'PermissionList',
            component: () =>
              import(
                '@/views/system-management/authority-management/PermissionList.vue'
              ),
            meta: {
              title: '权限列表',
              hidden: false,
              icon: 'el-icon-camera',
            },
          },
          {
            path: '/sys/permission-assignment',
            name: 'PermissionAssignment',
            component: () =>
              import(
                '@/views/system-management/authority-management/PermissionAssignment.vue'
              ),
            meta: {
              title: '权限分配',
              hidden: false,
              icon: 'el-icon-camera',
            },
          },
        ],
      },
      {
        path: '/sys/system-log',
        name: 'SystemLog',
        component: () => import('@/views/system-management/SystemLog.vue'),
        meta: {
          title: '操作日志',
          hidden: false,
          icon: 'el-icon-camera',
        },
      },
      {
        path: '/sys/update-pwd',
        name: 'UpdatePwd',
        component: () => import('@/views/system-management/UpdatePwd.vue'),
        meta: {
          title: '修改密码',
          hidden: false,
          icon: 'el-icon-edit-outline',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Index.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/Index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: 'any',
      hidden: true,
    },
  },
]

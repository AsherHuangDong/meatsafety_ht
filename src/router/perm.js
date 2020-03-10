export const perm = {
  path: '/permManager',
  name: 'permManager',
  title: '权限管理',
  component: () => import("../components/page/perm/permManager"),
  children: [
    {
      path: '/roleManager',
      name: 'roleManager',
      component: () => import("../components/page/perm/roleManager"),
      meta: { title: '角色管理' }
    },
    {
      path: '/roleAdd',
      name: 'roleAdd',
      component: () => import("../components/page/perm/roleAdd"),
      meta: { title: '角色添加' }
    },
    {
      path: '/roleEdit',
      name: 'roleEdit',
      component: () => import("../components/page/perm/roleEdit"),
      meta: { title: '角色编辑' }
    },
    {
      path: '/staffManager',
      name: 'staffManager',
      component: () => import("../components/page/perm/staffManager"),
      meta: { title: '人员管理' }
    },
    {
      path: '/staffAdd',
      name: 'staffAdd',
      component: () => import("../components/page/perm/staffAdd"),
      meta: { title: '人员添加' }
    },
    {
      path: '/staffEdit',
      name: 'staffEdit',
      component: () => import("../components/page/perm/staffEdit"),
      meta: { title: '人员编辑' }
    }
  ]
};


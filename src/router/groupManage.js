export const groupmanage = {
  path: '/groupmanage',
  name: 'groupmanage',
  title: '小组管理',
  component: () => import("../components/page/groupManage/index"),
  children: [
    {
      path: '/grouplist',
      name: 'grouplist',
      component: () => import("../components/page/groupManage/groupList"),
      meta: { title: '小组管理' },
      children: [
        {
          path: '/groupdetail',
          name: 'groupdetail',
          component: () => import("../components/page/groupManage/groupDetail"),
        }
      ]
    }
  ]
};

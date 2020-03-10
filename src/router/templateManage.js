export const templatemanage = {
  path: '/templatemanage',
  name: 'templatemanage',
  title: '模板管理',
  component: () => import("../components/page/templateManage/index"),
  children: [
    {
      path: '/kindmanage',
      name: 'kindmanage',
      component: () => import("../components/page/templateManage/kindManage"),
      meta: { title: '分类管理' },
      children: [
        {
          path: '/kindadd',
          name: 'kindadd',
          component: () => import("../components/page/templateManage/kindAdd"),
        },
        {
          path: '/kindedit',
          name: 'kindedit',
          component: () => import("../components/page/templateManage/kindEdit"),
        },
        {
          path: '/kindchildadd',
          name: 'kindchildadd',
          component: () => import("../components/page/templateManage/kindChildAdd"),
        },
        {
          path: '/kindchildedit',
          name: 'kindchildedit',
          component: () => import("../components/page/templateManage/kindChildEdit"),
        }
      ]
    },
    {
      path: '/targetlist',
      name: 'targetlist',
      component: () => import("../components/page/templateManage/targetList"),
      meta: { title: '指标列表' },
      children: [
        {
          path: '/targetadd',
          name: 'targetadd',
          component: () => import("../components/page/templateManage/targetAdd"),
        },
        {
          path: '/targetedit',
          name: 'targetedit',
          component: () => import("../components/page/templateManage/targetEdit"),
        }
      ]
    }
  ]
};

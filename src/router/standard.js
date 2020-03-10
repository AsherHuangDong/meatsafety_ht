export const standard = {
    path: '/standard',
    name: 'standard',
    title: '国家法规',
    component: () => import("../components/page/standard/index"),
    children: [
      {
        path: '/standardList',
        name: 'standardList',
        component: () => import("../components/page/standard/standardList"),
        meta: { title: '标准法规' },
      },
      {
        path: '/standardAdd',
        name: 'standardAdd',
        component: () => import("../components/page/standard/standardAdd"),
        meta: { title: '添加标准' },
      },
      {
        path: '/standardEdit',
        name: 'standardEdit',
        component: () => import("../components/page/standard/standardEdit"),
        meta: { title: '编辑标准' },
      },
      {
        path: '/standardDetail',
        name: 'standardDetail',
        component: () => import("../components/page/standard/standardDetail"),
        meta: { title: '标准详情' },
      }
    ]
  };
  
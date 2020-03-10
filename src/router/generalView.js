export const generalview = {
    path: '/generalview',
    name: 'generalview',
    title: '概览',
    component: () => import("../components/page/generalView/index"),
    children: [
      {
        path: '/generalviewshow',
        name: 'generalviewshow',
        component: () => import("../components/page/generalView/generalViewShow"),
        meta: { title: '概览' },
      },
      {
        path: '/downloadrecords',
        name: 'downloadrecords',
        component: () => import("../components/page/generalView/downLoadRecords"),
        meta: { title: '下载记录' },
      }
    ]
  };
  
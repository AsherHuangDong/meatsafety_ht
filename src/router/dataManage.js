export const datamanage = {
    path: '/datamanage',
    name: 'datamanage',
    title: '数据管理',
    component: () => import("../components/page/dataManage/index"),
    children: [
      {
        path: '/literaturedata',
        name: 'literaturedata',
        component: () => import("../components/page/dataManage/literatureData"),
        meta: { title: '文献数据' },
        children:[
          {
            path:'/uploadfile',
            name:'uploadfile',
            component: () => import("../components/page/dataManage/upLoadFile"),
            meta: { title: '上传数据' },
          },
          {
            path:'/uploadfileedit',
            name:'uploadfileedit',
            component: () => import("../components/page/dataManage/upLoadFileEdit"),
            meta: { title: '修改数据' },
          }
        ]
      },
      {
        path:'/handupload',
        name:'handupload',
        component: () => import("../components/page/dataManage/handUpLoad"),
        meta: { title: '手动上传' },
      },
      {
        path: '/filleddata',
        name: 'filleddata',
        component: () => import("../components/page/dataManage/filledData"),
        meta: { title: '填报数据' },
      }
    ]
  };
  
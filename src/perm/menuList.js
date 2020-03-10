const menuList = function () {
  return [
    {
      path: '/generalviewshow',
      name: 'generalviewshow',
      permId: 1,
      show: false,
      title: "概览"
    },
    {
      path: '/usermanageshow',
      name: 'usermanageshow',
      permId: 2,
      show: false,
      title: "用户管理"
    },
    {
      path: '/grouplist',
      name: 'grouplist',
      permId: 3,
      show: false,
      title: "小组管理"
    },
    {
      path: '/noticelist',
      name: 'noticelist',
      permId: 4,
      show: false,
      title: "公告通知"
    },
    {
      path: '/standardList',
      name: 'standardList',
      permId: 8,
      show: false,
      title: "标准法规"
    },
    {
      path: '/datamanage',
      name: 'datamanage',
      permId: 7,
      show: false,
      title: "数据管理",
      children: [
        {
          path: '/literaturedata',
          name: 'literaturedata',
          permId: 5,
          show: false,
          title: "文献管理",
        },
        {
          path: '/filleddata',
          name: 'filleddata',
          permId: 6,
          show: false,
          title: "填报管理"
        }
      ]
    },
    {
      path: '/templatemanage',
      name: 'templatemanage',
      permId: 10,
      show: false,
      title: "模板管理",
      children: [
        {
          path: '/kindmanage',
          name: 'kindmanage',
          permId: 8,
          show: false,
          title: "分类管理",
        },
        {
          path: '/targetlist',
          name: 'targetlist',
          permId: 9,
          show: false,
          title: "指标列表"
        }
      ]
    },
    {
      path: '/permManager',
      name: 'permManager',
      permId: 13,
      show: false,
      title: "权限管理",
      children: [
        {
          path: '/roleManager',
          name: 'roleManager',
          permId: 12,
          show: false,
          title: "角色管理",
        },
        {
          path: '/staffManager',
          name: 'staffManager',
          permId: 11,
          show: false,
          title: "人员管理"
        }
      ]
    },
    {
      path: '/numberrangelist',
      name: 'numberrangelist',
      permId: 14,
      show: false,
      title: "设置"
    },
  ]
};

export default menuList;

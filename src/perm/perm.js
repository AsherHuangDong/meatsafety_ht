const permListConstruct = function () {
  return [
    {
      permValue: "/generalviewshow",
      permId: 1,
      checked: false,
      title: "概览"
    },
    {
      permValue: "/usermanageshow",
      permId: 2,
      checked: false,
      title: "用户管理"
    },
    {
      permValue: "/grouplist",
      permId: 3,
      checked: false,
      title: "小组管理"
    },
    {
      permValue: "/noticelist",
      permId: 4,
      checked: false,
      title: "公告通知"
    },
    {
      children: [
        {
          permValue: "/literaturedata",
          permId: 5,
          checked: false,
          title: "文献管理"
        },
        {
          permValue: "/filleddata",
          permId: 6,
          checked: false,
          title: "填报管理"
        }
      ],
      permValue: "/datamanage",
      permId: 7,
      checked: false,
      title: "数据管理"
    },
    {
      children: [
        {
          permValue: "/kindmanage",
          permId: 8,
          checked: false,
          title: "分类管理"
        },
        {
          permValue: "/targetlist",
          permId: 9,
          checked: false,
          title: "指标管理"
        }
      ],
      permValue: "/templatemanage",
      permId: 10,
      checked: false,
      title: "模板管理"
    },
    {
      children: [
        {
          permValue: "/staffManager",
          permId: 11,
          checked: false,
          title: "人员管理"
        },
        {
          permValue: "/roleManager",
          permId: 12,
          checked: false,
          title: "角色管理"
        }
      ],
      permValue: "/permManager",
      permId: 13,
      checked: false,
      title: "权限管理"
    },
    {
      permValue: "/numberrangelist",
      permId: 14,
      checked: false,
      title: "设置"
    }
  ];
};
export default permListConstruct

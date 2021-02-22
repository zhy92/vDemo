const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "getAllStandList_supervision"
  }
  // {
  //   flag: "clear",
  //   size: "",
  //   icon: "",
  //   label: "清除",
  //   styleType: "primary"
  // }
];
const searchFormItems = [
  {
    type: "select",
    label: "市县",
    width: "100px",
    multiple: false,
    placeHolder: "请选择",
    filterable: true,
    name: "city",
    data: [
      {
        value: "1",
        label: "杭州市"
      },
      {
        value: "2",
        label: "宁波市"
      }
    ],
    span: 8
  },
  {
    type: "date",
    label: "专项编号",
    name: "issueNo",
    span: 8,
    dateType: "year"
  },
  {
    type: "date",
    label: "落实日期",
    name: "reportDate",
    span: 8,
    dateType: "daterange",
    dateRangeSeparator: "至",
    dateStartPlaceholder: "开始日期",
    dateEndPlaceholder: "结束日期",
    format: "yyyy-MM-dd",
    valueFormat: "yyyy-MM-dd"
  },
  {
    type: "select",
    label: "年度考核任务",
    width: "100px",
    multiple: false,
    placeHolder: "请选择",
    filterable: true,
    name: "assessmentTargetTask",
    data: [
      {
        value: "1",
        label: "1.耕地保有量；基本农田保护"
      },
      {
        value: "2",
        label: "2.耕地质量保护与提升；耕地质量监测网络"
      },
      {
        value: "3",
        label: "3.耕地质量等级情况"
      },
      {
        value: "4",
        label: "4.粮食生产科技水平"
      },
      {
        value: "5",
        label: "5.粮食种植面积；粮食总产量"
      },
      {
        value: "6",
        label: "6.产粮大县等粮食核心产区和育制种大县建设"
      },
      {
        value: "7",
        label: "7.高标准农田建设"
      },
      {
        value: "8",
        label: "8-1农田水利设施建设；农业节水重大工程建设"
      },
      {
        value: "9",
        label: "8-2农田水利设施建设；农业节水重大工程建设"
      },
      {
        value: "10",
        label: "8-3农田水利设施建设；农业节水重大工程建设"
      },
      {
        value: "11",
        label: "9.落实粮食补贴政策"
      },
      {
        value: "12",
        label: "10.培育新型粮食生产经营主体及社会化服务体系"
      },
      {
        value: "13",
        label: "11.执行收购政策；安排收购网点"
      },
      {
        value: "14",
        label: "12.组织落实收购资金"
      },
      {
        value: "15",
        label: "13.仓储物流设施建设"
      },
      {
        value: "16",
        label: "14-1仓储设施维修改造升级"
      },
      {
        value: "17",
        label: "14-2仓储设施维修改造升级"
      },
      {
        value: "18",
        label: "14-3仓储设施维修改造升级"
      },
      {
        value: "19",
        label: "14-4仓储设施维修改造升级"
      },
      {
        value: "20",
        label: "15.落实国有粮食仓储物流设施保护制度"
      },
      {
        value: "21",
        label: "16.落实地方粮食储备；完善轮换管理和库存监管机制"
      },
      {
        value: "22",
        label: "17.落实储备费用、利息补贴和轮换补贴"
      },
      {
        value: "23",
        label:
          "18.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备"
      },
      {
        value: "24",
        label: "19.维护粮食市场秩序，确保粮食市场基本稳定"
      },
      {
        value: "25",
        label: "20.落实粮食流通统计制度；加强粮食市场监测，及时发布粮食市场信息"
      },
      {
        value: "26",
        label:
          "21.深化国有粮食企业改革；发展混合所有制粮食经济；培育主食产业化龙头企业"
      },
      {
        value: "27",
        label: "22.耕地土壤污染防治"
      },
      {
        value: "28",
        label: "23.粮食生产禁止区划定"
      },
      {
        value: "29",
        label:
          "24-1严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制"
      },
      {
        value: "30",
        label:
          "24-2严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制"
      },
      {
        value: "31",
        label:
          "24-3严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制"
      },
      {
        value: "32",
        label:
          "25.粮食质量安全监管机构及质量监测机构建设；粮食质量安全监管执法装备配备及检验监测业务经费保障；库存粮油质量监管"
      },
      {
        value: "33",
        label: "26.非产区及时足额安排粮食风险基金；粮食风险基金使用管理"
      },
      {
        value: "34",
        label:
          "27-1保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制"
      },
      {
        value: "35",
        label:
          "27-2保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制"
      },
      {
        value: "36",
        label:
          "27-3保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制"
      }
    ],
    span: 8
  }
];
export { searchFormBtns, searchFormItems };

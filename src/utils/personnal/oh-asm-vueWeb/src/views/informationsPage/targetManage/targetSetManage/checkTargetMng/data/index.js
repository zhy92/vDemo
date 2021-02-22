// table上方操作按钮
// import operateButtons from "@/utils/formSettingsJson/informationsPage/targetSetManage/operateButtons";
import operateButtons from "@/utils/formSettingsJson/operateButton/targetManage/checkTargetMng/operateButtonSettings.js";
// table表头信息设置
import {
  schemeTableHeader,
  quoteSchemeTableHeader,
  quoteSchemeDetailTableHeader,
  schemeDetailTableHeader
} from "@/utils/formSettingsJson/table/targetManage/checkTargetMng/tableHeaderSettings.js";
// table表头信息设置
import tableHeader from "@/utils/formSettingsJson/systemSetting/targetSetManage/table/tableHeader.json";
// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/targetManage/checkTargetMng/searchSettings.js";
// 弹框设置
import {
  schemeContentItems,
  addSchemeContentButton,
  editSchemeContentButton,
  kpiContentItems,
  schemeInsideKpiContent,
  addKpiItemButton,
  editKpiItemButton,
  dataSetContentItems,
  dataSetContentButton,
  processId,
  consultDateContentItems,
  consultDateContentButton,
  selfEvaluationContentItems,
  departmentEvaluationContentItems,
  schemePlanButton,
  editSchemePlanButton,
  evaluationContentButton,
  spotCheckContentItems,
  spotCheckContentButton,
  editPhasesButton,
  schemeMessageItems,
  consulteMessageItems,
  schemeTotalScore,
  dataItems,
  addDataItemButton
} from "@/utils/formSettingsJson/dialog/targetManage/checkTargetMng/dialogSettings.js";
import {
  schemeFormItem,
  assignCityItem,
  assignKpiButton
} from "@/utils/formSettingsJson/dialog/common/dialogSettings.js";
// 校验规则
import schemeSetRule from "@/utils/formRulesJson/targetSetManage/targetSetRule";
const data = function(vm) {
  let obj = {
    // 页面类型
    pageType: "",
    // 数据项设定
    dataSetContentButton: dataSetContentButton,
    dataSetContentItems: dataSetContentItems,
    // 特殊项数据保存
    specialSettingValue: null,
    // 搜索栏
    searchFormItemsData: searchFormItems,
    searchFormBtns: searchFormBtns,
    // 搜索栏
    searchFormItems: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {},
      // formGroupValues: {
      //   issueNo: (new Date().getFullYear() + 3).toString()
      // },
      formButtonList: searchFormBtns
    },
    showSearchForm: true,
    // table上方操作按钮
    operateButtons: operateButtons,
    // operateButtons 按钮组配置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtons
    },
    /**
     *  考核方案
     */
    // 添加考核方案的类型， 分新增和引用
    addSchemeType: "add",
    schemeContentItems: schemeContentItems,
    addSchemeContentButton: addSchemeContentButton,
    editSchemeContentButton: editSchemeContentButton,
    // 新增考核方案弹框
    schemeOperateDialog: {
      dialogVisible: false,
      dialogName: "",
      formButtonList: []
    },
    schemeFormOperateSettings: {
      fullScreen: true,
      formGroupList: schemeContentItems,
      formGroupValues: {},
      formButtonList: [],
      rules: schemeSetRule
    },
    schemeTreeOperateSettings: {
      // 菜单树 设置
      treeData: [],
      expandAll: false,
      nodeKey: "id",
      nodeExpand: false,
      defaultProps: {
        children: "children",
        label: "text"
      },
      treeWithCheckbox: true,
      checkedTreeData: [],
      treeButtons: []
    },
    /**
     * 新增 编辑指标的配置项
     */
    // 当前方案的机构id
    assessOrgId: "",
    kpiContentItems: kpiContentItems,
    schemeInsideKpiContent: schemeInsideKpiContent,
    // 新增编辑方案 时候，新增指标用到的方案id
    schemeId: "",
    // 新增编辑方案 时候，编辑指标用到的数据
    editKpiData: null,
    addKpiItemButton: addKpiItemButton,
    editKpiItemButton: editKpiItemButton,
    // 分配
    schemeFormItem: schemeFormItem,
    assignCityItem: assignCityItem,
    assignKpiButton: assignKpiButton,
    // 过程id
    processId: processId,
    // 开始征询时间设置
    consultDateContentItems: consultDateContentItems,
    consultDateContentButton: consultDateContentButton,
    // 开启自评
    selfEvaluationContentItems: selfEvaluationContentItems,
    evaluationContentButton: evaluationContentButton,
    // 部门评审
    departmentEvaluationContentItems: departmentEvaluationContentItems,
    // 方案计划按钮
    schemePlanButton: schemePlanButton,
    editSchemePlanButton: editSchemePlanButton,
    // 抽查
    spotCheckContentItems: spotCheckContentItems,
    spotCheckContentButton: spotCheckContentButton,
    // 编辑
    editPhasesButton: editPhasesButton,
    // 方案详情
    schemeMessageItems: schemeMessageItems,
    // 征询详情
    consulteMessageItems: consulteMessageItems,
    // 最终得分
    schemeTotalScore: schemeTotalScore,
    // 当前流程节点
    processinstStatus: "",
    //  公用弹框
    dialogFormBlockSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogType: "formBlocks",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: schemeSetRule
      }
    },
    // 数据项
    dataItems: dataItems,
    addDataItemButton: addDataItemButton,
    // 指标库里面的数据项
    allTargetParams: [],
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogType: "form",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: schemeSetRule
      }
    },
    // 新增编辑 方案下一步的表格
    schemeTableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: tableHeader,
        treeProps: {
          children: "children",
          hasChildren: "hasChildren"
        }
      }
    },
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: schemeTableHeader,
        treeProps: {
          children: "children",
          hasChildren: "hasChildren"
        }
      }
    },
    // 表格
    quoteSchemeTableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        isMultipleTable: true,
        headerOptions: quoteSchemeTableHeader
      }
    },
    // 选中方案的id
    selectSchemeId: [],
    quoteSchemePaginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 引用方案详情弹框
    quoteSchemeDetailDialog: {
      dialogVisible: false,
      dialogName: "详情",
      formButtonList: [
        {
          flag: "cancel",
          size: "",
          icon: "",
          label: "关闭",
          styleType: "",
          postUrl: ""
        }
      ]
    },
    // 方案详情表格
    quoteSchemeDetailTableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: quoteSchemeDetailTableHeader
      }
    },
    /**
     *  考核方案详情弹框
     */
    schemeDetailDialog: {
      dialogVisible: false,
      dialogName: "方案详情",
      formButtonList: [
        {
          flag: "cancel",
          size: "",
          icon: "",
          label: "关闭",
          styleType: "",
          postUrl: ""
        }
      ]
    },
    schemeDetailFormSettings: {
      fullScreen: true,
      formGroupList: [],
      formGroupValues: {},
      formButtonList: []
    },
    schemeDetailTableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        headerOptions: schemeDetailTableHeader
      }
    }
  };
  return obj;
};
export default data;

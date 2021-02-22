const methods = {
  /**
   * 获取方案
   */
  getSchemeList() {
    return new Promise(reslove => {
      let schemeParams = {
        assessedOrgId: this.$store.getters["user/userInfos"].assess,
        assessType: this.pageType,
        running: true
      };
      this.$getData(this.$api.getSchemeSelect, schemeParams).then(res => {
        reslove(res);
      });
    });
  },
  /**
   * 搜索
   */
  setSearchFormData() {
    this.searchSettings.formGroupList = this.$globalFnc.deepCopy(
      this.searchFormItems
    );
    // 方案下拉赋值
    this.getSchemeList().then(res => {
      if (res && res.length) {
        this.searchSettings.formGroupList.forEach(item => {
          if (item.name === "asmSchemeId") {
            item.data = this.$globalFnc.arrayToFormDropdown(
              res,
              "name",
              "asmSchemeId"
            );
          }
        });
        // 默认第一条方案
        this.searchSettings.formGroupValues.asmSchemeId = res[0].asmSchemeId;
        // 获取被考核市县
        this.handleLinkSelect("scheme", res[0].asmSchemeId);
        // 获取列表数据
        this.initPageData();
      }
    });
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    if (data.flag === "closeSearch") {
      this.showSearchForm = !this.showSearchForm;
      if (this.showSearchForm) {
        data.label = "隐藏查询";
      } else {
        data.label = "显示查询";
      }
    }
  },
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn(
      { postUrl: "departmentEvaluationList" },
      defaultdatas
    );
  },
  handleSearchFormBtn(btns, formData) {
    this.tableSettings.tableDatas = [];
    if (btns.flag === "search") {
      this.paginationSettings.currentPage = 1;
    }
    if (btns.flag === "clear") {
      this.paginationSettings.currentPage = 1;
      formData = {};
      this.searchSettings.formGroupValues = {};
    }
    if (!formData.asmSchemeId) {
      this.$message.error("需选择考核方案");
      return;
    }
    let options = {
      vm: this
    };
    let params = {
      page: this.paginationSettings.currentPage,
      row: this.$global.paginationOption.numberPerpage,
      code: this.pageType
    };
    Object.assign(formData, params);
    this.$searchformBtnAction(btns, formData, options).then(data => {
      this.setTableList(data);
    });
  },
  setTableList(data) {
    let departmentList = this.$globalFnc.deepCopy(data.rows);
    let propObject = {
      name: "operateBtns",
      porpvalue: [
        {
          text: "查看",
          type: "lookDetail",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-search",
          isIcon: true
        }
      ]
    };
    this.formatData(departmentList, propObject);
    this.tableSettings.tableDatas = departmentList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      /**
       * 值修改
       */
      /**
       * 自评信息
       */
      if (item.selfAssess && item["selfAssess"].shemeAssessKpi) {
        for (let key in item["selfAssess"].shemeAssessKpi) {
          item["self_" + key] = item["selfAssess"]["shemeAssessKpi"][key];
        }
      }
      // 状态
      if (item.assess && item.assess["status"] == "1") {
        // 如果状态是1 说明是已经上报
        item["status"] = "reported";
      } else {
        if (item.higherAssess && item["higherAssess"].shemeAssessKpi) {
          // 有自评信息，说明已完成评分
          item["status"] = "complete";
        } else {
          item["status"] = "incomplete";
        }
      }
      /**
       * 部门打分信息
       */
      if (item.higherAssess && item["higherAssess"].shemeAssessKpi) {
        for (let key in item["higherAssess"].shemeAssessKpi) {
          item["department_" + key] =
            item["higherAssess"]["shemeAssessKpi"][key];
        }
      }
      // 被考核机构
      if (item.assessdOrg) {
        item["assessdOrgName"] = item.assessdOrg.orgname.replace(/考核办/g, "");
        // 市县
        item["district"] = item.assessdOrg.district;
      }
      // 方案信息
      if (item.scheme) {
        item.issueNo = item["scheme"].issueNo;
        item.schemeName = item["scheme"].name;
      }
      // 方案指标信息
      if (item.schemeKpi) {
        item.asmSchemeKpiId = item["schemeKpi"].asmSchemeKpiId;
      }
      // 方案流程信息
      if (item.assess) {
        item.asmShemeAssessId = item["assess"].asmShemeAssessId;
      }
      if (item.kpi) {
        item["asmKpiId"] = item.kpi.asmKpiId;
        item["kpiName"] = item.kpi.name;
        item["criteria"] = item.kpi.criteria;
        item["kpiScore"] = item.kpi.score;
        item["asmKpiIndexId"] = item.kpi.asmKpiIndexId;
      }
      //被考核牵头部门
      if (item.assessdManageAssign) {
        item["assessedCityMOrgId__dsp"] =
          item.assessdManageAssign.assessedOrgId__dsp;
        item["assessedCityMOrgId"] = item.assessdManageAssign.assessedOrgId;
      }
      //被考核市配合部门
      if (item.assessdCooprateAssign) {
        let nameList = [];
        let valueList = [];
        item.assessdCooprateAssign.forEach(cooprate => {
          nameList.push(cooprate.assessedOrgId__dsp);
          valueList.push(cooprate.assessedOrgId);
        });

        item["assessedCityCOrgId__dsp"] = nameList.join();
        item["assessedCityCOrgId"] = valueList;
      }
      // 考核牵头部门
      if (item.assessManageAssign) {
        item["assessManageOrgId"] = item.assessManageAssign.assessedOrgId;
      }
      // 责任处室
      if (item.assessMOassigns) {
        let nameList = [];
        let valueList = [];
        item.assessMOassigns.forEach(cooprate => {
          nameList.push(cooprate.assessedOrgId__dsp);
          valueList.push(cooprate.assessedOrgId);
        });
        item["assessMOassigns__dsp"] = nameList.join();
        item["assessdMOassignsId"] = valueList;
      }
      /**
       * 按钮
       */
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      // 处室不分配
      // 评分状态为0 说明没有提交牵头部门
      if (!item["selfAssess"] || item["assess"]["status"] == "0") {
        if (this.$store.getters["user/userInfos"].orgType !== "OFFICE") {
          item.operateBtns.unshift({
            text: "分配",
            type: "assign",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-set-up",
            isIcon: true
          });
        }
        item.operateBtns.unshift({
          styleType: "primary",
          type: "evaluation",
          text: "评分",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-document-checked",
          isIcon: true
        });
      }
    });
  },
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  /**
   * 表格按钮点击事件
   */
  handleTableRowButton(row, btns) {
    let formGroupList, defaultValues;
    /**
     * 分配责任处室
     */
    if (btns.type === "assign") {
      this.dialogFormSettings.dialogFormTitle = "分配";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.assignKpiButton;
      formGroupList = this.schemeFormItem.concat(
        this.assessdDepartmentMessage,
        this.assignDepartmentManage
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"]
      );
      defaultValues = this.$globalFnc.deepCopy(row);
      // 牵头部门
      if (row["assessdManageAssign"]) {
        defaultValues.manageOrg_MD = row["assessdManageAssign"].assessedOrgId;
      }
      // 配合部门
      if (row["assessdCooprateAssign"] && row["assessdCooprateAssign"].length) {
        defaultValues.cooprateOrgs_CD = row["assessdCooprateAssign"].map(
          item => {
            return item.assessedOrgId;
          }
        );
      }
      if (row["assessMOassigns"] && row["assessMOassigns"].length) {
        // 保存一下编辑前的数据
        defaultValues.old_manageOrg_MO = row["assessMOassigns"]
          .map(item => {
            return item.asmSchemeKpiAssignId;
          })
          .join(",");
        // 回显的数据
        defaultValues.manageOrg_MO = row["assessMOassigns"].map(item => {
          return item.assessedOrgId;
        });
      } else {
        defaultValues.manageOrg_MO = [];
      }
      this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValues;
      this.dialogFormSettings.dialogFormVisible = true;
      return;
    }
    /**
     * 评分
     */
    if (btns.type === "evaluation") {
      this.dialogFormSettings.dialogFormTitle = "部门打分";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.departmentAssessFormBtns;
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(this.departmentAssessFormItems)
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"]
      );
    }
    /**
     * 查看详情
     */
    if (btns.type === "lookDetail") {
      this.dialogFormSettings.dialogFormTitle = "查看";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancle",
          label: "关闭",
          styleType: ""
        }
      ];
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(this.departmentAssessFormItems)
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"],
        "look"
      );
    }
    /**
     * 自评表单默认值
     */
    defaultValues = this.$globalFnc.deepCopy(row);
    // 部门打分默认满分
    defaultValues.department_score = defaultValues.department_score
      ? defaultValues.department_score
      : defaultValues.kpiScore;
    // 是否减分
    defaultValues["department_deducted"] = row["department_deducted"]
      ? row["department_deducted"]
      : "N";
    // // 是否引用日常监督文件
    // defaultValues["quoteFiles"] = "N";
    // if (row.fileIds) {
    //   defaultValues["quoteFiles"] = "Y";
    // }
    // this.handleLinkSelect("quoteFiles", defaultValues["quoteFiles"]);
    // 评分日期
    defaultValues.department_assessDt = row["department_assessDt"]
      ? row["department_assessDt"]
      : this.$globalFnc.changeDateFormat(new Date(), "ymd");
    // 评分单位
    defaultValues.mainOrgId = this.$store.getters["user/userInfos"]["orgId"];
    //  自评配合工作情况列表
    // 获取列表需要的id
    if (row["self_asmShemeAssessId"]) {
      let params = {
        asmSchemeKpiId: row.asmSchemeKpiId,
        asmShemeAssessId: row.self_asmShemeAssessId
      };
      // 市配合部门id
      params.cooperateOrgIds = row["assessedCityCOrgId"];
      // 配合处室id
      if (row["assessdCOassigns"] && row["assessdCOassigns"].length) {
        row["assessdCOassigns"].forEach(item => {
          params.cooperateOrgIds.push(item["assessedOrgId"]);
        });
      }
      this.$getData(this.$api.listAssessComment, params).then(res => {
        let fileList = res.data;
        fileList.forEach(item => {
          if (item.files && item.files.length) {
            item["fileName"] = item.files.join(",");
          } else {
            item["fileName"] = " ";
          }
        });
        this.$set(defaultValues, "coordinationList", fileList);
      });
    }
    // 责任处室打分情况
    if (row.asmShemeAssessId) {
      let departmentParams = {
        asmSchemeKpiId: row.asmSchemeKpiId,
        asmShemeAssessId: row.asmShemeAssessId
      };
      // 责任处室id
      departmentParams.mainOrgIds = row["assessdMOassignsId"];
      if (this.$store.getters["user/userInfos"].orgType !== "OFFICE") {
        this.$getData(this.$api.listAssessKpi, departmentParams).then(res => {
          let departmentAssess = res.data;
          departmentAssess.forEach(item => {
            if (item.files && item.files.length) {
              item["fileName"] = item.files.join(",");
            } else {
              item["fileName"] = " ";
            }
          });
          this.$set(defaultValues, "departmentAssessTable", departmentAssess);
        });
      }
    }

    this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValues;
    this.dialogFormSettings.dialogFormVisible = true;
  },
  /**
   * 字典表的值
   */
  setDictList(data, id, type) {
    data.forEach(item => {
      // 指标类目树
      if (item.name === "kpiIndextree") {
        this.$getData(this.$api.getKpiIndexTree, { asmKpiIndexId: id }).then(
          res => {
            item.treeSettings.treeData = res;
          }
        );
      }
      // 处室
      if (item.name === "manageOrg_MO") {
        this.$getData(this.$api.dictList, {
          _refKey: "org",
          orgtypeid: "203",
          parentorgid: this.$store.getters["user/userInfos"].orgId,
          status: "1"
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        });
      }
      // 机构
      if (item.name === "mainOrgId") {
        this.$getData(this.$api.dictList, {
          _refKey: "org"
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        });
      }
      // 市县
      if (item.name === "district") {
        this.$getData(this.$api.dictList, { _refKey: "district2" }).then(
          res => {
            item.data = this.$globalFnc.arrayToFormDropdown(
              res,
              "text",
              "value"
            );
          }
        );
      }
      // 年度考核任务
      if (item.name === "asmSchemeId") {
        this.$getData(this.$api.getSchemeSelect, {
          schemeProcessStatus: "higher-assess",
          assessedOrgId: this.$store.getters["user/userInfos"].orgId,
          assessType: this.pageType,
          running: true
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(
            res,
            "name",
            "asmSchemeId"
          );
          // 年度考核需要获取被考核机构
          if (
            this.pageType === this.$global.SCHME_TYPE_YEAR &&
            res &&
            res.length
          ) {
            this.$getData(this.$api.getSchemeAssessedRef, {
              asmSchemeId: res[0].asmSchemeId
            }).then(res => {
              // 年度考核首页搜索
              let searchFormGroup = this.searchSettings.formGroupList;
              searchFormGroup.forEach(item => {
                if (item.name === "assessedOrgId") {
                  item.data = this.$globalFnc.arrayToFormDropdown(
                    res.data,
                    "assessedOrgId__dsp",
                    "assessedOrgId"
                  );
                }
              });
            });
          }
        });
      }
      // 查看全部禁用
      if (type === "look") {
        item.disabled = true;
      }
      // 责任处室，不能查看责任处室打分情况
      if (
        this.$store.getters["user/userInfos"].orgType === "OFFICE" &&
        item.name === "departmentAssessMessage"
      ) {
        item.hideItem = true;
      }
      // 不是专项，不需要选方案
      if (
        this.pageType !== this.$global.SCHME_TYPE_SPECIAL &&
        item.name === "asmSchemeId"
      ) {
        item.hideItem = true;
      }
      if (item.children) {
        this.setDictList(item.children, id, type);
      }
    });
    return data;
  },
  /**
   * 表单切换
   */
  handleLinkSelect(linkName, data) {
    // this.changeFormList(
    //   linkName,
    //   data,
    //   this.dialogFormSettings.dialogFormItems.formGroupList
    // );
    // 分数变化
    if (linkName === "score") {
      let score = this.dialogFormSettings.dialogFormItems.formGroupValues[
          "department_score"
        ],
        kpiScore = this.dialogFormSettings.dialogFormItems.formGroupValues[
          "kpiScore"
        ];
      if (score < kpiScore) {
        this.dialogFormSettings.dialogFormItems.formGroupValues[
          "department_deducted"
        ] = "Y";
        // this.handleLinkSelect("departmentDeducted", "Y");
      } else {
        this.dialogFormSettings.dialogFormItems.formGroupValues[
          "department_deducted"
        ] = "N";
        // this.handleLinkSelect("departmentDeducted", "N");
        if (score > kpiScore) {
          this.dialogFormSettings.dialogFormItems.formGroupValues[
            "department_score"
          ] = "";
        }
      }
    }
    // 搜索区的被考核结构
    if (linkName === "scheme") {
      this.searchSettings.formGroupValues.assessedOrgId = "";
      let formGroupList = this.searchSettings.formGroupList;
      if (data) {
        this.$getData(this.$api.getSchemeAssessedRef, {
          asmSchemeId: data
        }).then(res => {
          formGroupList.forEach(item => {
            if (item.name === "assessedOrgId") {
              item.data = this.$globalFnc.arrayToFormDropdown(
                res.data,
                "assessedOrgId__dsp",
                "assessedOrgId"
              );
            }
          });
        });
      } else {
        formGroupList.forEach(item => {
          if (item.name === "assessedOrgId") {
            item.data = [];
          }
        });
      }
    }
  },
  // changeFormList(linkName, data, formList) {
  //   formList.map(item => {
  //     是否减分 减分原因， 整改措施
  //     if (
  //       linkName === "departmentDeducted"
  //       // (item.name === "deductionReason" || item.name === "rectifyDesc")
  //     ) {
  //       item.hideItem = data == "Y" ? false : true;
  //     }
  //     是否引用日常监督文件
  //     if (linkName === "quoteFiles" && item.name === "dailyFilesList") {
  //       item.hideItem = data == "Y" ? false : true;
  //     }
  //     if (item.children) {
  //       this.changeFormList(linkName, data, item.children);
  //     }
  //   });
  // },
  /**
   * 弹框确认
   */
  handleDialogForm(btns, data) {
    if (btns.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    let submitData = this.$globalFnc.deepCopy(data),
      isFormdata;
    if (btns.flag === "assignKpiSave") {
      // 分配处室特殊处理
      submitData = this.dealAssignKpiData(submitData);
      isFormdata = true;
    }
    if (btns.flag === "departmentAssess") {
      // 部门评分保存
      submitData = this.dealDepartmentAssessData(submitData);
      // 有id说明填写过意见，是更新，没有是新增
      if (submitData["department_asmShemeAssessKpiId"]) {
        btns.postUrl = "_data/shemeAssess/kpi/updateAssessKpi";
      } else {
        btns.postUrl = "_data/shemeAssess/kpi/addAssessKpi";
      }
    }
    this.$postData(btns.postUrl, submitData, isFormdata).then(() => {
      this.$message.success("保存成功！");
      this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  },
  /**
   *  评分保存
   */
  dealDepartmentAssessData(data) {
    // 自评日期
    let params = this.$globalFnc.deepCopy(data);
    for (let key in params) {
      if (key.indexOf("department_") !== -1) {
        params[key.split("department_")[1]] = params[key];
      }
    }
    if (
      this.$store.getters["user/userInfos"].orgId === params.assessManageOrgId
    ) {
      params.manageDepart = "Y";
    }
    return params;
  },
  /**
   *  分配责任处室
   */
  dealAssignKpiData(data) {
    let params = {},
      addDepartment = [],
      deleteDepartment = [];
    // 删除的责任处室
    if (data.old_manageOrg_MO) {
      deleteDepartment = data.old_manageOrg_MO.split(",");
    }
    // 新增的责任处室
    if (data.manageOrg_MO && data.manageOrg_MO.length) {
      data.manageOrg_MO.forEach(item => {
        let obj = {};
        obj.type = this.$global.SCHEME_KPIASSIGN_TYPE_MO;
        // 谁分配的
        obj.assessOrgId = this.$store.getters["user/userInfos"]["assess"];
        // 分配到哪里
        obj.assessedOrgId = item;
        // 哪个方案
        obj.asmSchemeKpiId = data.asmSchemeKpiId;
        addDepartment.push(obj);
      });
    }

    params.deleteAssignIds = deleteDepartment;
    params.datas = addDepartment;
    return params;
  }
};
export default methods;

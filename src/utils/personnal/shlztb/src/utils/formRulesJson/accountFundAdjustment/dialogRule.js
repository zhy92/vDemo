let rule = {
  memberid: [{ required: true, message: "请选择会员名称", trigger: "change" }],
  num: [{ required: true, message: "请填写交易金额", trigger: "blur" }],
  type: [{ required: true, message: "请选择出入类型", trigger: "change" }]
};

export default {
  rule
};

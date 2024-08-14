// 性别代码表
export const sexList = [
  { value: '1', label: '男' },
  { value: '2', label: '女' },
]

// 持卡人证件类型代码表
export const cardType = [
  { value: '1', label: '居民身份证' },
  { value: '5', label: '港澳台居民往来内地通行证' },
  { value: '6', label: '外国公民所持证件/护照' },
  { value: '16', label: '港澳台居民居住证' },
  { value: '18', label: '中华人民共和国外国人永久居留证' },
  { value: '8', label: '户口簿' },
]

// 国家/地区
export const regionList = [{ value: 'CHN', label: '中国' }]

// 社会保障卡应用状态
export const socialSecurity = [
  { value: '0', label: '封存' },
  { value: '1', label: '正常' },
  { value: '2', label: '正式挂失' },
  { value: '3', label: '应用锁定' },
  { value: '4', label: '临时挂失' },
  { value: '9', label: '注销' },
]

// 雄安发卡银行代码
export const bankCodeList = [
  { value: '102', label: '工商银行' },
  { value: '103', label: '农业银行' },
  { value: '104', label: '中国银行' },
  { value: '105', label: '建设银行' },
  { value: '301', label: '交通银行' },
  { value: '302', label: '中信银行' },
  { value: '303', label: '光大银行' },
  { value: '402', label: '河北省农信社' },
]

// 职业
export const occupationList = [
  { value: '10000', label: '国家机关、党群组织、企业、事业单位负责人' },
  { value: '20000', label: '专业技术人员' },
  { value: '30000', label: '办事人员和有关人员' },
  { value: '40000', label: '社会生产服务和生活服务人员' },
  { value: '50000', label: '农、林、牧、渔业生产及辅助人员' },
  { value: '60000', label: '生产、运输设备操作人员及有关人员' },
  { value: '70000', label: '军人' },
  { value: '80000', label: '无职业/自由职业者/学生等其他类人员' },
]

// 民族代码表export const
export const ethniCodeList = [
  { value: '01', label: '汉族' },
  { value: '02', label: '蒙古族' },
  { value: '03', label: '回族' },
  { value: '04', label: '藏族' },
  { value: '05', label: '维吾尔族' },
  { value: '06', label: '苗族' },
  { value: '07', label: '彝族' },
  { value: '08', label: '壮族' },
  { value: '09', label: '布依族' },

  { value: '10', label: '朝鲜族' },
  { value: '11', label: '满族' },
  { value: '12', label: '侗族' },
  { value: '13', label: '瑶族' },
]

// 雄安发卡地区行政区划代码

export const areaCodeList = [
  { value: '130632', label: '安新县' },
  { value: '130629', label: '容城县' },
  { value: '130638', label: '雄县' },
  { value: '133199', label: '雄安新区本级' },
]

// 代办人与申请人关系
export const applicantList = [
  { value: '21', label: '父子' },
  { value: '22', label: '父女' },
  { value: '31', label: '母子' },
  { value: '32', label: '母女' },
  { value: '1', label: '配偶' },
  { value: '4', label: '孙子、孙女或外孙子、外孙女' },
  { value: '6', label: '祖父母或外祖父母' },
  { value: '7', label: '兄、弟、姐、妹' },
  { value: '8', label: '其他' },
]

// 办卡进度代码表
export const speedList = [
  { value: '1', label: '待审核' },
  { value: '2', label: '已审核,正在制卡' },
  { value: '3', label: '制卡完成(待激活)' },
  { value: '4', label: '个人已领卡(发卡激活)' },
]

// 数据状态

export const dataStatusList = [
  { value: '10', label: '未受理' },
  { value: '11', label: '已受理' },

  { value: '12', label: '已修改信息' },
  { value: '15', label: '补卡' },

  { value: '16', label: '换卡' },
  { value: '17', label: '换发' },

  { value: '21', label: '已生成制卡批次、待报银行' },
  { value: '22', label: '已报银行未回盘' },

  { value: '23', label: '银行回盘待报卡商' },
  { value: '24', label: '已报卡商待回盘' },

  { value: '25', label: '卡商已回盘、本地流转中' },
  { value: '26', label: '卡商已回盘、金融待加载' },

  { value: '27', label: '金融已加载、本地流转中' },
  { value: '30', label: '分行领卡' },

  { value: '31', label: '发卡网点领卡' },
  { value: '32', label: '个人已领卡' },

  { value: '33', label: '单位已领卡' },
  { value: '41', label: '已生成快速制卡网点批次' },

  { value: '42', label: '制卡数据已下载、设备制卡中' },
  { value: '45', label: '快速制卡完成、待领取' },

  { value: '80', label: '开户失败,信息待修改' },
  { value: '85', label: '制卡失败' },
]

// 是否邮寄
export const isMailList = [{ value: '0', label: '否' }]

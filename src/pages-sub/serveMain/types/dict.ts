// 性别代码表
export const sexList = [
  { label: '0', value: '未知的性别' },
  { label: '1', value: '男' },
  { label: '2', value: '女' },
  { label: '9', value: '未说明性别' },
]

// 持卡人证件类型代码表
export const cardType = [
  { label: '1', value: '居民身份证' },
  { label: '5', value: '港澳台居民往来内地通行证' },
  { label: '6', value: '外国公民所持证件/护照' },
  { label: '16', value: '港澳台居民居住证' },
  { label: '18', value: '中华人民共和国外国人永久居留证' },
  { label: '8', value: '户口簿' },
]

// 国家/地区
export const regionList = [{ label: 'CHN', value: '中国' }]

// 社会保障卡应用状态
export const socialSecurity = [
  { label: '0', value: '封存' },
  { label: '1', value: '正常' },
  { label: '2', value: '正式挂失' },
  { label: '3', value: '应用锁定' },
  { label: '4', value: '临时挂失' },
  { label: '9', value: '注销' },
]

// 雄安发卡银行代码
export const bankCodeList = [
  { label: '102', value: '工商银行' },
  { label: '103', value: '农业银行' },
  { label: '104', value: '中国银行' },
  { label: '105', value: '建设银行' },
  { label: '301', value: '交通银行' },
  { label: '302', value: '中信银行' },
  { label: '303', value: '光大银行' },
  { label: '402', value: '河北省农信社' },
]

// 职业
export const occupationList = [
  { label: '10000', value: '国家机关、党群组织、企业、事业单位负责人' },
  { label: '20000', value: '专业技术人员' },
  { label: '30000', value: '办事人员和有关人员' },
  { label: '40000', value: '社会生产服务和生活服务人员' },
  { label: '50000', value: '农、林、牧、渔业生产及辅助人员' },
  { label: '60000', value: '生产、运输设备操作人员及有关人员' },
  { label: '70000', value: '军人' },
  { label: '80000', value: '无职业/自由职业者/学生等其他类人员' },
]

// 民族代码表export const
export const ethniCodeList = [
  { label: '01', value: '汉族' },
  { label: '02', value: '蒙古族' },
  { label: '03', value: '回族' },
  { label: '04', value: '藏族' },
  { label: '05', value: '维吾尔族' },
  { label: '06', value: '苗族' },
  { label: '07', value: '彝族' },
  { label: '08', value: '壮族' },
  { label: '09', value: '布依族' },

  { label: '10', value: '朝鲜族' },
  { label: '11', value: '满族' },
  { label: '12', value: '侗族' },
  { label: '13', value: '瑶族' },
]

// 雄安发卡地区行政区划代码

export const areaCodeList = [
  { label: '130632', value: '安新县' },
  { label: '130629', value: '容城县' },
  { label: '130638', value: '雄县' },
  { label: '133199', value: '雄安新区本级' },
]

// 代办人与申请人关系
export const applicantList = [
  { label: '21', value: '父子' },
  { label: '22', value: '父女' },
  { label: '31', value: '母子' },
  { label: '32', value: '母女' },
  { label: '1', value: '配偶' },
  { label: '4', value: '孙子、孙女或外孙子、外孙女' },
  { label: '6', value: '祖父母或外祖父母' },
  { label: '7', value: '兄、弟、姐、妹' },
  { label: '8', value: '其他' },
]

// 办卡进度代码表
export const speedList = [
  { label: '1', value: '待审核' },
  { label: '2', value: '已审核,正在制卡' },
  { label: '3', value: '制卡完成(待激活)' },
  { label: '4', value: '个人已领卡(发卡激活)' },
]

// 数据状态

export const dataStatusList = [
  { label: '10', value: '未受理' },
  { label: '11', value: '已受理' },

  { label: '12', value: '已修改信息' },
  { label: '15', value: '补卡' },

  { label: '16', value: '换卡' },
  { label: '17', value: '换发' },

  { label: '21', value: '已生成制卡批次、待报银行' },
  { label: '22', value: '已报银行未回盘' },

  { label: '23', value: '银行回盘待报卡商' },
  { label: '24', value: '已报卡商待回盘' },

  { label: '25', value: '卡商已回盘、本地流转中' },
  { label: '26', value: '卡商已回盘、金融待加载' },

  { label: '27', value: '金融已加载、本地流转中' },
  { label: '30', value: '分行领卡' },

  { label: '31', value: '发卡网点领卡' },
  { label: '32', value: '个人已领卡' },

  { label: '33', value: '单位已领卡' },
  { label: '41', value: '已生成快速制卡网点批次' },

  { label: '42', value: '制卡数据已下载、设备制卡中' },
  { label: '45', value: '快速制卡完成、待领取' },

  { label: '80', value: '开户失败,信息待修改' },
  { label: '85', value: '制卡失败' },
]

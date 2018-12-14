import _ from 'lodash'

const nowYear = new Date().getFullYear()
// 2030-2015=15  +1
const sum = Number(nowYear) + (-2014) + 1

// 2014 - 2015 - 2016 - 2017 - 2018
const date = {
  year: _.times(sum, number => ({
    label: `${2014 + number}年`,
    value: 2014 + number
  })),
  month: _.times(12, number => ({
    label: `${1 + number}月`,
    value: 1 + number
  })),
  day: _.times(31, number => ({
    label: `${1 + number}日`,
    value: 1 + number
  }))
}

const provincesSelect = [
  {
    value: '广东', label: '广东'
  },
  {
    value: '江苏', label: '江苏'
  },
  {
    value: '山东', label: '山东'
  },
  {
    value: '浙江', label: '浙江'
  },
  {
    value: '河南', label: '河南'
  },
  {
    value: '四川', label: '四川'
  },
  {
    value: '湖北', label: '湖北'
  },
  {
    value: '上海', label: '上海'
  },
  {
    value: '湖南', label: '湖南'
  },
  {
    value: '河北', label: '河北'
  },
  {
    value: '福建', label: '福建'
  },
  {
    value: '北京', label: '北京'
  },
  {
    value: '安徽', label: '安徽'
  },
  {
    value: '辽宁', label: '辽宁'
  },
  {
    value: '江西', label: '江西'
  },
  {
    value: '陕西', label: '陕西'
  },
  {
    value: '天津', label: '天津'
  },
  {
    value: '重庆', label: '重庆'
  },
  {
    value: '广西', label: '广西'
  },
  {
    value: '云南', label: '云南'
  },
  {
    value: '内蒙古', label: '内蒙古'
  },
  {
    value: '山西', label: '山西'
  },
  {
    value: '黑龙江', label: '黑龙江'
  },
  {
    value: '贵州', label: '贵州'
  },
  {
    value: '吉林', label: '吉林'
  },
  {
    value: '新疆', label: '新疆'
  },
  {
    value: '甘肃', label: '甘肃'
  },
  {
    value: '海南', label: '海南'
  },
  {
    value: '宁夏', label: '宁夏'
  },
  {
    value: '青海', label: '青海'
  },
  {
    value: '西藏', label: '西藏'
  },
  {
    value: '香港', label: '香港'
  },
  {
    value: '澳门', label: '澳门'
  },
  {
    value: '台湾', label: '台湾'
  }
]
const SeverType = [
  { value: 1, label: '服务商' },
  { value: 2, label: '省份' }
]
// 部门
const department = [
  {value: '飞型区管理部', label: '飞型区管理部'},
  {value: '信息科技部', label: '信息科技部'},
  {value: '消防支队', label: '消防支队'},
  {value: '建设项目管理中心', label: '建设项目管理中心'},
  {value: '公共区管理部', label: '公共区管理部'},
  {value: '运行控制中心', label: '运行控制中心'},
  {value: '质量安全部', label: '质量安全部'},
  {value: '航站楼管理部', label: '航站楼管理部'}
]
// 模块
const model = [
  {value: '运行管理模块', label: '运行管理模块'},
  {value: '场道管理模块', label: '场道管理模块'},
  {value: '机坪交通', label: '机坪交通'},
  {value: '航空安保', label: '航空安保'},
  {value: '鸟击管理', label: '鸟击管理'},
  {value: '灯光管理', label: '灯光管理'},
  {value: '系统管理', label: '系统管理'},
  {value: '工程管理', label: '工程管理'},
  {value: '安全与规划', label: '安全与规划'}
]
// 风险类型
const riskType = [
  {value: '人伤类', label: '人伤类'},
  {value: '跑道入侵', label: '跑道入侵'},
  {value: '航空器类', label: '航空器类'},
  {value: '应急救援', label: '应急救援'},
  {value: '空防反恐类', label: '空防反恐类'},
  {value: '信息安全类', label: '信息安全类'},
  {value: '消防类', label: '消防类'},
  {value: '防汛类', label: '防汛类'}
]
// 因子类型
const factorType = [
  {value: '引导员资质', label: '引导员资质'},
  {value: '车辆交通违章率', label: '车辆交通违章率'},
  {value: '廊桥状态', label: '廊桥状态'},
  {value: '是否动电', label: '是否动电'},
  {value: '通话合规性', label: '通话合规性'},
  {value: '车辆速度', label: '车辆速度'}
]
// 数据来源
const dataSource = [
  {value: '引导员资质', label: '引导员资质'},
  {value: '车辆交通违章率', label: '车辆交通违章率'},
  {value: '廊桥状态', label: '廊桥状态'},
  {value: '是否动电', label: '是否动电'},
  {value: '通话合规性', label: '通话合规性'},
  {value: '车辆速度', label: '车辆速度'}
]
// 区间
const during = [
  {value: '>', label: '>'},
  {value: '>=', label: '>='},
  {value: '=', label: '='},
  {value: '<=', label: '<='},
  {value: '<', label: '<'}
]
// 风险
const risk = [
  {value: '高风险', label: '高风险'},
  {value: '低风险', label: '低风险'}
]
// 报警
const police = [
  {value: '是', label: '是'},
  {value: '否', label: '否'}
]
// 推送对象
const PushObject = [
  {value: '1', label: '1'},
  {value: '2', label: '2'}
]
// 通知
const notice = [
  {value: '短信通知', label: '短信通知'},
  {value: '系统通知', label: '系统通知'}
]
// 类数组转换为数组
const toArray = function (s) {
  try {
    return Array.prototype.slice.call(s)
  } catch (e) {
    var arr = []
    for (var i = 0, len = s.length; i < len; i++) {
      // arr.push(s[i]);
      arr[i] = s[i] // 据说这样比push快
    }
    return arr
  }
}
export default {
  date,
  provincesSelect,
  SeverType,
  department,
  model,
  riskType,
  factorType,
  dataSource,
  during,
  risk,
  police,
  PushObject,
  notice,
  toArray
}

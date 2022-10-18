export default {
  search: '搜索',
  reset: '重置',
  add: '新增',
  refresh: '刷新',
  check: '查看',
  detail: '详情',
  edit: '编辑',
  delete: '删除',
  deletePrompt: '是否确认删除？',
  cancel: '取消',
  save: '保存',
  empty: '暂无数据',
  yes: '是',
  no: '否',
  list: {
    indexColumn: '序号列',
    selectColumn: '勾选列',
    indexNumber: '序号',
    operate: '操作'
  },
  pagination: {
    start: '共',
    end: '条'
  },
  modal: {
    confirm: '确认',
    cancel: '取消',
    add: '新增',
    edit: '编辑',
    detail: '详情'
  },
  form: {
    warning: '表单必填项为空或存在格式错误！'
  },
  api: {
    operationFailed: '操作失败',
    errorTip: '错误提示',
    errorMessage: '操作失败,系统异常!',
    timeoutMessage: '登录超时,请重新登录!',
    apiTimeoutMessage: '接口请求超时,请刷新页面重试!',
    apiRequestFailed: '请求出错，请稍候重试',
    networkException: '网络异常',
    networkExceptionMsg: '网络异常，请检查您的网络连接是否正常!',

    addSuccess: '新增成功',
    addError: '新增失败，请稍后重试',
    editSuccess: '编辑成功',
    editError: '编辑失败，请稍后重试',
    deleteSuccess: '删除成功',
    deleteError: '删除失败，请稍后重试',
    searchSuccess: '搜索成功',
    searchError: '搜索失败，请稍后重试',

    errMsg401: '用户没有权限（令牌、用户名、密码错误）!',
    errMsg403: '用户得到授权，但是访问是被禁止的。!',
    errMsg404: '网络请求错误,未找到该资源!',
    errMsg405: '网络请求错误,请求方法未允许!',
    errMsg408: '网络请求超时!',
    errMsg500: '服务器错误,请联系管理员!',
    errMsg501: '网络未实现!',
    errMsg502: '网络错误!',
    errMsg503: '服务不可用，服务器暂时过载或维护!',
    errMsg504: '网络超时!',
    errMsg505: 'http版本不支持该请求!'
  },
  app: {
    logoutTip: '温馨提醒',
    logoutMessage: '是否确认退出系统?',
    menuLoading: '菜单加载中...'
  },
  errorLog: {
    tableTitle: '错误日志列表',
    tableColumnType: '类型',
    tableColumnDate: '时间',
    tableColumnFile: '文件',
    tableColumnMsg: '错误信息',
    tableColumnStackMsg: 'stack信息',

    tableActionDesc: '详情',

    modalTitle: '错误详情',

    fireVueError: '点击触发vue错误',
    fireResourceError: '点击触发资源加载错误',
    fireAjaxError: '点击触发ajax错误',

    enableMessage:
      '只在`/src/settings/projectSetting.ts` 内的useErrorHandle=true时生效.'
  },
  exception: {
    backLogin: '返回登录',
    backHome: '返回首页',
    subTitle403: '抱歉，您无权访问此页面。',
    subTitle404: '抱歉，您访问的页面不存在。',
    subTitle500: '抱歉，服务器报告错误。',
    noDataTitle: '当前页无数据',
    networkErrorTitle: '网络错误',
    networkErrorSubTitle: '抱歉，您的网络连接已断开，请检查您的网络！'
  },
  lock: {
    unlock: '点击解锁',
    alert: '锁屏密码错误',
    backToLogin: '返回登录',
    entry: '进入系统',
    placeholder: '请输入锁屏密码或者用户密码'
  },
  login: {
    backSignIn: '返回',
    signInFormTitle: '登录',
    mobileSignInFormTitle: '手机登录',
    qrSignInFormTitle: '二维码登录',
    signUpFormTitle: '注册',
    forgetFormTitle: '重置密码',

    signInTitle: '开箱即用的中后台管理系统',
    signInDesc: '输入您的个人信息开始使用！',
    policy: '我同意xxx隐私政策',
    scanSign: `扫码后点击"确认"，即可完成登录`,

    loginButton: '登录',
    registerButton: '注册',
    rememberMe: '记住我',
    forgetPassword: '忘记密码?',
    resetButton: '重置密码',
    otherSignIn: '其他登录方式',

    loginSuccessTitle: '登录成功',
    loginSuccessDesc: '欢迎回来，',
    SignUpSuccessTitle: '注册成功',
    SignUpSuccessDesc: '跳转到登录页面',
    ResetPwdSuccessTitle: '密码修改成功',

    backToSignin: '返回登陆页面',
    logoutNotificationTitle: '温馨提示',
    logoutNotificationDesc: '是否确认退出系统？',

    okText: '确认',
    cancelText: '取消',

    accountPlaceholder: '请输入账号',
    passwordPlaceholder: '请输入密码',
    passwordPlaceholderAgain: '请再次输入密码',
    smsPlaceholder: '请输入验证码',
    mobilePlaceholder: '请输入手机号码',
    policyPlaceholder: '勾选后才能注册',
    diffPwd: '两次输入密码不一致',
    PwdLength: '密码长度在 6 到 30 个字符',
    getVerifyCode: '获取验证码',
    resendVerifyCodePrefix: '',
    resendVerifyCodeSuffix: '秒后重新获取',

    emailFormatNotValid: '邮箱格式不正确，请重新输入',
    phoneFormatNotValid: '手机号码格式不正确，请重新输入',
    passwordFormatNotValid: '密码必须且仅由字母、数字、英文特殊符号组成',

    userName: '账号',
    password: '密码',
    confirmPassword: '确认密码',
    email: '邮箱',
    smsCode: '短信验证码',
    mobile: '手机号码'
  }
}
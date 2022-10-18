export default {
  search: 'Search',
  reset: 'Reset',
  add: 'Add',
  refresh: 'Refresh',
  check: 'check',
  detail: 'detail',
  edit: 'edit',
  delete: 'delete',
  deletePrompt: 'Are you sure to delete?',
  cancel: 'cancel',
  save: 'save',
  empty: 'No Data',
  yes: 'yes',
  no: 'no',
  list: {
    indexColumn: 'Index Column',
    selectColumn: 'Selection Column',
    indexNumber: 'Index Number',
    operate: 'Operate'
  },
  pagination: {
    start: 'total of',
    end: ''
  },
  modal: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    add: 'Add',
    edit: 'Edit',
    detail: 'Detail'
  },
  form: {
    warning: 'Form required fields are empty or formatted incorrectly!'
  },
  api: {
    operationFailed: 'Operation failed',
    errorTip: 'Error information',
    errorMessage: 'Operation failed. System error!',
    timeoutMessage: 'Log in timed out. Please try again.',
    apiTimeoutMessage:
      'API request timed out. Please refresh the page and try again!',
    apiRequestFailed: 'Request error. Please try again later.',
    networkException: 'Network exception',
    networkExceptionMsg:
      'Network exception. Please check your network connection.',

    addSuccess: 'Added successfully',
    addError: 'Add failed, please try again later',
    editSuccess: 'Edited successfully',
    editError: 'Edit failed, please try again later',
    deleteSuccess: 'Deleted successfully',
    deleteError: 'Delete failed, please try again later',
    searchSuccess: 'Search successfully',
    searchError: 'Search failed, please try again later',

    errMsg401:
      'User has no permission (The token, user name, or password is incorrect)!',
    errMsg403: 'User is authorized, but access is forbidden.',
    errMsg404: 'Network request error: resource is not found.',
    errMsg405: 'Network request error: the request method is not allowed.',
    errMsg408: 'Network request timed out!',
    errMsg500: 'Server error. Please contact the administrator.',
    errMsg501: 'Network is not implemented',
    errMsg502: 'Network error',
    errMsg503:
      'Service unavailable. The server is temporarily overloaded or under maintenance.',
    errMsg504: 'Network connection timed out',
    errMsg505: 'The current HTTP version does not support this request'
  },
  app: {
    logoutTip: 'Reminder',
    logoutMessage: 'Are you sure to sign out? ',
    menuLoading: 'Loading menu…'
  },
  errorLog: {
    tableTitle: 'Error log list',
    tableColumnType: 'Type',
    tableColumnDate: 'Time',
    tableColumnFile: 'File',
    tableColumnMsg: 'Error information',
    tableColumnStackMsg: 'Stack information',

    tableActionDesc: 'Detail',

    modalTitle: 'Error detail',

    fireVueError: 'A Vue error is triggered by the click',
    fireResourceError: 'A resource-loading error is triggered by the click',
    fireAjaxError: 'An Ajax error is triggered by the click',

    enableMessage:
      'It is enabled only if userErrorHandle=true in `/src/settings/projectSetting.ts`.'
  },
  exception: {
    backLogin: 'Back to Login',
    backHome: 'Back to Home',
    subTitle403: 'Sorry. You have no permission to access this page.',
    subTitle404: 'Sorry. The page you are accessing does not exist.',
    subTitle500: 'Sorry. There is a server error.',
    noDataTitle: 'The current page has no data',
    networkErrorTitle: 'Network error',
    networkErrorSubTitle:
      'Sorry. Your network connection is broken. Please check your network.'
  },
  lock: {
    unlock: 'Click to unlock',
    alert: 'The screen lock password is incorrect',
    backToLogin: 'Back to Login',
    entry: 'Enter the system',
    placeholder: 'Please enter the screen lock password or user password'
  },
  login: {
    backSignIn: 'Return',
    signInFormTitle: 'Log in',
    mobileSignInFormTitle: 'Mobile Log in',
    qrSignInFormTitle: 'QR code Log in',
    signUpFormTitle: 'Register',
    forgetFormTitle: 'Reset Password',

    signInTitle: 'Out-of-the-box server management system',
    signInDesc: 'Please enter your information and start now!',
    policy: 'I agree with the {xxx} privacy policy',
    scanSign: `Scan the code and confirm the login operation.`,

    loginButton: 'Log in',
    registerButton: 'Register',
    rememberMe: 'Remember me',
    forgetPassword: 'Forget password?',
    resetButton: 'Reset Password',
    otherSignIn: 'Log in with',

    loginSuccessTitle: 'Log in successful',
    loginSuccessDesc: 'Welcome back, ',
    SignUpSuccessTitle: 'Register successfully',
    SignUpSuccessDesc: 'Jump to log in ',
    ResetPwdSuccessTitle: 'Reset password successfully',

    backToSignin: 'Back to log in',
    logoutNotificationTitle: 'Sign out',
    logoutNotificationDesc: 'Are you sure you would like to sign out?',

    okText: 'Confirm',
    cancelText: 'Cancel',

    accountPlaceholder: 'Please enter your account',
    passwordPlaceholder: 'Please enter the password',
    passwordPlaceholderAgain: 'Please re-enter the password',
    smsPlaceholder: 'Please enter the SMS code',
    mobilePlaceholder: 'Please enter your phone number',
    policyPlaceholder:
      'Please select this option to have a successful registration.',
    diffPwd: 'The passwords entered do not match',
    PwdLength: 'The password length shall be between 6 to 30 characters.',
    getVerifyCode: 'Get SMS code',
    resendVerifyCodePrefix: 'Reaquire in ',
    resendVerifyCodeSuffix: 's',

    emailFormatNotValid: 'The email format is incorrect. Please re-enter.',
    phoneFormatNotValid:
      'The phone number format is incorrect. Please re-enter.',
    passwordFormatNotValid:
      'The password shall be composed of characters, numbers, and special English symbols.',

    userName: 'Account',
    password: 'Password',
    confirmPassword: 'Confirm password',
    email: 'Email',
    smsCode: 'SMS code',
    mobile: 'Phone number'
  }
}

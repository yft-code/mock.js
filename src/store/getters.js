const getters = {
  size: state => state.app.size,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  name: state => state.user.name,
  errorLogs: state => state.errorLog.logs
}
export default getters

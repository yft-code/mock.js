module.exports = {
  title: '协同管理',
  showSettings: true,
  fixedHeader: true,
  errorLog: 'production',
  // vue-ls options
  storageOptions: {
    namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  }
}

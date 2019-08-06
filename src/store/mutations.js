import * as types from './mutation-types'

const mutations = {
  [types.SET_USER] (state, userName) {
    state.userName = userName
  },
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_PWD] (state, pwd) {
    state.password = pwd
  },
  [types.SET_ROLE] (state, role) {
    state.role = role
  },
  [types.SET_HOST] (state, hostlist) {
    state.hostlist = hostlist
  },
  [types.SET_STOMP] (state, stomp) {
    state.stomp = stomp
  },
}

export default mutations

import axios from 'axios'
import semver from 'semver'
import util from '@/utils/util'
import setting from '@/setting'

export default {
  namespaced: true,
  state: {
    // CareyShop Admin 版本
    version: setting.releases.version,
    // 最新版本的信息
    latest: {},
    // 是否有新版本
    update: false
  },
  actions: {
    /**
     * @description 检查版本更新
     * @param {Object} param context
     */
    checkUpdate({ state, commit }) {
      axios.get(setting.releases.api)
        .then(res => {
          let versionGet = res.tag_name
          const update = semver.lt(state.version, versionGet)
          if (update) {
            util.log.capsule('CareyShop Admin', `New version ${res.name}`)
            console.log(`版本号: ${res.tag_name} | 详情 ${res.html_url}`)
            commit('updateSet', true)
          }
          commit('latestSet', res)
        })
        .catch(err => {
          console.log('checkUpdate error', err)
        })
    }
  },
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state vuex state
     */
    versionShow(state) {
      util.log.capsule('CareyShop Admin', `v${state.version}`)
      console.log('Web https://www.careyshop.cn/')
      console.log('Doc https://doc.careyshop.cn/')
    },
    /**
     * @description 设置是否有新的 CareyShop Admin 版本
     * @param {Object} state vuex state
     * @param {Boolean} update can update
     */
    updateSet(state, update) {
      // store 赋值
      state.update = update
    },
    /**
     * @description 设置最新版本的信息
     * @param {Object} state vuex state
     * @param {Object} latest releases value
     */
    latestSet(state, latest) {
      // store 赋值
      state.latest = latest
    }
  }
}
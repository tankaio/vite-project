import { defineStore } from 'pinia'
import type { SysState, RouteMenu } from '@/types/sysState'
import db from '@/utils/storage'
import router from '@/router'

const useSysStore = defineStore('Sys', {
  state: (): SysState => {
    return {
      tags: db.local.get('tags') || [
        {
          path: '/overview',
          name: 'Overview',
          meta: {
            title: '总览',
            hidden: false,
            icon: 'el-icon-menu',
          },
        },
      ],
      currentMenu: db.local.get('currentMenu') || {},
      menuCollapse: false,
    }
  },
  actions: {
    toggleMenuCollapse() {
      this.menuCollapse = !this.menuCollapse
    },
    closeTag(params: RouteMenu) {
      const i = this.tags.findIndex((tag) => tag.name === params.name)
      if (this.currentMenu.name === params.name) {
        this.currentMenu = this.tags[i - 1]
        db.local.set('currentMenu', this.currentMenu)
        router.push({
          path: this.tags[i - 1].path,
        })
      }
      this.tags.splice(i, 1)
      db.local.set('tags', this.tags)
    },
    clearTags() {
      this.tags = [
        {
          path: '/overview',
          name: 'Overview',
          meta: {
            title: '总览',
            hidden: false,
            icon: 'el-icon-menu',
          },
        },
      ]
    },
    saveTag(params: RouteMenu) {
      const i = this.tags.findIndex((tag) => tag.name === params.name)
      if (i === -1) {
        this.tags.push(params)
        db.local.set('tags', this.tags)
      }
      this.setCurrentMenu(params)
    },
    setCurrentMenu(params: RouteMenu) {
      this.currentMenu = params
      db.local.set('currentMenu', params)
      router.push({
        path: params.path,
      })
    },
  },
})

export default useSysStore

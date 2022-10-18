import { defineStore } from 'pinia'
import { LayoutModeEnum, SwitchEnum, ContentEnum } from '@/types/settings'
import { APP_SETTINGS_KEY_ } from '@/types/storage'
import { store } from '@/store'
import { createLocalStorage } from '@/utils/cache'

const local = createLocalStorage()

interface ISettingsInfo {
  appLayout: string
  isShowHeader: string
  footerStatus: string
  isShowCloseIcon: boolean
  isShowSider: string
  isShowLogo: string
  isFixSiderStatus: string
  isFixHeaderStatus: string
  autoSplice: string
  contentWidth: string
  collapsed: boolean
}

interface ISettingsState {
  settingsInfo: ISettingsInfo
}

const settingsInfoDefault = {
  appLayout: LayoutModeEnum.DEFAULT,
  isShowHeader: SwitchEnum.ON,
  footerStatus: SwitchEnum.OFF,
  isShowSider: SwitchEnum.ON,
  isShowLogo: SwitchEnum.ON,
  isFixSiderStatus: SwitchEnum.ON,
  isFixHeaderStatus: SwitchEnum.ON,
  autoSplice: SwitchEnum.OFF,
  contentWidth: ContentEnum.FLUID,
  collapsed: false
}

const settingsInfo = (local.get(APP_SETTINGS_KEY_) ||
  settingsInfoDefault) as ISettingsInfo

export const useSettingsStore = defineStore({
  id: 'layout',
  state: (): ISettingsState => ({
    settingsInfo
  }),
  getters: {
    getAppLayout(): string {
      return this.settingsInfo.appLayout ?? settingsInfoDefault.appLayout
    },
    getIsShowHeader(): string {
      return this.settingsInfo.isShowHeader ?? settingsInfoDefault.isShowHeader
    },
    getFooterMode(): string {
      return this.settingsInfo.footerStatus ?? settingsInfoDefault.footerStatus
    },
    getIsShowSider(): string {
      return this.settingsInfo.isShowSider ?? settingsInfoDefault.isShowSider
    },
    getIsShowLogo(): string {
      return this.settingsInfo.isShowLogo ?? settingsInfoDefault.isShowLogo
    },
    getFixSiderMode(): string {
      return (
        this.settingsInfo?.isFixSiderStatus ??
        settingsInfoDefault.isFixSiderStatus
      )
    },
    getFixHeader(): string {
      return (
        this.settingsInfo?.isFixHeaderStatus ??
        settingsInfoDefault.isFixHeaderStatus
      )
    },
    getAutoSplice(): string {
      return this.settingsInfo?.autoSplice ?? settingsInfoDefault.autoSplice
    },
    getContentWidth(): string {
      return this.settingsInfo?.contentWidth ?? settingsInfoDefault.contentWidth
    },
    getCollapsed(): boolean {
      return this.settingsInfo.collapsed
    }
  },
  actions: {
    setSettings(info: Partial<ISettingsInfo>) {
      this.settingsInfo = { ...this.settingsInfo, ...info }
      local.set(APP_SETTINGS_KEY_, this.settingsInfo)
    },
    setAppLayout(appLayout: string) {
      this.setSettings({ appLayout })
    },
    setIsShowHeader(isShowHeader: string): void {
      this.setSettings({ isShowHeader })
    },
    setFooterMode(footerStatus: string): void {
      this.setSettings({ footerStatus })
    },
    setIsShowSider(isShowSider: string): void {
      this.setSettings({ isShowSider })
    },
    setIsShowLogo(isShowLogo: string): void {
      this.setSettings({ isShowLogo })
    },
    setFixSiderMode(isFixSiderStatus: string): void {
      this.setSettings({ isFixSiderStatus })
    },
    setFixHeader(isFixHeaderStatus: string): void {
      this.setSettings({ isFixHeaderStatus })
    },
    setAutoSplice(autoSplice: string): void {
      this.setSettings({ autoSplice })
    },
    setContentWidth(contentWidth: string): void {
      this.setSettings({ contentWidth })
    },
    setCollapsed(collapsed: boolean): void {
      this.setSettings({ collapsed })
    },
    resetSettings(): void {
      this.setSettings(settingsInfoDefault)
    }
  }
})

export function useSettingsStoreWithOut() {
  return useSettingsStore(store)
}

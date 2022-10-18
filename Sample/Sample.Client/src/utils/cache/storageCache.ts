export interface CreateStorageParams {
  prefixKey: string
  storage: Storage
}

export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage
}: Partial<CreateStorageParams> = {}) => {
  const WebStorage = class WebStorage {
    private prefixKey: string
    private storage: Storage

    constructor() {
      this.prefixKey = prefixKey
      this.storage = storage
    }

    private getKey(key: string): string {
      return `${this.prefixKey}_${key}`.toUpperCase()
    }

    get<T = any>(key: string, def: any = null): T {
      const val = this.storage.getItem(this.getKey(key))
      if (!val) return def

      try {
        const { value } = JSON.parse(val)
        return value
      } catch (e) {
        return def
      }
    }

    clear(): void {
      this.storage.clear();
    }

    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    set<T = any>(key: string, value: T) {
      const stringifyData = JSON.stringify({ value })
      this.storage.setItem(this.getKey(key), stringifyData)
    }
  }

  return new WebStorage()
}

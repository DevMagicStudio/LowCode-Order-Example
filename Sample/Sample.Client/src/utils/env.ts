import pkg from '../../package.json'

export function getStorageShortName() {
  return `${getCommonStoragePrefix()}__${pkg.version}`.toUpperCase()
}

export function getCommonStoragePrefix() {
  const { VITE_APP_TITLE } = import.meta.env
  return `${VITE_APP_TITLE}__${getEnv()}`.toUpperCase().replace(/\s/g, '')
}

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return import.meta.env.MODE
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD
}

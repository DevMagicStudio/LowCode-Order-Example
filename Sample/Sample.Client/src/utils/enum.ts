import { EnumType } from '@/types'

/**
 * @description get enum dispayName
 */
export const getEnumDisplayName = function (
  value: any,
  enumData: EnumType[]
): number | string {
  const data: EnumType | undefined = enumData.find(item => item.value === value)
  return data ? data.displayName : ''
}

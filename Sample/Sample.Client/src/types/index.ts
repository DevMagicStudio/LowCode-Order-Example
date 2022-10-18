export type Direction = 'left' | 'center' | 'right'

export interface EnumType {
  value: string | number
  displayName: string | number
}

export interface BasicPageParams {
  pageSize: number
  pageNum: number
}

export interface TimeRange {
  time?: string[]
}

export interface DateTimeRange {
  dateTime?: string[]
}

export interface RenderColumnsFn<T> {
  (data: { text: any; record: T; index: number }): any
}

export interface BasicTableColumn<T = any> {
  title: string
  dataIndex?: string
  width?: number
  fixed?: boolean | Direction
  align?: Direction
  ellipsis?: boolean
  checked?: boolean
  rank?: number
  name?: string
  isCheck?: boolean
  customRender?: RenderColumnsFn<T>
}

export enum Handler {
  Edit,
  Detail,
  Delete
}

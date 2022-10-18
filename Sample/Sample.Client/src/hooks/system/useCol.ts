export default function useCol(isList?: boolean) {
  const getBindCol = {
    labelCol: isList
      ? { xxxl: 5, xl: 8, lg: 9, md: 12, sm: 14 }
      : { xxl: 4, lg: 6, md: 7, sm: 9 },
    wrapperCol: { xxl: 19, lg: 18, md: 17, sm: 15 }
  }
  const getBindColumn = {
    column: { xxl: 2, xl: 1, md: 1 }
  }
  const getBindPageCol = {
    labelCol: { xxxl: 3, xxl: 4, lg: 6, md: 7, sm: 9 }
  }

  return {
    getBindCol,
    getBindColumn,
    getBindPageCol
  }
}

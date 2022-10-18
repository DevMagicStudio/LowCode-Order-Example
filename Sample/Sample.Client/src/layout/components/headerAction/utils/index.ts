import { updateColorWeak, updateGrayMode } from '@/utils/theme'

export const useAppDisplay = (type: string, status: boolean) => {
  switch (type) {
    case 'colorWeak':
      setColorWeak(status)
      break
    case 'grayMode':
      setGrayMode(status)
  }
}

export const setColorWeak = (status: boolean) => {
  updateColorWeak(status)
}

export const setGrayMode = (status: boolean) => {
  updateGrayMode(status)
}

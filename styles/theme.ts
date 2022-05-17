const orange = '#f45511'

export const light = {
  colors: {
    primary: orange,
    text: '#000'
  }
}

export type ThemeInterface = typeof light

export const dark: ThemeInterface = {
  colors: {
    primary: orange,
    text: '#fff'
  }
}

const theme = light
export default theme

import color from './color'

export default {
  themeName: 'cherry',
  color,
  //改变主题
  changeTheme(tN) {
    this.themeName = tN
    this.changePrimaryColor(this.themeTable[tN].primaryColor)
  },
  //改变首要颜色
  changePrimaryColor(tC) {
    this.color.primaryColor = tC
    this.color.hexify()
  },
  themeTable: {
    cherry: { primaryColor: 'rgba(255,192,203,0.8)' },
    orange: { primaryColor: 'rgba(255,165,0,0.8)' },
    snowflake: { primaryColor: 'rgba(105, 235, 255,0.8)' }
  }
}

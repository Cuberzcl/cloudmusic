import color from './color'

export default {
  themeName: 'cherry',
  color,
  //改变主题
  changeTheme(tN) {
    this.themeName = tN
    this.changePrimaryColor(this.themeTable[tN].primaryColor)
    this.color.tableColor = this.themeTable[tN].tableColor
  },
  //改变首要颜色
  changePrimaryColor(tC) {
    this.color.primaryColor = tC
    this.color.hexify()
  },
  themeTable: {
    cherry: {
      primaryColor: 'rgba(245, 153, 184,0.8)',
      tableColor: 'rgba(255,105,180,1)'
    },
    orange: { primaryColor: 'rgba(255,165,0,0.8)', tableColor: 'rgba(246,127,80,1)' },
    snowflake: { primaryColor: 'rgba(105, 235, 255,0.8)', tableColor: 'rgba(137, 202, 249,1)' }
  }
}

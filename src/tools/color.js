export default {
  primaryColor: 'rgba(255,192,203,0.8)',
  primaryColorH: '#fff',

  tableColor1: '#fffdff',
  tableColor2: '#f0ffff',

  //rgba 转 十六进制
  hexify() {
    let values = this.primaryColor
      .replace(/rgba?\(/, '')
      .replace(/\)/, '')
      .replace(/[\s+]/g, '')
      .split(',')
    let a = parseFloat(values[3] || 1),
      r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
      g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
      b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
    this.primaryColorH =
      '#' +
      ('0' + r.toString(16)).slice(-2) +
      ('0' + g.toString(16)).slice(-2) +
      ('0' + b.toString(16)).slice(-2)
  }
}

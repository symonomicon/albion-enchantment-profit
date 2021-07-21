function validateFormOnSubmit(values) {
  const getValue = (key) => parseFloat(values[key].value)
  const calculateValue = (base, modifier, multi) => {
    modifier.map((price, index) => {
      let n = index - 1
      let prevMaterial = 0
      while (n != - 1) {
        let prevPrice = modifier[n]
        prevMaterial += prevPrice * multi || 0 
        n--
      }
      const total = base + ((price * multi) + prevMaterial)
      console.log(`Enchantment ${index + 1}: ${total} (Material Price: ${price * multi})`)
    })
    return base + (modifier * multi) 
  }
  const base = getValue('base')
  const materials = [getValue('rune'), getValue('soul'), getValue('relic')]
  const type = getValue('type')
  calculateValue(base, materials, type)
}
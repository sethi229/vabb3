// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qghes
import { translate } from '../../../../../common/i18n'

Blockly.Blocks.rsi = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translate('Relative Strength Index'))
    this.appendValueInput('INPUT')
      .setCheck('Array')
      .appendField(translate('Input List'))
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField(translate('Period'))
    this.setOutput(true, 'Number')
    this.setColour('#dedede')
    this.setTooltip(translate('Relative Strength Index (RSI) from a list with a period'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
}

Blockly.JavaScript.rsi = (block) => {
  const input = Blockly.JavaScript.valueToCode(block,
      'INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '[]'
  const period = Blockly.JavaScript.valueToCode(block,
      'PERIOD', Blockly.JavaScript.ORDER_ATOMIC) || '14'
  const code = `Bot.math.indicators.relativeStrengthIndex(Bot.expect.notEmptyArray(${
  input}), { periods: Bot.expect.indicatorPeriod(${input}, ${period}) })`
  return [code, Blockly.JavaScript.ORDER_NONE]
}

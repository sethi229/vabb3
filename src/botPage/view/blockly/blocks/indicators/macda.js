// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qghes
import { translate } from '../../../../../common/i18n'
import config from '../../../../../common/const'

Blockly.Blocks.macda = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translate('MACD Array'))
      .appendField(new Blockly.FieldDropdown(config.macdFields), 'MACDFIELDS_LIST')
    this.appendValueInput('INPUT')
      .setCheck('Array')
      .appendField(translate('Input List'))
    this.appendValueInput('FAST_EMA_PERIOD')
      .setCheck('Number')
      .appendField(translate('Fast EMA Period'))
    this.appendValueInput('SLOW_EMA_PERIOD')
      .setCheck('Number')
      .appendField(translate('Slow EMA Period'))
    this.appendValueInput('SMA_PERIOD')
      .setCheck('Number')
      .appendField(translate('SMA Period (for Signal)'))
    this.setOutput(true, 'Array')
    this.setColour('#dedede')
    this.setTooltip(translate('Calculates Moving Average Convergence Divergence (MACD) list from a list'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
}

Blockly.JavaScript.macda = (block) => {
  const macdField = block.getFieldValue('MACDFIELDS_LIST')
  const input = Blockly.JavaScript.valueToCode(block,
      'INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '[]'
  const fastEmaPeriod = Blockly.JavaScript.valueToCode(block,
      'FAST_EMA_PERIOD', Blockly.JavaScript.ORDER_ATOMIC) || '12'
  const slowEmaPeriod = Blockly.JavaScript.valueToCode(block,
      'SLOW_EMA_PERIOD', Blockly.JavaScript.ORDER_ATOMIC) || '26'
  const smaPeriod = Blockly.JavaScript.valueToCode(block,
      'SMA_PERIOD', Blockly.JavaScript.ORDER_ATOMIC) || '9'
  const code = `
  (Bot.math.indicators.macdArray(
      Bot.expect.notEmptyArray(${input}),
      {
          fastEmaPeriod: Bot.expect.indicatorPeriod(${input}, ${fastEmaPeriod}),
          slowEmaPeriod: Bot.expect.indicatorPeriod(${input}, ${slowEmaPeriod}),
          smaPeriod: Bot.expect.indicatorPeriod(${input}, ${smaPeriod}),
      }).map(function(el){return el[${macdField}]}))`
  return [code, Blockly.JavaScript.ORDER_NONE]
}

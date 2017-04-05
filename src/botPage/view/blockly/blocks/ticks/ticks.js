// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335
import { mainScope } from '../../relationChecker'
import { translate } from '../../../../../common/i18n'

Blockly.Blocks.ticks = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translate('Ticks List'))
    this.setOutput(true, 'Array')
    this.setColour('#f2f2f2')
    this.setTooltip(translate('Returns the list of tick values'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    mainScope(this, ev, 'Ticks List')
  },
}
Blockly.JavaScript.ticks = () => ['Bot.expect.notEmptyArray(this.ticksObj.ticks).map(function(i){return Bot.expect.tick(i).quote;})',
  Blockly.JavaScript.ORDER_ATOMIC]

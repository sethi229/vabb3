import CustomApi from 'binary-common-utils/lib/customApi'
import { expect } from 'chai'
import { observer } from 'binary-common-utils/lib/observer'
import ws from '../../../common/mock/websocket'
import Context from '../Context'
import PurchaseCtrl from '../purchaseCtrl'

const ticksObj = {
  ticks: [{
    epoch: 'some time',
    quote: 1,
  }, {
    epoch: 'some time',
    quote: 2,
  }],
}

describe('PurchaseCtrl', () => {
  let api
  const proposals = []
  let firstAttempt = true
  let purchaseCtrl
  beforeAll(() => {
    api = new CustomApi(observer, ws)
    const beforePurchase = function beforePurchase() {
      if (purchaseCtrl.proposals) {
        if (firstAttempt) {
          firstAttempt = false
          observer.emit('test.beforePurchase', {
            ticksObj: this.ticksObj,
            proposals: purchaseCtrl.proposals,
          })
        } else {
          observer.emit('test.purchase')
          this.purchase('DIGITEVEN')
        }
      } else {
        observer.emit('test.beforePurchase', {
          ticksObj: this.ticksObj,
          proposals: purchaseCtrl.proposals,
        })
      }
    }
    const context = new Context(beforePurchase)
    purchaseCtrl = new PurchaseCtrl(api, context)
    context.createTicks(ticksObj)
  })
  describe('Make the beforePurchase ready...', () => {
    beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('api.proposal', (_proposal) => {
        proposals.push(_proposal)
        purchaseCtrl.updateProposal(_proposal)
      })
      observer.register('api.authorize', () => {
        observer.register('api.proposal', () => {
          observer.register('api.proposal', () => {
            if (purchaseCtrl.ready) {
              done()
            }
          }, true)
          api.proposal({
            amount: '1.00',
            basis: 'stake',
            contract_type: 'DIGITEVEN',
            currency: 'USD',
            duration: 5,
            duration_unit: 't',
            symbol: 'R_100',
          })
        }, true)
        api.proposal({
          amount: '1.00',
          basis: 'stake',
          contract_type: 'DIGITODD',
          currency: 'USD',
          duration: 5,
          duration_unit: 't',
          symbol: 'R_100',
        })
      }, true)
      api.authorize('nmjKBPWxM00E8Fh')
    })
    it('Strategy gets ready when two proposals are available', () => {
    })
  })
  describe('Adding the ticks to the purchase...', () => {
    let beforePurchaseArgs
    beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('test.beforePurchase', (_beforePurchaseArgs) => {
        beforePurchaseArgs = _beforePurchaseArgs
        done()
      }, true)
      purchaseCtrl.updateTicks(ticksObj)
    })
    it('purchaseCtrl passes ticks and send the proposals if ready', () => {
      expect(beforePurchaseArgs.ticksObj.ticks.slice(-1)[0]).to.have.property('epoch')
      expect(beforePurchaseArgs).to.have.deep.property('.proposals.DIGITODD.longcode')
        .that.is.equal('Win payout if the last digit of Volatility 100 Index is'
        + ' odd after 5 ticks.')
    })
  })
  describe('Waiting for beforePurchase to purchase the contract', () => {
    beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('test.purchase', () => {
        done()
      }, true)
      purchaseCtrl.updateProposal(proposals[1])
      purchaseCtrl.updateTicks()
    })
    it('beforePurchase will buy the proposal whenever decided', () => {
    })
  })
  describe('Waiting for purchase to be finished', () => {
    let finishedContract
    beforeAll(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      observer.register('purchase.finish', (_finishedContract) => {
        finishedContract = _finishedContract
        done()
      }, true)
      purchaseCtrl.updateTicks()
    })
    it('afterPurchase is called whenever the purchase is finished', () => {
      expect(finishedContract).to.have.property('sell_price')
        .that.satisfy((price) => !isNaN(price))
    })
  })
})

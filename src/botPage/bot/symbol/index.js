import { getObjectValue } from 'binary-common-utils/lib/tools'
import config from '../../../common/const'
import ActiveSymbols from './activeSymbols'

import { noop } from '../tools'

let parsedAssetIndex

const parseAssetIndex = assetIndex => {
  const parsed = {}

  assetIndex.forEach(symbol => {
    parsed[symbol[0].toLowerCase()] = {}

    symbol[2].forEach(category => {
      parsed[symbol[0].toLowerCase()][category[0].toLowerCase()] = category[2]
    })
  })
  return parsed
}

const getAllowedConditionsOrCategoriesForSymbol = symbol => {
  let conditions = []
  const categories = []
  const index = parsedAssetIndex[symbol.toLowerCase()]
  if (index) {
    Object.keys(config.conditionsCategory).forEach(conditionName => {
      if (conditionName in index) {
        conditions = conditions.concat(config.conditionsCategory[conditionName])
        categories.push(conditionName)
      }
    })
  }
  return { conditions, categories }
}

const getCategoryForCondition = condition =>
  Object.keys(config.conditionsCategory).find(category =>
    config.conditionsCategory[category].indexOf(condition.toLowerCase()) >= 0)

export default class _Symbol {
  constructor(api) {
    this.api = api.originalApi
    this.initPromise = new Promise(resolve => {
      this.api.getActiveSymbolsBrief().then(r => {
        this.activeSymbols = new ActiveSymbols(r.active_symbols)
        this.api.getAssetIndex().then(r2 => {
          parsedAssetIndex = parseAssetIndex(r2.asset_index)
          resolve()
        }, noop)
      }, noop)
    })
  }
  getLimitation(symbol, condition) {
    const category = getCategoryForCondition(condition)
    return {
      minDuration: parsedAssetIndex[symbol.toLowerCase()][category],
    }
  }
  isConditionAllowedInSymbol(symbol, condition) {
    const { conditions } = getAllowedConditionsOrCategoriesForSymbol(symbol)
    return conditions.includes(condition)
  }
  getConditionName(condition) {
    const [con1, con2] = config.opposites[condition.toUpperCase()]
    return `${getObjectValue(con1)}/${getObjectValue(con2)}`
  }
  getCategoryNameForCondition(condition) {
    return config.conditionsCategoryName[getCategoryForCondition(condition)]
  }
  getAllowedCategories(symbol) {
    return getAllowedConditionsOrCategoriesForSymbol(symbol).categories
  }
  getAllowedCategoryNames(symbol) {
    const { categories } = getAllowedConditionsOrCategoriesForSymbol(symbol)
    return categories.map(el => config.conditionsCategoryName[el])
  }
}

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// eslint-disable-line import/no-unresolved

var isEqual = function isEqual(obj1, obj2) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(obj1)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var k = _step.value;

      if (!(k in obj2) || obj1[k] !== obj2[k]) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.keys(obj2)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _k = _step2.value;

      if (!(_k in obj2) || obj1[_k] !== obj2[_k]) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return true;
};

var WebSocket = function () {
  function WebSocket(url) {
    var _this = this;

    _classCallCheck(this, WebSocket);

    this.delay = 10;
    this.url = url;
    this.bufferedResponses = [];
    // providing ws interface
    this.readyState = 0;
    this.onopen = null;
    this.onclose = null;
    this.onerror = null;
    this.onmessage = null;
    // open automatically on creation
    setTimeout(function () {
      _this.readyState = 1;
      _this.onopen();
    }, this.delay * 10);
  }

  _createClass(WebSocket, [{
    key: 'getResponse',
    value: function getResponse(reqData, onmessage) {
      if ('forget_all' in reqData || 'subscribe' in reqData && reqData.subscribe === 0) {
        this.handleForget(reqData, onmessage);
      } else {
        var database = this.findDataInBuffer(reqData);
        database = !this.isEmpty(database) ? database : _database2.default;
        this.parseDb(database, reqData, onmessage);
      }
    }
  }, {
    key: 'parseDb',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(database, reqData, onmessage) {
        var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, callName, callResTypes, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, callResTypeName, respData;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context.prev = 3;
                _iterator3 = Object.keys(database)[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context.next = 40;
                  break;
                }

                callName = _step3.value;

                if (!(callName in reqData || (callName === 'candles' || callName === 'history') && 'ticks_history' in reqData)) {
                  _context.next = 37;
                  break;
                }

                callResTypes = database[callName];
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context.prev = 12;
                _iterator4 = Object.keys(callResTypes)[Symbol.iterator]();

              case 14:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context.next = 23;
                  break;
                }

                callResTypeName = _step4.value;
                respData = this.findKeyInObj(callResTypes[callResTypeName], reqData);

                if (!respData) {
                  _context.next = 20;
                  break;
                }

                _context.next = 20;
                return this.passMessageOn(reqData, respData, onmessage);

              case 20:
                _iteratorNormalCompletion4 = true;
                _context.next = 14;
                break;

              case 23:
                _context.next = 29;
                break;

              case 25:
                _context.prev = 25;
                _context.t0 = _context['catch'](12);
                _didIteratorError4 = true;
                _iteratorError4 = _context.t0;

              case 29:
                _context.prev = 29;
                _context.prev = 30;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 32:
                _context.prev = 32;

                if (!_didIteratorError4) {
                  _context.next = 35;
                  break;
                }

                throw _iteratorError4;

              case 35:
                return _context.finish(32);

              case 36:
                return _context.finish(29);

              case 37:
                _iteratorNormalCompletion3 = true;
                _context.next = 5;
                break;

              case 40:
                _context.next = 46;
                break;

              case 42:
                _context.prev = 42;
                _context.t1 = _context['catch'](3);
                _didIteratorError3 = true;
                _iteratorError3 = _context.t1;

              case 46:
                _context.prev = 46;
                _context.prev = 47;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 49:
                _context.prev = 49;

                if (!_didIteratorError3) {
                  _context.next = 52;
                  break;
                }

                throw _iteratorError3;

              case 52:
                return _context.finish(49);

              case 53:
                return _context.finish(46);

              case 54:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 42, 46, 54], [12, 25, 29, 37], [30,, 32, 36], [47,, 49, 53]]);
      }));

      function parseDb(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return parseDb;
    }()
  }, {
    key: 'passMessageOn',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(reqData, respData, onmessage) {
        var first, i, newTick, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, rd;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.isEmpty(respData.next)) {
                  this.bufferedResponses.push(respData.next);
                }

                if (!reqData.subscribe) {
                  _context2.next = 45;
                  break;
                }

                if (!('ticks_history' in reqData)) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 5;
                return this.delayedOnMessage(reqData, respData.data[0], onmessage);

              case 5:
                first = respData.data[1];
                i = 0;

              case 7:
                if (!(i < 60)) {
                  _context2.next = 15;
                  break;
                }

                newTick = _extends({}, first);

                if ('ohlc' in first) {
                  newTick.ohlc.close = '' + (+first.ohlc.close + i * 0.1);
                  newTick.ohlc.epoch = '' + (+first.ohlc.epoch + i * 2);
                } else {
                  newTick.tick.epoch = '' + (+first.tick.epoch + i * 2);
                  newTick.tick.quote = '' + (+first.tick.quote + i * 0.1);
                }
                _context2.next = 12;
                return this.delayedOnMessage(reqData, newTick, onmessage);

              case 12:
                i++;
                _context2.next = 7;
                break;

              case 15:
                _context2.next = 43;
                break;

              case 17:
                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context2.prev = 20;
                _iterator5 = respData.data[Symbol.iterator]();

              case 22:
                if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                  _context2.next = 29;
                  break;
                }

                rd = _step5.value;
                _context2.next = 26;
                return this.delayedOnMessage(reqData, rd, onmessage);

              case 26:
                _iteratorNormalCompletion5 = true;
                _context2.next = 22;
                break;

              case 29:
                _context2.next = 35;
                break;

              case 31:
                _context2.prev = 31;
                _context2.t0 = _context2['catch'](20);
                _didIteratorError5 = true;
                _iteratorError5 = _context2.t0;

              case 35:
                _context2.prev = 35;
                _context2.prev = 36;

                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }

              case 38:
                _context2.prev = 38;

                if (!_didIteratorError5) {
                  _context2.next = 41;
                  break;
                }

                throw _iteratorError5;

              case 41:
                return _context2.finish(38);

              case 42:
                return _context2.finish(35);

              case 43:
                _context2.next = 47;
                break;

              case 45:
                _context2.next = 47;
                return this.delayedOnMessage(reqData, respData.data, onmessage);

              case 47:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[20, 31, 35, 43], [36,, 38, 42]]);
      }));

      function passMessageOn(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return passMessageOn;
    }()
  }, {
    key: 'delayedOnMessage',
    value: function delayedOnMessage(reqData, respData, onmessage) {
      var _this2 = this;

      return new Promise(function (r) {
        setTimeout(function () {
          respData.echo_req.req_id = respData.req_id = reqData.req_id;
          onmessage(JSON.stringify(respData));
          r();
        }, _this2.delay);
      });
    }
  }, {
    key: 'handleForget',
    value: function handleForget(reqData, onmessage) {
      setTimeout(function () {
        onmessage(JSON.stringify({
          echo_req: {
            req_id: reqData.req_id,
            forget_all: 'ticks'
          },
          req_id: reqData.req_id,
          forget_all: [],
          msg_type: 'forget_all'
        }));
      }, this.delay);
    }
  }, {
    key: 'findDataInBuffer',
    value: function findDataInBuffer(reqData) {
      var result = null;
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.bufferedResponses[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var database = _step6.value;
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = Object.keys(database)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var callName = _step7.value;

              if ((callName === 'candles' || callName === 'history') && 'ticks_history' in reqData || callName in reqData) {
                var callResTypes = database[callName];
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                  for (var _iterator8 = Object.keys(callResTypes)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var callResTypeName = _step8.value;

                    var respData = this.findKeyInObj(callResTypes[callResTypeName], reqData);
                    if (respData) {
                      result = database;
                    }
                  }
                } catch (err) {
                  _didIteratorError8 = true;
                  _iteratorError8 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                      _iterator8.return();
                    }
                  } finally {
                    if (_didIteratorError8) {
                      throw _iteratorError8;
                    }
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return result;
    }
  }, {
    key: 'removeReqId',
    value: function removeReqId(_data) {
      var data = _extends({}, _data);
      delete data.req_id;
      if (data.echo_req) {
        delete data.echo_req.req_id;
      }
      return data;
    }
  }, {
    key: 'findKeyInObj',
    value: function findKeyInObj(obj1, obj2) {
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = Object.keys(obj1)[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var key = _step9.value;

          if (isEqual(this.removeReqId(JSON.parse(key)), this.removeReqId(obj2))) {
            return obj1[key];
          }
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      return null;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(obj) {
      return !obj || obj instanceof Array && !obj.length || !Object.keys(obj).length;
    }
  }, {
    key: 'send',
    value: function send(rawData) {
      var _this3 = this;

      if (this.readyState === 0) {
        return;
      }
      var reqData = JSON.parse(rawData);
      this.getResponse(reqData, function (receivedData) {
        if (_this3.readyState) {
          _this3.onmessage({
            data: receivedData
          });
        }
      });
    }
  }, {
    key: 'close',
    value: function close() {
      this.readyState = 0;
      this.bufferedResponses = [];
      this.onopen = null;
      this.onclose = null;
      this.onerror = null;
      this.onmessage = null;
    }
  }]);

  return WebSocket;
}();

exports.default = WebSocket;


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactJsPagination = _interopRequireDefault(require("react-js-pagination"));

require("./sayur.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StatusRow = function StatusRow(props) {
  var colSpan = props.colSpan,
      message = props.message;
  return _react.default.createElement("tr", null, _react.default.createElement("td", {
    colSpan: colSpan,
    className: "text-center"
  }, message));
};

StatusRow.propTypes = {
  colSpan: _propTypes.default.number.isRequired,
  message: _propTypes.default.string.isRequired
};

var RowCell = function RowCell(props) {
  var row = props.row,
      col = props.col;
  if (col.formatter) return _react.default.createElement("td", null, col.formatter(row));
  return _react.default.createElement("td", null, row[col.key]);
};

RowCell.propTypes = {
  row: _propTypes.default.object.isRequired,
  col: _propTypes.default.object.isRequired
};

var SayurTable =
/*#__PURE__*/
function (_Component) {
  _inherits(SayurTable, _Component);

  function SayurTable(props) {
    var _this;

    _classCallCheck(this, SayurTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SayurTable).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handlePageChange", function (pageNumber) {
      _this.setState({
        page: pageNumber
      });

      _this.props.onPageChanged({
        currentPage: pageNumber
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSort", function (_ref) {
      var row = _ref.row,
          desc = _ref.desc;

      _this.setState({
        sortBy: row.key,
        desc: !desc
      });

      _this.props.onSort({
        sortBy: row.key,
        desc: !desc
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderBody", function (_ref2) {
      var loading = _ref2.loading,
          rows = _ref2.rows,
          columns = _ref2.columns,
          networkStatus = _ref2.networkStatus;

      if (loading) {
        return _react.default.createElement(StatusRow, {
          message: "Loading ...",
          colSpan: columns.length + 1
        });
      } else if (networkStatus == 8) {
        return _react.default.createElement(StatusRow, {
          message: "Error ...",
          colSpan: columns.length + 1
        });
      } else {
        if (!rows || rows.length == 0) {
          return _react.default.createElement(StatusRow, {
            message: "No Data",
            colSpan: columns.length + 1
          });
        } else {
          return rows.map(function (row, index) {
            return _react.default.createElement("tr", {
              key: index
            }, _react.default.createElement("td", null, index + 1), columns.map(function (col, index) {
              return _react.default.createElement(RowCell, {
                key: index,
                row: row,
                col: col
              });
            }));
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderSortIcons", function (_ref3) {
      var key = _ref3.key;
      var _this$state = _this.state,
          sortBy = _this$state.sortBy,
          desc = _this$state.desc;

      if (key == sortBy && desc) {
        return _react.default.createElement("i", {
          className: "sort-by-desc",
          style: {
            float: "right"
          }
        });
      } else if (key == sortBy && !desc) {
        return _react.default.createElement("i", {
          className: "sort-by-asc",
          style: {
            float: "right"
          }
        });
      } else {
        return _react.default.createElement("span", {
          className: "pull-right",
          style: {
            float: "right"
          }
        }, _react.default.createElement("i", {
          className: "sort-by-desc"
        }), " ", _react.default.createElement("i", {
          className: "sort-by-asc"
        }), " ");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderColumnHeader", function (_ref4) {
      var columns = _ref4.columns;
      var desc = _this.state.desc;
      return columns.map(function (row, index) {
        if (row.sortable) {
          return _react.default.createElement("th", {
            key: index,
            onClick: function onClick() {
              return _this.handleSort({
                row: row,
                desc: desc
              });
            },
            style: {
              color: "white",
              cursor: "pointer"
            }
          }, _react.default.createElement("strong", null, _this.renderSortIcons({
            key: row.key
          }), row.label));
        } else return _react.default.createElement("th", {
          key: index
        }, _react.default.createElement("strong", null, row.label));
      });
    });

    var page = _this.props.page;
    _this.state = {
      page: page,
      sortBy: "",
      desc: false
    };
    return _this;
  }

  _createClass(SayurTable, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          loading = _this$props.loading,
          columns = _this$props.columns,
          rows = _this$props.rows,
          page = _this$props.page,
          elements = _this$props.elements,
          total = _this$props.total,
          networkStatus = _this$props.networkStatus,
          refetch = _this$props.refetch;
      return _react.default.createElement("div", {
        className: "panel panel-default"
      }, _react.default.createElement("div", {
        className: "panel-body"
      }, _react.default.createElement("div", {
        className: "form-inline"
      }, refetch ? _react.default.createElement("button", {
        style: {
          float: "left",
          margin: "0"
        },
        onClick: function onClick() {
          return refetch();
        },
        className: "btn btn-default btn-sm"
      }, _react.default.createElement("i", {
        className: "fa fa-refresh"
      })) : null, _react.default.createElement(_reactJsPagination.default, {
        innerClass: "pagination pagination-margin",
        activePage: this.state.page,
        itemsCountPerPage: elements,
        totalItemsCount: total,
        onChange: this.handlePageChange
      }))), _react.default.createElement("table", {
        className: "table table-condensed table-striped",
        style: {
          border: "1px #9CB93B solid"
        }
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", {
        style: {
          backgroundColor: "#9CB93B",
          color: "white"
        }
      }, _react.default.createElement("th", null, "No"), this.renderColumnHeader({
        columns: columns
      }))), _react.default.createElement("tbody", null, this.renderBody({
        loading: loading,
        rows: rows,
        columns: columns,
        networkStatus: networkStatus
      }))));
    }
  }]);

  return SayurTable;
}(_react.Component);

SayurTable.propTypes = {
  loading: _propTypes.default.bool,
  columns: _propTypes.default.array.isRequired,
  rows: _propTypes.default.array.isRequired,
  limit: _propTypes.default.number.isRequired,
  page: _propTypes.default.number.isRequired,
  elements: _propTypes.default.number.isRequired,
  total: _propTypes.default.number.isRequired,
  totalPage: _propTypes.default.number.isRequired,
  refetch: _propTypes.default.func,
  networkStatus: _propTypes.default.number,
  onPageChanged: _propTypes.default.func,
  onSort: _propTypes.default.func
};
var _default = SayurTable;
exports.default = _default;
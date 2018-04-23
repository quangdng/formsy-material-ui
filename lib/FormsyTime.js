"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _formsyReact = require("formsy-react");

var _TimePicker = require("material-ui/TimePicker");

var _TimePicker2 = _interopRequireDefault(_TimePicker);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormsyTime = (0, _createReactClass2.default)({
  displayName: "FormsyTime",

  propTypes: {
    defaultTime: _propTypes2.default.object,
    name: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func,
    validationError: _propTypes2.default.string,
    validationErrors: _propTypes2.default.object,
    validations: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    value: _propTypes2.default.object
  },

  componentDidMount: function componentDidMount() {
    var defaultTime = this.props.defaultTime;

    var value = this.props.getValue();

    if (typeof value === "undefined" && typeof defaultTime !== "undefined") {
      this.props.setValue(defaultTime);
    }
  },
  handleChange: function handleChange(event, value) {
    this.props.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },


  setMuiComponentAndMaybeFocus: _utils.setMuiComponentAndMaybeFocus,

  render: function render() {
    var _props = this.props,
        defaultTime = _props.defaultTime,
        validations = _props.validations,
        validationError = _props.validationError,
        validationErrors = _props.validationErrors,
        rest = _objectWithoutProperties(_props, ["defaultTime", "validations", "validationError", "validationErrors"]);

    var _props2 = this.props,
        isRequired = _props2.isRequired,
        isPristine = _props2.isPristine,
        isValid = _props2.isValid,
        isFormSubmitted = _props2.isFormSubmitted;


    return _react2.default.createElement(_TimePicker2.default, _extends({
      disabled: this.props.isFormDisabled()
    }, rest, {
      errorText: this.props.getErrorMessage() ? this.props.getErrorMessage() : isRequired() && !isValid() && !isPristine() ? "This field is required" : null,
      onChange: this.handleChange,
      ref: this.setMuiComponentAndMaybeFocus,
      value: this.props.getValue()
    }));
  }
});

exports.default = (0, _formsyReact.withFormsy)(FormsyTime);
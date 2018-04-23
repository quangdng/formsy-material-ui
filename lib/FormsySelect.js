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

var _SelectField = require("material-ui/SelectField");

var _SelectField2 = _interopRequireDefault(_SelectField);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormsySelect = (0, _createReactClass2.default)({
  displayName: "FormsySelect",

  propTypes: {
    children: _propTypes2.default.node,
    name: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func,
    requiredError: _propTypes2.default.string,
    validationError: _propTypes2.default.string,
    validationErrors: _propTypes2.default.object,
    validations: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    value: _propTypes2.default.any
  },

  getInitialState: function getInitialState() {
    return {
      hasChanged: false
    };
  },
  handleChange: function handleChange(event, index, value) {
    this.props.setValue(value);

    this.setState({
      hasChanged: value !== ""
    });

    if (this.props.onChange) this.props.onChange(event, value, index);
  },


  setMuiComponentAndMaybeFocus: _utils.setMuiComponentAndMaybeFocus,

  render: function render() {
    var _props = this.props,
        requiredError = _props.requiredError,
        validations = _props.validations,
        validationError = _props.validationError,
        validationErrors = _props.validationErrors,
        valueProp = _props.value,
        rest = _objectWithoutProperties(_props, ["requiredError", "validations", "validationError", "validationErrors", "value"]);

    var _props2 = this.props,
        isRequired = _props2.isRequired,
        isPristine = _props2.isPristine,
        isValid = _props2.isValid,
        isFormSubmitted = _props2.isFormSubmitted;

    var isRequiredError = isRequired() && !isPristine() && !isValid() && (requiredError || "This field is required");
    var value = this.state.hasChanged ? this.props.getValue() : valueProp;
    var errorText = this.props.getErrorMessage() || isRequiredError;

    return _react2.default.createElement(
      _SelectField2.default,
      _extends({
        disabled: this.props.isFormDisabled(),
        errorText: errorText,
        onChange: this.handleChange,
        ref: this.setMuiComponentAndMaybeFocus,
        value: value
      }, rest),
      this.props.children
    );
  }
});

exports.default = (0, _formsyReact.withFormsy)(FormsySelect);
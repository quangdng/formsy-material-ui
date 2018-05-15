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

var _keycode = require("keycode");

var _keycode2 = _interopRequireDefault(_keycode);

var _formsyReact = require("formsy-react");

var _TextField = require("material-ui/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormsyText = (0, _createReactClass2.default)({
  displayName: "FormsyText",

  propTypes: {
    defaultValue: _propTypes2.default.any,
    name: _propTypes2.default.string.isRequired,
    onBlur: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onKeyDown: _propTypes2.default.func,
    requiredError: _propTypes2.default.string,
    underlineFocusStyle: _propTypes2.default.object,
    underlineStyle: _propTypes2.default.object,
    updateImmediately: _propTypes2.default.bool,
    validationColor: _propTypes2.default.string,
    validationError: _propTypes2.default.string,
    validationErrors: _propTypes2.default.object,
    validations: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    value: _propTypes2.default.any
  },

  getDefaultProps: function getDefaultProps() {
    return {
      underlineFocusStyle: {},
      underlineStyle: {}
    };
  },
  getInitialState: function getInitialState() {
    var value = this.controlledValue();
    return { value: value };
  },
  componentWillMount: function componentWillMount() {
    if (this.controlledValue()) {
      this.props.setValue(this.controlledValue());
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var isValueChanging = nextProps.value !== this.props.value;
    if (isValueChanging || nextProps.defaultValue !== this.props.defaultValue) {
      var value = this.controlledValue(nextProps);
      var isValid = this.props.isValidValue(value);

      if (isValueChanging || this.props.defaultValue === this.props.getValue()) {
        this.setState({ value: value, isValid: isValid });
        this.props.setValue(value);
      }
    }
  },
  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    if (nextState._isPristine && // eslint-disable-line no-underscore-dangle
    nextState._isPristine !== this.state._isPristine) {
      // eslint-disable-line no-underscore-dangle
      // Calling state here is valid, as it cannot cause infinite recursion.
      var value = this.controlledValue(nextProps);
      var isValid = this.props.isValidValue(value);
      this.props.setValue(value);
      this.setState({ value: value, isValid: isValid });
    }
  },
  controlledValue: function controlledValue() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

    return props.value || props.defaultValue || "";
  },
  handleBlur: function handleBlur(event) {
    this.props.setValue(event.currentTarget.value);
    delete this.changeValue;
    if (this.props.onBlur) this.props.onBlur(event);
  },
  handleChange: function handleChange(event) {
    // Update the value (and so display any error) after a timeout.
    if (this.props.updateImmediately) {
      if (!this.changeValue) {
        this.changeValue = (0, _utils.debounce)(this.props.setValue, 400);
      }
      this.changeValue(event.currentTarget.value);
    } else {
      // If there was an error (on loss of focus) update on each keypress to resolve same.
      if (this.props.getErrorMessage() != null) {
        this.props.setValue(event.currentTarget.value);
      } else {
        // Only update on valid values, so as to not generate an error until focus is lost.
        if (this.props.isValidValue(event.target.value)) {
          this.props.setValue(event.currentTarget.value);
          // If it becomes invalid, and there isn't an error message, invalidate without error.
        }
      }
    }

    // Controlled component
    this.setState({ value: event.currentTarget.value, isValid: this.props.isValidValue(event.currentTarget.value) });
    if (this.props.onChange) this.props.onChange(event, event.currentTarget.value);
  },
  handleKeyDown: function handleKeyDown(event) {
    if ((0, _keycode2.default)(event) === "enter") this.props.setValue(event.currentTarget.value);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  },


  setMuiComponentAndMaybeFocus: _utils.setMuiComponentAndMaybeFocus,

  render: function render() {
    var _props = this.props,
        requiredError = _props.requiredError,
        rest = _objectWithoutProperties(_props, ["requiredError"]);

    var _props2 = this.props,
        isRequired = _props2.isRequired,
        isPristine = _props2.isPristine,
        isValid = _props2.isValid,
        isFormSubmitted = _props2.isFormSubmitted;

    var isRequiredError = isRequired() && !isPristine() && !isValid() && (requiredError || "This field is required");
    var errorText = this.props.getErrorMessage() || isRequiredError;

    return _react2.default.createElement(_TextField2.default, _extends({}, rest, {
      id: "text-field-controlled",
      disabled: this.props.isFormDisabled(),
      errorText: errorText,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown,
      ref: this.setMuiComponentAndMaybeFocus,
      value: this.state.value
    }));
  }
});

exports.default = (0, _formsyReact.withFormsy)(FormsyText);
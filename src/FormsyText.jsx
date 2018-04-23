import PropTypes from "prop-types"
import React from "react"
import createReactClass from "create-react-class"
import keycode from "keycode"
import { withFormsy } from "formsy-react"
import TextField from "material-ui/TextField"
import { setMuiComponentAndMaybeFocus, debounce } from "./utils"

const FormsyText = createReactClass({
  displayName: "FormsyText",

  propTypes: {
    defaultValue: PropTypes.any,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    requiredError: PropTypes.string,
    underlineFocusStyle: PropTypes.object,
    underlineStyle: PropTypes.object,
    updateImmediately: PropTypes.bool,
    validationColor: PropTypes.string,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.any
  },


  defaultProps: {
    underlineFocusStyle: {},
    underlineStyle: {}
  },

  getInitialState() {
    const value = this.controlledValue()
    return { value }
  },

  componentWillMount() {
    if (this.controlledValue()) {
      this.props.setValue(this.controlledValue())
    }
  },

  componentWillReceiveProps(nextProps) {
    const isValueChanging = nextProps.value !== this.props.value
    if (isValueChanging || nextProps.defaultValue !== this.props.defaultValue) {
      const value = this.controlledValue(nextProps)
      const isValid = this.isValidValue(value)

      if (isValueChanging || this.props.defaultValue === this.props.getValue()) {
        this.setState({ value, isValid })
        this.props.setValue(value)
      }
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextState._isPristine && // eslint-disable-line no-underscore-dangle
      nextState._isPristine !== this.state._isPristine) { // eslint-disable-line no-underscore-dangle
      // Calling state here is valid, as it cannot cause infinite recursion.
      const value = this.controlledValue(nextProps)
      const isValid = this.isValidValue(value)
      this.props.setValue(value)
      this.setState({ value, isValid })
    }
  },

  controlledValue(props = this.props) {
    return props.value || props.defaultValue || ""
  },

  handleBlur(event) {
    this.props.setValue(event.currentTarget.value)
    delete this.changeValue
    if (this.props.onBlur) this.props.onBlur(event)
  },

  handleChange(event) {
    // Update the value (and so display any error) after a timeout.
    if (this.props.updateImmediately) {
      if (!this.changeValue) {
        this.changeValue = debounce(this.props.setValue, 400)
      }
      this.changeValue(event.currentTarget.value)
    } else {
      // If there was an error (on loss of focus) update on each keypress to resolve same.
      if (this.props.getErrorMessage() != null) {
        this.props.setValue(event.currentTarget.value)
      } else {
        // Only update on valid values, so as to not generate an error until focus is lost.
        if (this.isValidValue(event.target.value)) {
          this.props.setValue(event.currentTarget.value)
          // If it becomes invalid, and there isn't an error message, invalidate without error.
        }
      }
    }

    // Controlled component
    this.setState({ value: event.currentTarget.value, isValid: this.isValidValue(event.currentTarget.value) })
    if (this.props.onChange) this.props.onChange(event, event.currentTarget.value)
  },

  handleKeyDown(event) {
    if (keycode(event) === "enter") this.props.setValue(event.currentTarget.value)
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value)
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      requiredError,
      ...rest
    } = this.props

    const { isRequired, isPristine, isValid, isFormSubmitted } = this.props
    const isRequiredError = isRequired() && !isPristine() && !isValid() && (requiredError || "This field is required")
    const errorText = this.props.getErrorMessage() || isRequiredError

    return (
      <TextField
        disabled={this.props.isFormDisabled()}
        errorText={errorText}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.state.value}
        {...rest}
      />
    )
  }
})

export default withFormsy(FormsyText)

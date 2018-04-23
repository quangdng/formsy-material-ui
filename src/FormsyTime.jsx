import PropTypes from "prop-types"
import React from "react"
import createReactClass from "create-react-class"
import { withFormsy } from "formsy-react"
import TimePicker from "material-ui/TimePicker"
import { setMuiComponentAndMaybeFocus } from "./utils"

const FormsyTime = createReactClass({
  displayName: "FormsyTime",

  propTypes: {
    defaultTime: PropTypes.object,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.object
  },

  componentDidMount() {
    const { defaultTime } = this.props
    const value = this.props.getValue()

    if (typeof value === "undefined" && typeof defaultTime !== "undefined") {
      this.props.setValue(defaultTime)
    }
  },

  handleChange(event, value) {
    this.props.setValue(value)
    if (this.props.onChange) this.props.onChange(event, value)
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      defaultTime, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props

    const { isRequired, isPristine, isValid, isFormSubmitted } = this.props

    return (
      <TimePicker
        disabled={this.props.isFormDisabled()}
        {...rest}
        errorText={this.props.getErrorMessage() ? this.props.getErrorMessage() :
          (isRequired() && !isValid() && !isPristine()) ? "This field is required" : null}
        onChange={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.props.getValue()}
      />
    )
  }
})

export default withFormsy(FormsyTime)

import PropTypes from "prop-types"
import React from "react"
import createReactClass from "create-react-class"
import { withFormsy } from "formsy-react"
import DatePicker from "material-ui/DatePicker"
import { setMuiComponentAndMaybeFocus } from "./utils"

const FormsyDate = createReactClass({
  displayName: "FormsyDate",

  propTypes: {
    defaultDate: PropTypes.object,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    requiredError: PropTypes.string,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.object
  },


  componentDidMount() {
    const { defaultDate } = this.props
    const value = this.props.getValue()

    if (typeof value === "undefined" && typeof defaultDate !== "undefined") {
      this.props.setValue(defaultDate)
    }
  },

  handleChange(event, value) {
    this.props.setValue(value)
    if (this.props.onChange) this.props.onChange(event, value)
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      defaultDate, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      requiredError,
      ...rest
    } = this.props
    const { isRequired, isPristine, isValid, isFormSubmitted } = this.props
    const isRequiredError = isRequired() && !isPristine() && !isValid() && (requiredError || "This field is required")
    const errorText = this.props.getErrorMessage() || isRequiredError
    return (
      <DatePicker
        disabled={this.props.isFormDisabled()}
        {...rest}
        errorText={errorText}
        onChange={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.props.getValue()}
      />
    )
  }
})

export default withFormsy(FormsyDate)

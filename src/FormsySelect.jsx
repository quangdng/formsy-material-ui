import PropTypes from "prop-types"
import React from "react"
import createReactClass from "create-react-class"
import { withFormsy } from "formsy-react"
import SelectField from "material-ui/SelectField"
import { setMuiComponentAndMaybeFocus } from "./utils"

const FormsySelect = createReactClass({
  displayName: "FormsySelect",

  propTypes: {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    requiredError: PropTypes.string,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.any
  },

  getInitialState() {
    return {
      hasChanged: false
    }
  },

  handleChange(event, index, value) {
    this.props.setValue(value)

    this.setState({
      hasChanged: value !== ""
    })

    if (this.props.onChange) this.props.onChange(event, value, index)
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      requiredError,
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      value: valueProp,
      ...rest
    } = this.props

    const { isRequired, isPristine, isValid, isFormSubmitted } = this.props
    const isRequiredError = isRequired() && !isPristine() && !isValid() && (requiredError || "This field is required")
    const value = this.state.hasChanged ? this.props.getValue() : valueProp
    const errorText = this.props.getErrorMessage() || isRequiredError

    return (
      <SelectField
        disabled={this.props.isFormDisabled()}
        errorText={errorText}
        onChange={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        value={value}
        {...rest}
      >
        {this.props.children}
      </SelectField>
    )
  }
})

export default withFormsy(FormsySelect)

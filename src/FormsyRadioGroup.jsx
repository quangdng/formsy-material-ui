import PropTypes from "prop-types"
import React from "react"
import createReactClass from "create-react-class"
import { withFormsy } from "formsy-react"
import { RadioButtonGroup, RadioButton } from "material-ui/RadioButton"
import { setMuiComponentAndMaybeFocus } from "./utils"

const FormsyRadioGroup = createReactClass({
  displayName: "FormsyRadioGroup",

  propTypes: {
    children: PropTypes.node,
    defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  },

  componentDidMount() {
    this.props.setValue(this.muiComponent.getSelectedValue())
  },

  controlledValue(props = this.props) {
    return props.value || props.defaultSelected || ""
  },

  componentWillReceiveProps(nextProps) {
    const isValueChanging = nextProps.value !== this.props.value
    if (isValueChanging || nextProps.defaultSelected !== this.props.defaultSelected) {
      const value = this.controlledValue(nextProps)

      if (isValueChanging || nextProps.defaultSelected !== this.props.defaultSelected) {
        this.setState({ value })
        this.props.setValue(value)
        console.log(value)
      }
    }
  },

  handleValueChange(event, value) {
    this.props.setValue(value)
    if (this.props.onChange) this.props.onChange(event, value)
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    let {
      validations, // eslint-disable-line no-unused-vars, prefer-const
      validationError, // eslint-disable-line no-unused-vars, prefer-const
      validationErrors, // eslint-disable-line no-unused-vars, prefer-const
      defaultSelected, // eslint-disable-line prefer-const
      value,
      ...rest
    } = this.props

    // remove unknown props from children
    const children = React.Children.map(this.props.children, (radio) => {
      const {
        validations, // eslint-disable-line no-unused-vars
        validationError, // eslint-disable-line no-unused-vars
        validationErrors, // eslint-disable-line no-unused-vars
        ...rest
      } = radio.props

      return React.createElement(RadioButton, rest)
    })

    // For backward compatibility or for
    // users used to MaterialUI, use the "defaultSelected"
    // attribute for the "value" if the value was not
    // explicitly set.
    if (typeof value === "undefined") {
      value = defaultSelected
    }

    return (
      <RadioButtonGroup
        disabled={this.props.isFormDisabled()}
        {...rest}
        ref={this.setMuiComponentAndMaybeFocus}
        onChange={this.handleValueChange}
        valueSelected={this.props.getValue()}
        defaultSelected={value}
      >
        {children}
      </RadioButtonGroup>
    )
  }
})

export default withFormsy(FormsyRadioGroup)

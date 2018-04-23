import PropTypes from "prop-types"
import React from "react"
import createReactClass from "create-react-class"
import keycode from "keycode"
import { withFormsy } from "formsy-react"
import AutoComplete from "material-ui/AutoComplete"
import { setMuiComponentAndMaybeFocus } from "./utils"

const FormsyAutoComplete = createReactClass({
  displayName: "FormsyAutoComplete",

  propTypes: {
    defaultValue: PropTypes.any,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    value: PropTypes.any
  },


  getInitialState() {
    return {
      value: this.props.defaultValue || this.props.value || ""
    }
  },

  componentWillMount() {
    this.props.setValue(this.props.defaultValue || this.props.value || "")
  },

  handleBlur: function handleBlur(event) {
    this.props.setValue(event.currentTarget.value)
    if (this.props.onBlur) this.props.onBlur(event)
  },

  handleChange: function handleChange(event) {
    this.setState({
      value: event.currentTarget.value
    })
    if (this.props.onChange) this.props.onChange(event)
  },

  handleUpdateInput: function handleUpdateInput(value) {
    this.setState({
      value
    })
    if (this.props.onChange) this.props.onChange(null, value)
  },

  handleKeyDown: function handleKeyDown(event) {
    if (keycode(event) === "enter") this.props.setValue(event.currentTarget.value)
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value)
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      defaultValue, // eslint-disable-line no-unused-vars
      onFocus,
      value, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props
    return (
      <AutoComplete
        disabled={this.props.isFormDisabled()}
        {...rest}
        errorText={this.props.getErrorMessage()}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onUpdateInput={this.handleUpdateInput}
        onFocus={onFocus}
        onKeyDown={this.handleKeyDown}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.state.value}
      />
    )
  }
})

export default withFormsy(FormsyAutoComplete)

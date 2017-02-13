import React from 'react';
import Formsy from 'formsy-react';
import TimePicker from 'material-ui/TimePicker';
import {setMuiComponentAndMaybeFocus} from './utils';

const FormsyTime = React.createClass({

  propTypes: {
    defaultTime: React.PropTypes.object,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    requiredError: React.PropTypes.string,
    validationError: React.PropTypes.string,
    validationErrors: React.PropTypes.object,
    validations: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    value: React.PropTypes.object,
  },

  mixins: [Formsy.Mixin],

  componentDidMount() {
    const {defaultTime} = this.props;
    const value = this.getValue();

    if (typeof value === 'undefined' && typeof defaultTime !== 'undefined') {
      this.setValue(defaultTime);
    }
  },

  handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      defaultTime, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      requiredError,
      ...rest,
    } = this.props;

    const {isRequired, isPristine, isValid} = this;
    const isRequiredError = isRequired() && !isPristine() && !isValid();
    const errorText = this.getErrorMessage() || (isRequiredError ? requiredError || "This field is required" : null);

    return (
      <TimePicker
        {...rest}
        errorText={errorText}
        onChange={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.getValue()}
      />
    );
  },
});

export default FormsyTime;

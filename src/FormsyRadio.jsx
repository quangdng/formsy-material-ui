import createReactClass from "create-react-class"
import { withFormsy } from "formsy-react"

const FormsyRadio = createReactClass({
  displayName: "FormsyRadio",

  // Material-UI replaces any component inside RadioButtonGroup with RadioButton, so no need to render it here
  render() {
  }
})

export default withFormsy(FormsyRadio)

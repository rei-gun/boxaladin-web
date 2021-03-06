//@flow
import React from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import PasswordChanged from './PasswordChanged'

type Props = {
  location: {
    search: string,
  },
}
type State = {
  render: JSX,
}
export default class ResetPassword extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.passwordChanged = this.passwordChanged.bind(this);
  }
  state = {
    render: true,
  }

  passwordChanged = () => {
    this.setState({
      render: false,
    })
  }
  render() {
    const {match} = this.props
    const email:string = match.params.email;
    const email_token:string = match.params.email_token;
    const component = this.state.render ?
      (<ResetPasswordForm email={email} email_token={email_token} passwordChanged={this.passwordChanged }/>)
      : (<PasswordChanged />)
    return (
      <div>
        {component}
      </div>
    )
  }

}

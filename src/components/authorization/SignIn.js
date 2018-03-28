import { Component } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';
import { Animated } from 'react-animated-css';
import PropTypes from 'prop-types';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onInputValueChange = this.onInputValueChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  static propTypes = {
    values: PropTypes.object,
    errors: PropTypes.object
  };

  static defaultProps = {
    values: {
      email: '',
      password: ''
    },
    errors: {
      email: false,
      password: false
    }
  };

  validate() {
    this.props.validate('signIn');
  }

  onInputValueChange(value, inputType) {
    this.props.onInputValueChange(value, inputType);
  }

  render() {
    return (
        <Animated animationIn="pulse" animationOut="fadeOut">
          <div>
            <FormGroup>
              <Input value={this.props.values.email}
                     onChange={event => this.onInputValueChange(event.target.value, 'email')}
                     type="email"
                     placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Input value={this.props.values.password}
                     onChange={event => this.onInputValueChange(event.target.value, 'password')}
                     type="password"
                     placeholder="Password" />
            </FormGroup>
            <Button onClick={this.validate} className="submit-button" size="lg">Sign In</Button>
          </div>
        </Animated>
    )
  }
}

export default SignIn;

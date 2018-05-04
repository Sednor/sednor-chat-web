import { Component } from 'react';
import { Button, Col, Form, FormGroup, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';

import SignForm from './SignForm';

import { getFormDataErrors } from '../../utils/validationUtils';

class UserLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: 'signIn',
      values: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: ''
      },
      errors: {
        email: false,
        firstName: false,
        lastName: false,
        password: false,
        passwordConfirm: false
      }
    };

    this.switchSignForm = this.switchSignForm.bind(this);
    this.submitValidation = this.submitValidation.bind(this);
    this.onInputValueChange = this.onInputValueChange.bind(this);
  }

  static propTypes = {
    onSuccess: PropTypes.func
  };

  static defaultProps = {
    onSuccess: () => {
    }
  };

  switchSignForm(formType) {
    if (formType !== this.state.formType) {
      this.setState({
        formType,
        values: {
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          passwordConfirm: ''
        },
        errors: {
          email: false,
          firstName: false,
          lastName: false,
          password: false,
          passwordConfirm: false
        }
      });
    }
  }

  submitValidation(event) {
    if (event) {
      event.preventDefault();
    }
    const DATA = { ...this.state.values };
    const VALIDATION_TYPE = this.state.formType;

    if (getFormDataErrors(DATA, VALIDATION_TYPE).length) {
      const STATE = this.state;

      getFormDataErrors(DATA, VALIDATION_TYPE).forEach(item => {
        if (VALIDATION_TYPE === 'signIn') {
          switch (item.message) {
            case 'email' :
              STATE.errors.email = true;
              break;

            case 'password' :
              STATE.errors.password = true;
              break;
          }
        } else if (VALIDATION_TYPE === 'signUp') {
          switch (item.message) {
            case 'firstName' :
              STATE.errors.firstName = true;
              break;

            case 'lastName':
              STATE.errors.lastName = true;
              break;

            case 'email' :
              STATE.errors.email = true;
              break;

            case 'password' :
              STATE.errors.password = true;
              break;

            case 'passwordConfirm':
              STATE.errors.passwordConfirm = true;
              break;
          }
        }
      });

      this.setState({ formType: STATE.formType, errors: STATE.errors });
    } else {
      if (this.state.formType === 'signUp') {
        const signUpData = { ...DATA };

        delete signUpData.passwordConfirm;
        this.props.onSuccess(this.state.formType, signUpData);
      } else if (this.state.formType === 'signIn') {
        const signUpData = { ...DATA };

        delete signUpData.firstName;
        delete signUpData.lastName;
        delete signUpData.passwordConfirm;
        this.props.onSuccess(this.state.formType, signUpData);
      }
    }
  }

  onInputValueChange(value, inputType) {
    const STATE = this.state;

    switch (inputType) {
      case 'email' :
        STATE.values.email = value;
        STATE.errors.email = false;
        break;

      case 'password' :
        STATE.values.password = value;
        STATE.errors.password = false;
        break;

      case 'passwordConfirm' :
        STATE.values.passwordConfirm = value;
        STATE.errors.passwordConfirm = false;
        break;

      case 'firstName' :
        STATE.values.firstName = value;
        STATE.errors.firstName = false;
        break;

      case 'lastName' :
        STATE.values.lastName = value;
        STATE.errors.lastName = false;
        break;
    }

    this.setState({ values: STATE.values, errors: STATE.errors });
  }

  render() {
    return (
        <Animated animationIn="fadeIn" animationOut="fadeOut">
          <Row className="messenger-sign">
            <Col xs="12" sm="12" md="10" lg="8" xl="4">
              <h2 className="messenger-title">Sednor Chat</h2>
              <div className="authorization-form">
                <Form className="w-100 justify-content-center" onSubmit={this.submitValidation}>
                  <FormGroup className="d-flex flex-row justify-content-center">
                    <Button outline={this.state.formType === 'signUp'}
                            color={this.state.formType === 'signIn' ? 'info' : 'secondary'}
                            className="switch-button"
                            size="lg"
                            onClick={() => this.switchSignForm('signIn')}>Sign In</Button>
                    <Button className="switch-button"
                            outline={this.state.formType === 'signIn'}
                            color={this.state.formType === 'signUp' ? 'info' : 'secondary'}
                            size="lg"
                            onClick={() => this.switchSignForm('signUp')}>Sign Up</Button>
                  </FormGroup>

                  <SignForm errors={this.state.errors}
                            values={this.state.values}
                            formType={this.state.formType}
                            validate={this.submitValidation}
                            onInputValueChange={this.onInputValueChange}/>

                  <div className="divider">or</div>

                  <FormGroup className="d-flex flex-column justify-content-center">
                    <Button size="lg" className="social-network-login-button facebook-button">Facebook</Button>
                    <Button size="lg" className="social-network-login-button google-button">Google</Button>
                  </FormGroup>
                </Form>
              </div>
            </Col>
          </Row>
        </Animated>
    );
  }
}

export default UserLoginForm;

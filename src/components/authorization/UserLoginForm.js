import { Component } from 'react';
import { Button, Col, Form, FormGroup, Row } from 'reactstrap';
import PropTypes from 'prop-types';

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
    onSuccess: () => {}
  };

  switchSignForm(formType) {
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
    })
  }

  submitValidation(event) {
    if (event) {
      event.preventDefault();
    }
    const data = { ...this.state.values };
    const validationType = this.state.formType;

    if (getFormDataErrors(data, validationType).length) {
      const state = this.state;

      getFormDataErrors(data, validationType).forEach(item => {
        if (validationType === 'signIn') {
          switch (item.message) {
            case 'email' :
              state.errors.email = true;
              break;

            case 'password' :
              state.errors.password = true;
              break;
          }
        }

        else if (validationType === 'signUp') {
          switch (item.message) {
            case 'firstName' :
              state.errors.firstName = true;
              break;

            case 'lastName':
              state.errors.lastName = true;
              break;

            case 'email' :
              state.errors.email = true;
              break;

            case 'password' :
              state.errors.password = true;
              break;

            case 'passwordConfirm':
              state.errors.passwordConfirm = true;
              break;
          }
        }
      });

      this.setState({ formType: state.formType, errors: state.errors });
    }
    else {
      if (this.state.formType === 'signUp') {
        const signUpData = { ...data };

        delete signUpData.passwordConfirm;
        this.props.onSuccess(this.state.formType, signUpData);
      }
      else if (this.state.formType === 'signIn') {
        const signUpData = { ...data };

        delete signUpData.firstName;
        delete signUpData.lastName;
        delete signUpData.passwordConfirm;
        this.props.onSuccess(this.state.formType, signUpData);
      }
    }
  }

  onInputValueChange(value, inputType) {
    const state = this.state;

    switch (inputType) {
      case 'email' :
        state.values.email = value;
        state.errors.email = false;
        break;

      case 'password' :
        state.values.password = value;
        state.errors.password = false;
        break;

      case 'passwordConfirm' :
        state.values.passwordConfirm = value;
        state.errors.passwordConfirm = false;
        break;

      case 'firstName' :
        state.values.firstName = value;
        state.errors.firstName = false;
        break;

      case 'lastName' :
        state.values.lastName = value;
        state.errors.lastName = false;
        break;
    }

    this.setState({ values: state.values, errors: state.errors });
  }

  render() {
    return (
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
                          onInputValueChange={this.onInputValueChange} />

                <div className="divider">or</div>

                <FormGroup className="d-flex flex-column justify-content-center">
                  <Button className="social-network-login-button" size="lg">
                    <i className="fa fa-google" />
                    <span className="text">Google</span>

                  </Button>
                  <Button className="social-network-login-button" color="primary" size="lg">
                    <i className="fa fa-facebook" />
                    <span className="text">Facebook</span>
                  </Button>
                </FormGroup>

              </Form>
            </div>
          </Col>
        </Row>
    )
  }
}

export default UserLoginForm;

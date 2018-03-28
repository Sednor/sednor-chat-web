import { Component } from 'react';
import { Button, Col, Container, Form, FormGroup, Row } from 'reactstrap';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { validateData } from '../../utils/validationUtils';

class UserLoginPage extends Component {
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

  submitValidation(validationType) {
    const data = {...this.state.values};

    if (validateData(data, validationType).length) {
      const state = this.state;

      if (validationType === 'signIn') {
        validateData(data, validationType).forEach(item => {
          switch (item.message) {
            case 'email' :
              state.errors.email = true;
              break;

            case 'password' :
              state.errors.password = true;
              break;
          }
        });

      }
      else if (validationType === 'signUp') {
        validateData(data, validationType).forEach(item => {
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
        });
      }
      this.setState({ formType: state.formType, errors: state.errors });
    }
    else {
      console.log('success')
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
        <Container>
          <Row className="messenger-sign">
            <Col xs="12" sm="12" md="10" lg="7">
              <h2 className="messenger-title">Sednor Chat</h2>
              <div className="authorization-form">
                <Form className="w-100 justify-content-center" onSubmit={e => e.preventDefault()}>
                  <FormGroup className="d-flex flex-row justify-content-center">
                    <Button outline={this.state.formType === 'signUp'}
                            color={this.state.formType === 'signIn' ? 'info' : 'secondary'}
                            className="switch-button"
                            size="lg"
                            onClick={() => this.switchSignForm('signIn')}>Sign
                      In</Button>
                    <Button className="switch-button"
                            outline={this.state.formType === 'signIn'}
                            color={this.state.formType === 'signUp' ? 'info' : 'secondary'}
                            size="lg"
                            onClick={() => this.switchSignForm('signUp')}>Sign
                      Up</Button>
                  </FormGroup>
                  {
                    this.state.formType === 'signIn' ?
                        <SignIn errors={this.state.formType === 'signIn' ? this.state.errors : []}
                                values={this.state.values}
                                validate={this.submitValidation}
                                onInputValueChange={this.onInputValueChange} />
                        :
                        <SignUp errors={this.state.formType === 'signUp' ? this.state.errors : []}
                                values={this.state.values}
                                validate={this.submitValidation}
                                onInputValueChange={this.onInputValueChange} />
                  }

                  <div className="divider">or</div>

                  <FormGroup className="d-flex flex-column justify-content-center">
                    <Button className="social-network-login-button" size="lg">
                      <i className="fa fa-google" />
                      <span className="text">
               Google
            </span>

                    </Button>
                    <Button className="social-network-login-button" color="primary" size="lg">
                      <i className="fa fa-facebook" />
                      <span className="text">
               Facebook
            </span>
                    </Button>
                  </FormGroup>

                </Form>
              </div>
            </Col>
          </Row>
        </Container>
    )
  }
}

export default UserLoginPage;

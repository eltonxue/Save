import React, { Component } from 'react'
import autoBind from 'react-autobind'
import {
  ScrollView,
  Text,
  Image,
  ImageBackground,
  View,
  Button,
  TouchableOpacity,
  TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import DropdownAlert from 'react-native-dropdownalert'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import { Images } from '../Themes'

import DrawerButton from '../Components/DrawerButton'
import RoundedButton from '../Components/RoundedButton'

import RegisterActions from '../Redux/RegisterRedux'
import { registerSelectors } from '../Redux/RegisterRedux'

// Styles
import styles from './Styles/RegistrationScreenStyles'

class RegistrationScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.registrationError && !this.props.isBusy) {
      console.log(this.props.registrationError)
      this.dropdown.alertWithType(
        'error',
        'Oops! Please try again.',
        `\u2022 ${this.props.registrationError.message}`
      )
    }
  }

  onClose(data) {
    // data = {type, title, message, action}
    // action means how the alert was closed.
    // returns: automatic, programmatic, tap, pan or cancel
  }

  registerUser = () => {
    const { fullName, email, password, confirmPassword } = this.state

    this.props.registerUser(fullName, email, password, confirmPassword)
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.save}>Save</Text>
          <View style={styles.section}>
            <Text style={styles.subheader}>
              <Text style={styles.sub}>Create</Text> Budgets.{' '}
              <Text style={styles.sub}>Save</Text> Money.
            </Text>
            <View style={styles.centered}>
              <Input
                inputContainerStyle={
                  !this.state.fullNameError
                    ? styles.inputContainer
                    : styles.invalidInputContainer
                }
                inputStyle={styles.input}
                onChangeText={fullName => this.setState({ fullName })}
                value={this.state.fullName}
                placeholder="Full Name"
                ref={input => (this.fullNameInput = input)}
                leftIconContainerStyle={styles.iconContainer}
                leftIcon={<Icon style={styles.icon} name="user" />}
              />
              <Input
                inputContainerStyle={
                  !this.state.emailError
                    ? styles.inputContainer
                    : styles.invalidInputContainer
                }
                inputStyle={styles.input}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                placeholder="Email"
                ref={input => (this.emailInput = input)}
                leftIconContainerStyle={styles.iconContainer}
                leftIcon={<Icon style={styles.icon} name="envelope" />}
              />

              <Input
                inputContainerStyle={
                  !this.state.passwordError
                    ? styles.inputContainer
                    : styles.invalidInputContainer
                }
                inputStyle={styles.input}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                placeholder="Password"
                secureTextEntry={true}
                ref={input => (this.passwordInput = input)}
                leftIconContainerStyle={styles.iconContainer}
                leftIcon={<Icon style={styles.icon} name="lock" />}
              />

              <Input
                inputContainerStyle={
                  !this.state.confirmPasswordError
                    ? styles.inputContainer
                    : styles.invalidInputContainer
                }
                inputStyle={styles.input}
                onChangeText={confirmPassword =>
                  this.setState({ confirmPassword })
                }
                value={this.state.confirmPassword}
                placeholder="Confirm Password"
                secureTextEntry={true}
                ref={input => (this.confirmPasswordInput = input)}
                leftIconContainerStyle={styles.iconContainer}
                leftIcon={<Icon style={styles.icon} name="lock" />}
              />
            </View>
          </View>

          <RoundedButton text="Register" onPress={this.registerUser} />
          <View style={styles.centered}>
            <DrawerButton text="Login" onPress={this.goBack} />
          </View>
        </ScrollView>
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          onClose={data => this.onClose(data)}
          closeInterval={6000}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const {
    selectRegisteredUser,
    selectRegistrationError,
    registrationIsBusy
  } = registerSelectors
  return {
    registeredUser: selectRegisteredUser(state),
    registrationError: selectRegistrationError(state),
    isBusy: registrationIsBusy(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (fullName, email, password, confirmPassword) =>
      dispatch(
        RegisterActions.registerRequest(
          fullName,
          email,
          password,
          confirmPassword
        )
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)

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

import { Images } from '../Themes'

import DrawerButton from '../Components/DrawerButton'
import FullButton from '../Components/FullButton'
import RoundedButton from '../Components/RoundedButton'
import { StackNavigator } from 'react-navigation'

import API from '../Services/Api'

// Styles
import styles from './Styles/RegistrationScreenStyles'

export default class RegistrationScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullNameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: ''
    }

    this.api = API.create()
  }

  resetErrors = () => {
    this.setState({
      fullNameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      error: ''
    })
  }

  handleErrors = error => {
    if (error.code === 100) {
      this.setState({
        fullNameError: error.message
      })
      this.fullNameInput.shake()
    } else if (error.code === 101 || error.code === 104 || error.code === 107) {
      this.setState({
        emailError: error.message
      })
      this.emailInput.shake()
    } else if (error.code === 102) {
      this.setState({
        passwordError: error.message
      })
      this.passwordInput.shake()
    } else if (error.code === 103) {
      this.setState({
        confirmPasswordError: error.message
      })
      this.confirmPasswordInput.shake()
    } else if (error.code === 105 || error.code == 106) {
      this.setState({
        passwordError: error.message,
        confirmPasswordError: error.message
      })
      this.passwordInput.shake()
      this.confirmPasswordInput.shake()
    }
  }

  registerUser = () => {
    this.resetErrors()

    const registerApiEndpoint = {
      label: 'Register User',
      endpoint: 'postRegister',
      args: [
        this.state.fullName,
        this.state.email,
        this.state.password,
        this.state.confirmPassword
      ]
    }

    const { label, endpoint, args = [''] } = registerApiEndpoint
    this.api[endpoint].apply(this, args).then(response => {
      if (response.ok) {
        this.props.navigation.navigate('LaunchScreen')
      } else {
        console.log('error', response.data)
        const { error } = response.data
        this.handleErrors(error)
      }
    })
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
                errorStyle={styles.errorText}
                errorMessage={this.state.fullNameError}
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
                errorStyle={styles.errorText}
                errorMessage={this.state.emailError}
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
                errorStyle={styles.errorText}
                errorMessage={this.state.passwordError}
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
                errorStyle={styles.errorText}
                errorMessage={this.state.confirmPasswordError}
              />
            </View>
          </View>

          <RoundedButton text="Register" onPress={this.registerUser} />
          <View style={styles.centered}>
            <DrawerButton text="Login" onPress={this.goBack} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

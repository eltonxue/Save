import React, { Component } from 'react'
import autoBind from 'react-autobind'
import FontAwesome, { Icons } from 'react-native-fontawesome'
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

import DrawerButton from '../Components/DrawerButton'
import RoundedButton from '../Components/RoundedButton'
import { StackNavigator } from 'react-navigation'

// Screens
import RegistrationScreen from './RegistrationScreen'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      error: ''
    }
  }

  loginUser = () => {}
  openRegistration = () => {
    this.props.navigation.navigate('RegistrationScreen')
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
            </View>
          </View>
          <RoundedButton text="Login" onPress={this.openRegistration} />
          <View style={styles.centered}>
            <DrawerButton text="Register" onPress={this.openRegistration} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default StackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    RegistrationScreen: { screen: RegistrationScreen }
  },
  {
    cardStyle: {
      opacity: 1,
      backgroundColor: '#3e243f'
    },
    initialRouteName: 'LaunchScreen',
    headerMode: 'none',
    // Keeping this here for future when we can make
    navigationOptions: {
      header: {
        left: (
          <TouchableOpacity onPress={() => window.alert('pop')}>
            <Image
              source={Images.closeButton}
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        ),
        style: {
          backgroundColor: '#3e243f'
        }
      }
    }
  }
)

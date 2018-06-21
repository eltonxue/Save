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
import { StackNavigator } from 'react-navigation'
import { debounce } from 'lodash'

// Utils
import DrawerButton from '../Components/DrawerButton'
import RoundedButton from '../Components/RoundedButton'

// Screens
import LoginScreen from './LoginScreen'
import RegistrationScreen from './RegistrationScreen'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  openLogin = () => {
    this.props.navigation.navigate('LoginScreen')
  }

  openRegistration = () => {
    this.props.navigation.navigate('RegistrationScreen')
  }

  render() {
    const DEBOUNCE = 150
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <Text style={styles.save}>Save</Text>
          <View style={styles.section}>
            <Text style={styles.subheader}>
              <Text style={styles.sub}>Create</Text> Budgets.{' '}
              <Text style={styles.sub}>Save</Text> Money.
            </Text>
          </View>
          <RoundedButton
            text="Register"
            onPress={debounce(this.openRegistration, DEBOUNCE)}
          />
          <View style={styles.centered}>
            <DrawerButton
              text="Already have an account? Login"
              onPress={debounce(this.openLogin, DEBOUNCE)}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default StackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    LoginScreen: { screen: LoginScreen },
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

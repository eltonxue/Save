import React, { Component } from 'react'
import autoBind from 'react-autobind'
import {
  ScrollView,
  Text,
  Image,
  View,
  Button,
  TouchableOpacity,
  TextInput
} from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import { StackNavigator } from 'react-navigation'

// Screens
import RegistrationScreen from './RegistrationScreen'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  constructor(props) {
    super(props)

    this.state = { email: 'Email', password: 'Password' }
  }
  openRegistration = () => {
    this.props.navigation.navigate('RegistrationScreen')
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Image
          source={Images.background}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
          <View style={styles.section}>
            <Image source={Images.ready} />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
          </View>
          // <Button title="Register" onPress={this.openRegistration} />
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

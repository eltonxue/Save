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
import AppIntroSlider from 'react-native-app-intro-slider'

// Utils
import DrawerButton from '../Components/DrawerButton'
import RoundedButton from '../Components/RoundedButton'

// Screens
import LoginScreen from './LoginScreen'
import RegistrationScreen from './RegistrationScreen'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'
import { Colors } from '../Themes/'

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

  renderItem = props => {
    return (
      <View
        style={[
          styles.slideContainer,
          {
            paddingTop: props.topSpacer,
            paddingBottom: props.bottomSpacer,
            width: props.width,
            height: '100%'
          }
        ]}
      >
        <Image style={props.imageStyle} source={props.image} />
        <View style={styles.centered}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.text}>{props.text}</Text>
        </View>
      </View>
    )
  }

  render() {
    console.log(this.props.navigation)
    const DEBOUNCE = 150
    return (
      <View style={styles.mainContainer}>
        <AppIntroSlider
          slides={slides}
          hideDoneButton={true}
          hideNextButton={true}
          dotColor={Colors.cloud}
          renderItem={this.renderItem}
        />

        <RoundedButton
          text="Register"
          onPress={debounce(this.openRegistration, DEBOUNCE)}
        />
        <View style={styles.hasAccount}>
          <DrawerButton
            text="Already have an account? Login"
            onPress={debounce(this.openLogin, DEBOUNCE)}
          />
        </View>
      </View>
    )
  }
}

const slides = [
  {
    key: 'create-budgets',
    title: 'Create Budgets',
    text: 'Decide.\nWhere your money goes.',
    image: require('../Images/intro-1-budget.png'),
    imageStyle: styles.image,
    icon: 'bag',
    backgroundColor: Colors.background
  },
  {
    key: 'record-transactions',
    title: 'Record Transactions',
    text: 'Document.\nEvery payment made.',
    image: require('../Images/intro-2-money.png'),
    imageStyle: styles.image,
    backgroundColor: Colors.background
  },
  {
    key: 'visualize-payments',
    title: 'Visualize Payments',
    text: 'Watch.\nAll your transactions.',
    image: require('../Images/intro-3-visualize.png'),
    imageStyle: styles.image,
    backgroundColor: Colors.background
  },
  {
    key: 'save-money',
    title: 'Save Money',
    text: 'Prevent.\nWasteful spending.',
    image: require('../Images/intro-4-wallet.png'),
    imageStyle: styles.image,
    backgroundColor: Colors.background
  }
]

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

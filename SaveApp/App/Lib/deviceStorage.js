import { AsyncStorage } from 'react-native'

const deviceStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message)
    }
  },
  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('jwt')
      if (value !== null) {
        return {
          jwt: value,
          loggedIn: true
        }
      } else {
        return {
          loggedIn: false
        }
      }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message)
    }
  },
  async deleteJWT() {
    try {
      await AsyncStorage.removeItem('jwt').then(() => {
        return {
          loggedIn: false
        }
      })
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message)
    }
  }
}

export default deviceStorage

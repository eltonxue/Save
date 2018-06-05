import { StyleSheet } from 'react-native'
import { Metrics, Colors, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  label: {
    color: Colors.steel,
    marginTop: 20
  },
  input: {
    color: Colors.steel,
    height: 40,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1
  }
})

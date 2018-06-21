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
  section: {
    margin: Metrics.section,
    padding: Metrics.baseMargin,
    marginBottom: 5
  },
  registerButton: {
    fontSize: 6,
    textAlign: 'center'
  },
  subheader: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700'
  },
  sub: {
    fontSize: 20,
    color: Colors.moneygreen
  },
  save: {
    fontSize: 80,
    textAlign: 'center',
    color: 'white',
    marginTop: 125,
    fontFamily: 'CourierNewPS-BoldMT'
  }
})

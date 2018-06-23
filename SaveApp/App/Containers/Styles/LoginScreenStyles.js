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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 0,
    borderBottomWidth: 0
  },
  input: {
    color: Colors.steel,
    height: 40,
    paddingLeft: 0,
    paddingRight: 10,
    borderColor: 'gray',
    backgroundColor: 'white',
    color: Colors.offblack,
    fontSize: 14,
    flex: 8
  },
  iconContainer: {
    flex: 1
  },
  icon: {
    fontSize: 20,
    color: Colors.offblack
  },
  backButton: {
    marginTop: 30,
    marginLeft: 20
  },
  back: {
    color: Colors.snow,
    fontSize: 50
  },
  subheader: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 10
  },
  sub: {
    color: Colors.moneygreen
  },
  save: {
    fontSize: 50,
    textAlign: 'center',
    color: 'white',
    marginTop: 50,
    fontFamily: 'CourierNewPS-BoldMT'
  },
  inputLabel: {
    color: Colors.snow,
    fontSize: 14,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: 'Arial',
    marginLeft: 15
  },
  zeroMarginTop: {
    marginTop: 0
  }
})

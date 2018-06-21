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
  buttonsContainer: {
    flexDirection: 'row'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 15,
    paddingLeft: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  input: {
    color: Colors.steel,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
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
    fontSize: 60,
    textAlign: 'center',
    color: 'white',
    marginTop: 75,
    fontFamily: 'CourierNewPS-BoldMT'
  }
})

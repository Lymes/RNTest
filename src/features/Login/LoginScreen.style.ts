import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    color: '#222324',
    fontFamily: 'DINPro',
    fontSize: 42,
    alignSelf: 'center',
    margin: 40,
  },
  topRightButton: {
    alignSelf: 'flex-end',
    marginRight: 40,
    borderRadius: 8,
    padding: 5,
    backgroundColor: '#3275df',
    tintColor: 'white',
    width: 22,
    height: 22,
  },
  credentialsInput: {
    alignSelf: 'center',
    width: '80%',
    height: 40,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
  },
  loginButton: {
    alignSelf: 'center',
    backgroundColor: '#3275df',
    color: 'white',
    borderRadius: 8,
    fontFamily: 'DINPro',
    fontSize: 16,
    width: '80%',
    height: 40,
    margin: 10,
  },
  settingsButton: {
    alignSelf: 'center',
    backgroundColor: '#6f7072',
    color: 'white',
    borderRadius: 8,
    fontFamily: 'DINPro',
    fontSize: 16,
    width: '80%',
    height: 40,
    margin: 10,
  },
  settingsContainer: {
    flex: 1,
  },
});

export {styles};

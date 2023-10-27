import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  loginTitle: {
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'DINPro',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 0.4,
    borderColor: '#9c9c9c',
    height: 40,
    minHeight: 40,
    width: '80%',
    margin: 12,
    padding: 10,
  },
  inputBox: {
    alignSelf: 'center',
    flex: 10,
    borderRadius: 8,
    borderWidth: 0.4,
    borderColor: '#9c9c9c',
    minHeight: 40,
    width: '80%',
    margin: 12,
    padding: 10,
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
    width: '60%',
  },
});

export {styles};

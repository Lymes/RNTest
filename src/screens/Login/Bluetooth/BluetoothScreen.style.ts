import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  settingsPage: {
    flex: 1,
    alignItems: 'stretch',
    width: '80%',
    alignSelf: 'center',
  },
  ssidLabel: {
    marginTop: 30,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    fontFamily: 'DINPro',
    fontSize: 20,
    height: 40,
  },
  credentialsInput: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
  },
  sendButton: {
    alignSelf: 'center',
    backgroundColor: '#3275df',
    color: 'white',
    borderRadius: 8,
    fontFamily: 'DINPro',
    fontSize: 16,
    width: '100%',
    height: 40,
    marginTop: 30,
  },
  scanContainer: {
    alignSelf: 'center',
    margin: 20,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    gap: 10,
    padding: 10,
    width: '100%',
  },
  scanLabel: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    fontFamily: 'DINPro',
    fontSize: 20,
    height: 40,
  },
  scanIndicator: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  logContainer: {
    height: 300,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
});

export {styles};

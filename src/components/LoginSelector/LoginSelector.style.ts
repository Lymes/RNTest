import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  ipAddressInput: {
    alignSelf: 'center',
    width: '100%',
    height: 40,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'white',
    elevation: 0,
    marginBottom: 30,
  },
  textContainer: {
    alignSelf: 'flex-start',
  },
  titleText: {
    alignSelf: 'flex-start',
    fontFamily: 'DINPro',
    fontSize: 16,
  },
  horizontal: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-around',
    padding: 10,
  },
});

export {styles};

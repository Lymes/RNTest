import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    overflow: 'visible',
  },
  wrapper: {
    paddingTop: 20,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#222222',
  },
  item: {
    height: 100,
    borderRadius: 8,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_text: {
    fontSize: 40,
    color: '#FFFFFF',
  },
});

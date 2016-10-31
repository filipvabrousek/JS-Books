import ReactNative, {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native-web';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>React Native for Web</Text>
        <Text>Hello world app example</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});




const rootTag = document.getElementById('react-root');
AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', { rootTag });

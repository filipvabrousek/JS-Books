import ReactNative, {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native-web';

class SampleApp extends React.Component {
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
AppRegistry.registerComponent('SampleApp', () => SampleApp);
AppRegistry.runApplication('SampleApp', { rootTag });

//https://unpkg.com/react@15.3.1/dist/react.min.js
//https://wzrd.in/bundle/react-native-web@latest

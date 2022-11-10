import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  View
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Hw1 from './src/20221014/main';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#fff',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Hw1 placeholder='在這裡顯示文字' />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "5%",
  }
});

export default App;
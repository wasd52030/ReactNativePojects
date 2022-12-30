import React from 'react';
import { StyleSheet, ScrollView, View, Switch, Text, ImageBackground } from 'react-native';
import SystemSetting from 'react-native-system-setting';
import Slider from '@react-native-community/slider';

class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wifiEnabled: false,
      bluetoothEnabled: false,
      locationEnabled: false,
      brightness: 0,
      volume: 0,
    };
  }

  componentDidMount() {
    // 初始取得目前 WiFi 的開啟狀態
    SystemSetting.isWifiEnabled().then(isEnabled => {
      this.setState({
        wifiEnabled: isEnabled,
      });
    });
    // 初始取得目前 藍芽 的開啟狀態
    SystemSetting.isBluetoothEnabled().then(isEnabled => {
      this.setState({
        bluetoothEnabled: isEnabled,
      });
    });
    // 初始取得目前 定位服務 的開啟狀態
    SystemSetting.isLocationEnabled().then(isEnabled => {
      this.setState({
        locationEnabled: isEnabled,
      });
    });
    // 初始取得目前 螢幕亮度 的值（0~1）
    SystemSetting.getAppBrightness().then(brightness => {
      this.setState({
        brightness: brightness,
      });
    });
    // 初始取得目前 音量大小 的值（0~1）
    SystemSetting.getVolume().then(volume => {
      this.setState({
        volume: volume,
      });
    });
  }

  // 切換 WiFi 開關
  handleChangeWifi = () => {
    SystemSetting.switchWifi(() => {
      // 當切換完畢後返回 APP 時觸發 Callback 並重新取得 WiFi 狀態
      SystemSetting.isWifiEnabled().then(enable => {
        this.setState({
          wifiEnabled: enable,
        });
      });
    });
  };

  // 切換 藍芽 開關
  handleChangeBluetooth = () => {
    SystemSetting.switchBluetooth(() => {
      // 當切換完畢後返回 APP 時觸發 Callback 並重新取得 藍芽 狀態
      SystemSetting.isBluetoothEnabled().then(enable => {
        this.setState({
          bluetoothEnabled: enable,
        });
      });
    });
  };

  // 切換 定位服務 開關
  handleChangeLocation = () => {
    SystemSetting.switchLocation(() => {
      // 當切換完畢後返回 APP 時觸發 Callback 並重新取得 定位服務 狀態
      SystemSetting.isLocationEnabled().then(enable => {
        this.setState({
          locationEnabled: enable,
        });
      });
    });
  };

  // 滑動結束改變 螢幕亮度 值
  handleChangeCompletedBrightness = value => {
    this.setState(
      () => ({
        brightness: value,
      }),
      () => {
        SystemSetting.setAppBrightness(value);
      },
    );
  };

  // 滑動結束改變 音量大小 值
  handleChangeCompletedVolume = value => {
    console.log(value);
    this.setState(
      () => ({
        volume: value,
      }),
      () => SystemSetting.setVolume(value),
    );
  };

  render() {
    const { wifiEnabled, bluetoothEnabled, locationEnabled, brightness, volume } = this.state;

    return (
      <ImageBackground style={{ flex: 1 }} source={require('./image/background.png')}>
        <ScrollView style={styles.container}>
          <View style={styles.listItem}>
            <Text style={styles.TextStyle}>WiFi</Text>
            <Switch value={wifiEnabled} onValueChange={this.handleChangeWifi} />
          </View>
          <View style={styles.listItem}>
            <Text style={styles.TextStyle}>藍芽</Text>
            <Switch value={bluetoothEnabled} onValueChange={this.handleChangeBluetooth} />
          </View>
          <View style={styles.listItem}>
            <Text style={styles.TextStyle}>定位服務</Text>
            <Switch value={locationEnabled} onValueChange={this.handleChangeLocation} />
          </View>
          <View style={styles.listItem}>
            <Text style={styles.TextStyle}>螢幕亮度</Text>
            <Slider
              minimumValue={0}
              maximumValue={1}
              value={brightness}
              onSlidingComplete={this.handleChangeCompletedBrightness}
              style={styles.slider}
            />
          </View>
          <View style={styles.listItem}>
            <Text style={styles.TextStyle}>音量大小</Text>
            <Slider
              minimumValue={0}
              maximumValue={1}
              value={volume}
              onSlidingComplete={this.handleChangeCompletedVolume}
              style={styles.slider}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  slider: {
    width: 180,
  },
  TextStyle: {
    color: 'white',
  },
});

export default Setting;

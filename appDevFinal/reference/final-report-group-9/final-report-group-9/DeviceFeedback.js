import React from 'react';
import { Alert, StyleSheet, View, TextInput, Button, Text, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';

export default class DeviceFeedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: '',
      deviceType: '',
      deviceName: '',
      systemName: '',
      systemVersion: '',
      title: '',
      desc: '',
      email: '',
    };
  }

  componentDidMount() {
    DeviceInfo.getDeviceName().then(deviceName => {
      this.setState({
        deviceName: deviceName,
      });
    });

    this.setState({
      brand: DeviceInfo.getBrand(),
      deviceType: DeviceInfo.getDeviceType(),
      systemName: DeviceInfo.getSystemName(),
      systemVersion: DeviceInfo.getSystemVersion(),
    });
  }

  handleTranslateDeviceType = () => {
    const { deviceType } = this.state;

    switch (deviceType) {
      case 'Handset':
        return '手機裝置';
      case 'Tablet':
        return '平板裝置';
      case 'Tv':
        return 'TV 裝置';
      case 'unknown':
        return '其他來源';
    }
  };

  // 變更問題標題的文字
  handleChangeTitle = text => {
    this.setState({
      title: text,
    });
  };

  // 變更問題描述的文字
  handleChangeDesc = text => {
    this.setState({
      desc: text,
    });
  };

  // 變更電子郵件的文字
  handleChangeEmail = text => {
    this.setState({
      email: text,
    });
  };

  handleAddPress = () => {
    console.log(this.state);
    Alert.alert('感謝您的回饋', '請耐心等候，我們將有專人儘快與您回覆。', [
      { text: '確定', onPress: () => Actions.pop() },
    ]);
  };

  render() {
    const { brand, deviceName, systemName, systemVersion, title, desc, email } = this.state;

    return (
      <ImageBackground style={{ flex: 1 }} source={require('./image/background.png')}>
        <View style={styles.container}>
          <View>
            <View style={styles.item}>
              <Text style={styles.label}>手機品牌</Text>
              <Text style={styles.devicetext}>{brand}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>裝置類型</Text>
              <Text style={styles.devicetext}>{this.handleTranslateDeviceType()}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>裝置名稱</Text>
              <Text style={styles.devicetext}>{deviceName}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>作業系統</Text>
              <Text style={styles.devicetext}>{systemName}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>作業系統版本</Text>
              <Text style={styles.devicetext}>{systemVersion}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>標題</Text>
              <TextInput
                placeholderTextColor={'rgba(0,0,0,0.75)'}
                value={title}
                placeholder="請輸入標題"
                onChangeText={this.handleChangeTitle}
                style={styles.textInput}
              />
            </View>
            <View style={styles.textareaItem}>
              <Text style={styles.label}>問題描述</Text>
              <TextInput
                multiline
                numberOfLines={5}
                value={desc}
                placeholderTextColor={'rgba(0,0,0,0.75)'}
                placeholder="請描述您的裝置問題"
                onChangeText={this.handleChangeDesc}
                style={styles.textarea}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>電子信箱</Text>
              <TextInput
                placeholderTextColor={'rgba(0,0,0,0.75)'}
                keyboardType="email-address"
                value={email}
                placeholder="請輸入電子信箱"
                onChangeText={this.handleChangeEmail}
                style={styles.textInput}
              />
            </View>
          </View>
          <Button
            title="回報問題"
            disabled={!title || !desc || !email}
            onPress={this.handleAddPress}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  textareaItem: {
    color: 'white',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 15,
  },
  textInput: {
    flex: 1,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
  },
  textarea: {
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
  },
  devicetext: { color: 'black', fontWeight: '900' },
});

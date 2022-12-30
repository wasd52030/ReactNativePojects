import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Button,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: '',
      local_image_url: '',
      rating: '0',
      address: '',
      price_level: '1',
      opening_hours: '0',
      Remark: '',
    };
  }

  handleOpenCamera = () => {
    launchCamera({}, this.handleSelectMealImage);
  };

  handleOpenImageLibrary = () => {
    launchImageLibrary({}, this.handleSelectMealImage);
  };
  handleSelectMealImage = response => {
    const { didCancel, assets } = response;
    if (!didCancel) {
      var url = String(assets[0].uri).split('///')[1]
      this.setState({ local_image_url: url });
    }
  };

  // 變更餐廳名字
  handleChangePlace = text => {
    this.setState({
      place: text,
    });
  };

  // 變更餐廳價位
  handleSelectedValue = text => {
    this.setState({
      price_level: text,
    });
  };

  // 變更餐廳評價
  handleChangeRating = text => {
    this.setState({
      rating: text,
    });
  };

  // 變更餐廳地址
  handleChangeAddress = text => {
    this.setState({
      address: text,
    });
  };

  // 變更餐廳營業時間
  handleChangeOpening_hours = text => {
    this.setState({
      opening_hours: text,
    });
  };

  handleChangeRemark = (text) => {
    this.setState({
      Remark: text,
    });
  }

  handleAddPress = () => {
    const { handleAddplace } = this.props;
    // 返回前一個頁面
    Actions.pop();
    // 呼叫子元件所傳入的事件並將表單的輸入內容帶入參數回傳回去
    handleAddplace(this.state);
    // 新增待辦事項後將表單設定回到初始預設值
  };

  render() {
    const { place, local_image_url, rating, address, map_url, price_level, opening_hours } =
      this.state;

    return (
      <ImageBackground style={{ flex: 1 }} source={require('./image/background.png')}>
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
          <Image
            source={{
              uri: !local_image_url ? 'https://i.imgur.com/5l6dHWc.png' : 'file:///' + local_image_url,
            }}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').width / 2,
            }}
          />
          <View style={{ flexDirection: 'row-reverse' }}>
            <TouchableOpacity
              style={styles.toptouchalbe}
              title="從相機拍照"
              onPress={this.handleOpenCamera}>
              <Icon size={30} name="md-camera" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.toptouchalbe}
              title="從相簿選擇"
              onPress={this.handleOpenImageLibrary}>
              <Icon size={30} name="md-folder-outline" />
            </TouchableOpacity>
          </View>
          <View style={styles.mealContent}>
            <TextInput
              placeholder="在此輸入店名"
              placeholderTextColor={'rgba(255,165,1,0.5)'}
              style={[styles.text2]}
              value={place}
              onChangeText={this.handleChangePlace}
            />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={styles.text1}>價位：</Text>
              <Picker
                style={styles.Picker}
                mode="dropdown"
                onValueChange={itemValue => this.handleSelectedValue(itemValue)}
                selectedValue={this.state.price_level}>
                <Picker.Item color="orange" label="$" value="1" />
                <Picker.Item color="orange" label="$$" value="2" />
                <Picker.Item color="orange" label="$$$" value="3" />
              </Picker>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={styles.text1}>評價：</Text>
              <Picker style={styles.Picker} mode="dropdown" onValueChange={value => this.handleChangeRating(value)} selectedValue={this.state.rating}>
                <Picker.Item color='orange' style={styles.Pickitem} label="無" value="0" />
                <Picker.Item color='orange' style={styles.Pickitem} label="一星" value="1" />
                <Picker.Item color='orange' style={styles.Pickitem} label="二星" value="2" />
                <Picker.Item color='orange' style={styles.Pickitem} label="三星" value="3" />
                <Picker.Item color='orange' style={styles.Pickitem} label="四星" value="4" />
                <Picker.Item color='orange' style={styles.Pickitem} label="五星" value="5" />
              </Picker>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text1}>地址：</Text>
              <TextInput
                placeholder="輸入地址"
                placeholderTextColor={'rgba(255,165,1,0.5)'}
                style={[styles.text2, { width: 190 }]}
                value={address}
                onChangeText={this.handleChangeAddress}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.text1,{position:'relative',top:10}]}>營業狀態：</Text>
            <Picker style={styles.Picker} mode="dropdown"
              onValueChange={value => this.handleChangeOpening_hours(value)} selectedValue={this.state.opening_hours}>
              <Picker.Item color='orange' style={styles.Pickitem} label="未知" value="All" />
              <Picker.Item color='orange' style={styles.Pickitem} label="營業中" value="NowOpen" />
              <Picker.Item color='orange' style={styles.Pickitem} label="非營業中" value="NoOpen" />
            </Picker>
            </View>
            <Text style={styles.text1}>備註：</Text>
            <TextInput
              placeholderTextColor={'orange'}
              placeholder="備註..."
              multiline
              numberOfLines={2}
              style={{
                color: 'orange',
                textAlignVertical: 'top',
                borderWidth: 0.4,
                borderColor: 'rgba(0,0,0,0.5)',
              }}
              onChangeText={text => this.handleChangeRemark(text)}
            />
          </View>
        </KeyboardAwareScrollView>
        <View>
            <Button title="新增店家" style={{ height: 10 }} onPress={this.handleAddPress} />
          </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mealList: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2,
  },
  mealContent: {
    marginLeft: 10,
    position: 'relative',
    bottom: 10,
  },
  text1: {
    fontSize: 20,
    paddingVertical: 3,
    textAlign: 'left',
    color: 'white',
  },
  text2: {
    fontSize: 20,
    color: 'orange',
    paddingVertical: 3,
    textAlign: 'left',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  text3: {
    fontSize: 20,
    paddingVertical: 3,
    textAlign: 'left',
  },
  touchitem: {
    width: 80,
    height: 50,
    backgroundColor: '#CD8888',
    borderWidth: 5,
    borderRadius: 2000,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 30,
  },
  toptouchalbe: {
    width: 45,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Picker: {
    width: 150,
    fontSize: 20,
  },
});

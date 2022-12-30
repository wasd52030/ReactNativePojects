import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/Feather';
// npm install --save react-native-elements
// npm install --save react-native-fab
// npm install --save react-native-vector-icons
export default class Side extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: '5000',
      rating: '0',
      opening_hours: 'All',
      findplace: '',
    };
  }
  componentDidMount() { }

  handleChangeType = (mode, data) => {
    // console.log(mode, data);
    switch (mode) {
      case '0':
        this.setState({
          radius: data
        })
        break
      case '1':
        this.setState({
          rating: data
        })
        break
      case '2':
        this.setState({
          opening_hours: data
        })
        break
      case '3':
        this.setState({
          findplace: data
        })
        break
    }

  }

  handleButtonpress=()=>{
    const { handleSideMenusPress } = this.props;
    handleSideMenusPress(this.state)

  }

  render() {
    // console.log(this.props);

    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.75)' }}>
        <ScrollView>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('./image/search.png')} style={styles.searchimg} />
            <TextInput placeholderTextColor="white" placeholder="請輸入文字" style={styles.input} onChangeText={text => this.handleChangeType('3', text)} />
          </View>
          <View style={{
            flex: 9, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0)',
          }}>
            <Text style={{ flex: 1, fontSize: 14, color: 'white', marginTop: 17, marginRight: 5, }}> 距離：</Text>
            <TextInput placeholderTextColor="white" placeholder="請輸入距離(預設5000m)" style={[styles.input, { flex: 4, marginTop: 5, marginLeft: -8.5, color:'white' }]}
             onChangeText={text => this.handleChangeType('0', text)} />
            </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={{ flex: 1, fontSize: 15, color: 'white', marginTop: 17, }}> 評價：</Text>
            <Picker style={styles.Picker} mode="dropdown" onValueChange={value => this.handleChangeType('1', value)} selectedValue={this.state.rating}>
              <Picker.Item color='white' style={styles.Pickitem} label="所有" value="0" />
              <Picker.Item color='white' style={styles.Pickitem} label="一星" value="1" />
              <Picker.Item color='white' style={styles.Pickitem} label="二星" value="2" />
              <Picker.Item color='white' style={styles.Pickitem} label="三星" value="3" />
              <Picker.Item color='white' style={styles.Pickitem} label="四星" value="4" />
            </Picker>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0)', position: 'relative', bottom: 25}}>
            <Text style={{ flex: 1, fontSize: 15, color: 'white', marginTop: 17, }}> 狀態：</Text>
            <Picker itemStyle={{ backgroundColor: 'lightgrey' }} style={styles.Picker} mode="dropdown"
              onValueChange={value => this.handleChangeType('2', value)} selectedValue={this.state.opening_hours}>
              <Picker.Item color='white' style={styles.Pickitem} label="所有" value="All" />
              <Picker.Item color='white' style={styles.Pickitem} label="營業中" value="true" />
              <Picker.Item color='white' style={styles.Pickitem} label="非營業中" value="false" />
            </Picker>
          </View>
        </ScrollView>
        <FAB iconTextComponent={<Icon name="search" />} onClickAction={() => { this.handleButtonpress() }} visible={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.8,
    padding: 10,
    flex: 5,
    marginLeft: 5,
  },
  searchimg: {
    width: 30,
    height: 30,
    flex: 1,
    marginTop: 17,
  },
  Picker: {
    flex: 4,
    width: 150,
    height: 20,
    fontSize: 50,
    marginBottom: 30,
    backgroundColor: '(0,0,0,0.75)'
  },
  Pickitem: {
    color: 'black',
    backgroundColor: 'rgb(61,61,61)'
  },
  SideMenuText: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    marginTop: 17,
    marginRight: 3,
  },

});
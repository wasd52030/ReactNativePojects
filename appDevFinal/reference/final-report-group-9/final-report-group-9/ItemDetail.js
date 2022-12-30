import React, { Component } from 'react';
import { StyleSheet, Dimensions, Image, View, Text, ImageBackground, Linking, Clipboard, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FAB from 'react-native-fab';
import { Picker } from '@react-native-picker/picker';

export default class MealDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: {}
    }
  }

  componentWillUnmount() {
    if (this.props.Remark)
      this.props.handleChangedata(this.state.place)
  }

  componentDidMount() {
    this.props.navigation.setParams({
      rightTitle: <Icon name="link" color={'white'} size={30} />,
      rightButtonTextStyle: { color: 'gray' },
      onRight: () => {
        Clipboard.setString(this.state.place.map_url !== undefined?this.state.place.map_url:'https://www.google.com/maps/search/?api=1&query=' + this.state.place.address)
        Alert.alert('copy url', ('copy url : \n' + (this.state.place.map_url !== undefined?this.state.place.map_url:'https://www.google.com/maps/search/?api=1&query=' + this.state.place.address)), [
          {
            text: 'ok',
          }
        ]);
      },
    });

    this.setState({
      Remark: this.props.Remark,
      place: this.props.place,
    })

    // console.log(this.props.place.local_image_url =='' ?'null':'this.GetDetailData(this.props.place.place_id)');
    this.props.place.local_image_url =='' ?null:this.GetDetailData(this.props.place.place_id)
  }

  times = (str, num) => {
    return num > 1 ? str += this.times(str, --num) : str;
  }

  switchs = (value) => {
    switch (value) {
      case 'false':
        return '非營業中';
        break;
      case 'true':
        return '營業中';
        break;
      default:
        return '不明';
    }
  }

  handleChangedata = (text) => {
    var newplace = this.state.place
    newplace.Remark = text
    // console.log(newplace);
    this.setState({
      place: newplace
    })
  }

  GetDetailData = (place_id) => {
    const GOOGLE_API_KEY = 'AIzaSyAHLMny9AetUZ7UNrEI8uAwvxHo2WaCMGg'
    var url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&language=zh-TW&key=' + GOOGLE_API_KEY
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(json => {
        var place = json['result']
        this.setState({
          place: {
            place: place['name'],
            thumbnail_image_url:
              place['photos'] !== undefined
                ? 'maps.googleapis.com/maps/api/place/photo?key=' +
                GOOGLE_API_KEY +
                '&photoreference=' +
                place['photos'][0]['photo_reference'] +
                '&maxwidth=1024'
                : null,
            rating: place['rating'] !== undefined ? place['rating'] : '無',
            address:
              place['rating'] !== undefined ? place['vicinity'] : '沒有資料',
            map_url:
              'www.google.com/maps/search/?api=1&query=' +
              place['geometry']['location']['lat'] +
              ',' +
              place['geometry']['location']['lng'] +
              '&query_place_id=' +
              place['place_id'],
            // latd: place["geometry"]["location"]["lat"],
            // longd: place["geometry"]["location"]["lng"],
            price_level: place['price_level'] ? place['price_level'] : 0,
            opening_hours: place['opening_hours'] ? String(place['opening_hours']['open_now']) : 'unknow',
            user_ratings_total: place['user_ratings_total'] ? (place['user_ratings_total']) : 0,
            Remark: '',
            formatted_phone_number: place['formatted_phone_number'],
            weekday_text: place['opening_hours']['weekday_text'],
            website: place['website'],
          },
        });
      })
      .catch(msg => {
        console.log('error : ' + msg);
      })
  }

  render() {
    const { Remark, place } = this.state;

    if (!this.state.place) {
      <ImageBackground style={{ flex: 1 }} source={require('./image/background.png')}>
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
          <ActivityIndicator size="large" color="#00ff00" />
        </KeyboardAwareScrollView>
      </ImageBackground>
    }
    else {
      return (
        <ImageBackground style={{ flex: 1 }} source={require('./image/background.png')}>
          <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
            <Image style={styles.image} source={{ uri: !place.local_image_url ? 'https://' + place.thumbnail_image_url : 'file:///' + place.local_image_url, }} />
            <View style={styles.mealContent}>
              <Text style={[styles.text2, { textAlign: 'center' }]}>{place.place}</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={styles.text1}>價位：</Text>
                <Text style={styles.text2}>{this.times('$', place.price_level)}</Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={styles.text1}>評價：</Text>
                <Text style={styles.text2}>{place.rating}★</Text>
              </View>
              <View style={{ flexDirection: 'row', }}>
                <Text style={styles.text1}>地址：</Text>
                <Text style={styles.text2}>{place.address}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.text1}>電話：</Text>
                <Text style={styles.text2}>{place.formatted_phone_number}</Text>
                <TouchableOpacity
                  style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20, width: 30, height: 30, borderRadius: 10, backgroundColor: 'red', }}
                  onPress={() => {
                     Linking.openURL('tel:'+place.formatted_phone_number) 
                     }}>
                  <Icon color={'white'} size={20} name='phone-call' />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text1}>營業狀態：</Text>
                <Text style={styles.text2}>{this.switchs(place.opening_hours)}{Remark && place.map_url ? '(自動偵測)' : null}</Text>
              </View>
              {
                (place.weekday_text) ?
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.text1, { position: 'relative', top: 8 }]}>營業時間：</Text>
                    <Picker itemStyle={{ backgroundColor: 'orange' }} style={styles.Picker} mode="dropdown">
                      <Picker.Item color='orange' style={styles.Pickitem} label={place.weekday_text[0]} value="All" />
                      <Picker.Item color='orange' style={styles.Pickitem} label={place.weekday_text[1]} value="true" />
                      <Picker.Item color='orange' style={styles.Pickitem} label={place.weekday_text[2]} value="false" />
                      <Picker.Item color='orange' style={styles.Pickitem} label={place.weekday_text[3]} value="NoOpen" />
                      <Picker.Item color='orange' style={styles.Pickitem} label={place.weekday_text[4]} value="NoOpen" />
                      <Picker.Item color='orange' style={styles.Pickitem} label={place.weekday_text[5]} value="NoOpen" />
                      <Picker.Item color='orange' style={styles.Pickitem} label={place.weekday_text[6]} value="NoOpen" />
                    </Picker>
                  </View>
                  : null
              }
              {
                Remark ?
                  <Text style={styles.text1}>備註：</Text>
                  : null
              }
              {
                Remark ?
                  <TextInput placeholderTextColor={"orange"} placeholder='備註...' multiline numberOfLines={6}
                    style={{
                      color: 'orange',
                      textAlignVertical: 'top',
                      borderWidth: 0.4,
                      width: 390,
                      borderColor: 'rgba(0,0,0,0.5)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }} onChangeText={text => this.handleChangedata(text)}
                    value={this.state.place.Remark} />
                  : null
              }
            </View>
            <View style={{ position: 'relative', bottom: 155, right: 0 }}>
            </View>
          </KeyboardAwareScrollView>
          <FAB
            iconTextComponent={<Icon size={5} name="map" />}
            onClickAction={() => {
              // console.log('FAB pressed');
              Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + place.address);
            }}
            visible={true}
          />
        </ImageBackground >

      );
    }
  };
};

const styles = StyleSheet.create({
  mealList: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2.5,
  },
  mealContent: {
    marginLeft: 10,
  },
  text1: {
    fontSize: 20,
    // fontWeight: 'bold',
    paddingVertical: 3,
    textAlign: 'left',
    color: 'white'
  },
  text2: {
    fontSize: 20,
    color: 'orange',
    // fontWeight: 'blod',
    paddingVertical: 3,
    textAlign: 'left',
    flexWrap: 'wrap'
  },
  text3: {
    fontSize: 20,
    // fontWeight: 'bold',
    paddingVertical: 3,
    textAlign: 'left'
  },
  touchitem:
  {
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
  Picker: {
    flex: 4,
    width: 130,
    height: 20,
    fontSize: 20,
    marginBottom: 30,


  },
  Pickitem: {
    color: 'orange',
    backgroundColor: 'rgba(61,61,61,0.7)'
  },

});
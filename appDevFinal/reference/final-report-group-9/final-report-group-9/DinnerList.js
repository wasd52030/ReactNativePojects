import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  ImageBackground,
  PermissionsAndroid,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Actions, Tabs } from 'react-native-router-flux';
import Geolocation from 'react-native-geolocation-service';
// import Realm from 'realm';
import SideMenu from 'react-native-side-menu-updated';
import RNFS from 'react-native-fs'
import Icon from 'react-native-vector-icons/FontAwesome';
// import MapView from 'react-native-maps';
import Side from './Side.js';
import Item from './Item';

export default class DinnerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placelist: [],
      googleplacelist: [],
      longitude: '', //經度
      latitude: '', //緯度
      radius: '5000',
      rating: '0',
      opening_hours: 'All',
      findplace: '',
      // realm: new Realm({
      //   schema: [
      //     //其中一個realm model(物件)
      //     {
      //       //realm內model名稱(似table)
      //       name: 'Product',
      //       // 定義此物件的屬性
      //       properties: {
      //         place: 'string',
      //         thumbnail_image_url: 'string',
      //         rating: 'string',
      //         address: 'string',
      //         map_url: 'string',
      //         price_level: 'int',
      //         opening_hours: 'string',
      //         user_ratings_total: 'int'
      //       },
      //     },
      //   ],
      // }),
      path: RNFS.DocumentDirectoryPath + '/text.txt',
    };
  }

  UNSAFE_componentWillMount() {
    this.props.navigation.setParams({
      rightTitle: <Icon name="history" color={'white'} size={30} />,
      rightButtonTextStyle: { color: 'gray' },
      // rightTitle: '新增',
      onRight: () => {
        // console.log('refresh click');
        Actions.refresh({ key: Math.random() });
        // console.log('refresh click2');
      },
    });
    this.getPositions();
    // this.getplaceFromApi()
    // console.log(this._queryProducts())
    // console.log(global.placelist);
    this.readfile()
    // console.log('123456789'.indexOf('2'));
  }



  writefile = (data) => {
    RNFS.unlink(this.state.path)
    RNFS.writeFile(this.state.path, data, 'utf8')
      .then((msg => {
        console.log('write succ');
      }))
      .catch((msg) => {
        console.log('fail');
      })
  }

  readfile = () => {
    RNFS.readFile(this.state.path, 'utf8')
      .then((msg => {
        // console.log('read', (msg));
        this.setState({
          placelist: JSON.parse(msg),
        })
      }))
      .catch((msg) => {
        console.log('fail', msg);
      })
  }

  handlePress = (statu, place) => {
    // Linking.openURL(place['map_url']);
    Actions.push('ItemDetail', { Remark: false, place: place, hideTabBar: true });
  };

  handleButtonPress = (statu, placein) => {
    if (statu == false) {
      console.log('add place', placein.place);
      // this._saveProducts([place]);
      // global.placelist.push(placein)
      var newlist = [
        ...this.state.placelist, placein
      ]
      this.setState({
        placelist: newlist
      })
      this.writefile(JSON.stringify(newlist))
    }
    else {
      console.log('del place', placein.place)
      // this._delProducts(place)
      // global.placelist = global.placelist.filter(function (place) {
      //   return place.place !== placein.place;
      // })
      var newlist = this.state.placelist.filter(function (place) {
        return place.place_id !== placein.place_id;
      })
      this.setState({
        placelist: newlist
      })
      this.writefile(JSON.stringify(newlist))
      console.log('del succ', placein.place)
    }

  };

  // _delProducts = (products) => {
  //   // console.log('del place 1')
  //   //write是寫入資料庫
  //   this.state.realm.write(() => {
  //     this.state.realm.delete(
  //       this.state.realm.objects('Product').filter(userObj => userObj.place == products.place),
  //     )
  //   });
  // }

  // _saveProducts = products => {
  //   //write是寫入資料庫
  //   this.state.realm.write(() => {
  //     for (var i = 0; i < products.length; i++) {
  //       //每筆資料
  //       const product = products[i];
  //       //create是新增資料到model(物件)
  //       this.state.realm.create('Product', {
  //         place: product.place,
  //         thumbnail_image_url: product.thumbnail_image_url,
  //         rating: String(product.rating),
  //         address: product.address,
  //         map_url: product.map_url,
  //         price_level: product.price_level,
  //         opening_hours: product.opening_hours,
  //         user_ratings_total: product.user_ratings_total,
  //       });
  //     }
  //   });
  // };

  // _queryProducts = () => {
  //   return this.state.realm.objects('Product');
  // };

  getPositions = () => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log(position);
        this.setState({
          longitude: position.coords.longitude, //經度
          latitude: position.coords.latitude, //緯度
        });
        // console.log(this.state.longitude)
        // console.log(this.state.latitude)
        this.getplaceFromApi();
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  getplaceFromApi = (radius = this.state.radius) => {
    const GOOGLE_API_KEY = 'AIzaSyAHLMny9AetUZ7UNrEI8uAwvxHo2WaCMGg';
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.state.latitude + ',' + this.state.longitude + '&radius=' + radius + '&type=restaurant&language=zh-TW&key=' + GOOGLE_API_KEY;
    // const url ='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=22.77535,120.40286&radius=100000&type=restaurant&language=zh-TW&key=AIzaSyAHLMny9AetUZ7UNrEI8uAwvxHo2WaCMGg';
    // console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(json => {
        // console.log(json["results"][0])
        this.setState({
          googleplacelist: json['results'].map(place => {
            return {
              place_id: place['place_id'],
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
            };
          }),
        });
        // console.log(this.state.placelist[0])
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleSideMenusPress = (data) => {
    console.log(data);
    this.setState({
      googleplacelist:[],
      radius: data.radius,
      rating: data.rating,
      opening_hours: data.opening_hours,
      findplace: data.findplace,
    })

    this.getplaceFromApi(data.radius)
  }

  render() {
    const SideMenus = <Side navigator={Side} handleSideMenusPress={this.handleSideMenusPress} />;
    // const data = this._queryProducts()
    // const data = global.placelist
    const data = this.state.placelist
    var result = Object.keys(data).map((key) => data[key].place);

    var rating = (this.state.rating);
    var opening_hours = (this.state.opening_hours);
    var findplace = (this.state.findplace);

    return (
      // <ImageBackground style={{ flex: 1 }} source={image}>
      <SideMenu menu={SideMenus} menuPosition="right" isOpen={false} handleSideMenusPress={this.handleSideMenusPress}>
        <View style={styles.container}>
          <ImageBackground style={{ flex: 1 }} source={require('./image/background.png')}>
            <ScrollView>
              <View>
                {this.state.googleplacelist.length == 0 ? (
                  <ActivityIndicator size="large" color="#00ff00" />
                ) : null}
                <View style={styles.todoItems}>
                  {this.state.googleplacelist.filter(function (place) {
                    return (rating == '0' ? place : place.rating >= rating) && (
                      opening_hours == 'All' ? place : place.opening_hours == opening_hours) && (
                        place.place.indexOf(findplace) >= 0);
                  }).map(place => (
                    <Item
                      key={place.place_id}
                      data={place}
                      statu={result.includes(place.place) ? true : false}
                      onPress={this.handlePress}
                      onButtonPress={this.handleButtonPress}
                    />
                  ))}
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 分割畫面區塊
    // backgroundColor: '#F4F4F4', // 版面背景顏色
    height: 150,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    marginBottom: 10,
  },
  todoTitle: {
    color: 'orange',
    fontSize: 20, // 標題文字大小
    fontWeight: 'bold', // 標題文字粗細
    padding: 10, // 上下垂直內聚大小
    height: 1000,
  },
  todoItems: {
    marginHorizontal: -5, // TodoItems 整個區塊的左右外距大小
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hr: {
    borderColor: '#EEE',
    borderWidth: 0.2,
    marginVertical: 15,
  },
});

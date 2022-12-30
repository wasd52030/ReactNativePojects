import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert, ImageBackground, PermissionsAndroid } from 'react-native';
import { Actions, Tabs } from 'react-native-router-flux';
import Item from './Item';
// import Realm from 'realm';
import Side from './Side';
import SideMenu from 'react-native-side-menu-updated';
import RNFS from 'react-native-fs'
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/AntDesign';
export default class mealList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placelist: [
      ],
      // realm: new Realm({
      //   schema: [
      //     //其中一個realm model(物件)
      //     {
      //       //realm內model名稱(似table)
      //       name: 'Product',
      //       // 定義此物件的屬性
      //       properties: {
      //         // keyid: 'int',
      //         place: 'string',
      //         thumbnail_image_url: 'string',
      //         rating: 'string',
      //         address: 'string',
      //         map_url: 'string',
      //         price_level: 'int',
      //         opening_hours: 'string',
      //         user_ratings_total: 'int'
      //       }
      //     }
      //   ]
      // }),
      path: RNFS.DocumentDirectoryPath + '/text.txt',
    };
  }

  async UNSAFE_componentWillMount() {
    var granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        //第一次請求【拒絕】後提示用戶你為什麼要這個權限
        'title': '我要讀寫權限',
        'message': '沒權限我不能工作，同意就好了'
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('你已獲取了讀寫權限');
      // 繼續運行其它代碼
    } else {
      console.log('獲取讀寫權限失敗');
    }

    var granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        //第一次請求【拒絕】後提示用戶你為什麼要這個權限
        'title': '我要讀寫權限',
        'message': '沒權限我不能工作，同意就好了'
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('你已獲取了位址權限');
      // 繼續運行其它代碼
    } else {
      console.log('獲取位址權限失敗');
    }

    var granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        //第一次請求【拒絕】後提示用戶你為什麼要這個權限
        'title': '我要讀寫權限',
        'message': '沒權限我不能工作，同意就好了'
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('你已獲取了CAMERA權限');
      // 繼續運行其它代碼
    } else {
      console.log('獲取CAMERA權限失敗');
    }
  }

  componentDidMount() {

    // const data = this._queryProducts()
    // var result = Object.keys(data).map((key) => data[key]);
    // console.log(('result'));
    // console.log(typeof(result));
    // console.log((result));
    // this.setState({
    // placelist: result,
    // })
    // this._delProducts(result[0])
    // if (!global.placelist) {
    //   if (result != []) {
    //     global.placelist = []
    //     result.map((key) => (global.placelist.push(key)))
    //     // global.placelist.push(result.map((key) => (key))) 
    //     console.log('reset global.placelist=data');
    //     // console.log(global.placelist);
    //     this.setState({
    //       placelist: global.placelist,
    //     })
    //   }
    //   else {
    //     global.placelist = []
    //     console.log('reset global.placelist=[]');
    //   }
    // }
    // else {
    //   // console.log(global.placelist);
    //   this.setState({
    //     placelist: global.placelist,
    //   })
    // }

    // var text = global.placelist
    // this.writefile(path, JSON.stringify(text))
    this.readfile()



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
        // console.log('read',(msg));
        this.setState({
          placelist: JSON.parse(msg),
        })
      }))
      .catch((msg) => {
        console.log('fail', msg);
      })
  }

  handleRedirectForm = (id) => {
    Actions.Form({ handleAddplace: this.handleAddplace, hideTabBar: true });
  };

  handlePress = (statu, place) => {
    // Linking.openURL(place['map_url']);
    Actions.push('ItemDetail', { Remark: true, place: place, handleChangedata: this.handleChangedata, hideTabBar: true });
  }

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

  }


  handleChangedata = (data) => {
    console.log(data.Remark);

    const newlist = this.state.placelist.map(place => {
      return data.place_id == place.place_id ? data : place
    })

    console.log(newlist);
    this.setState({
      placelist: newlist
    })
    this.writefile(JSON.stringify(newlist))
  }

  handleAddplace = (palce) => {
    var newlist = [
      ...this.state.placelist,
      {
        place_id: String(Math.random())+String(this.state.placelist.length + 1),
        ...palce,
      },
    ]
    this.setState({
      placelist: newlist
    });
    this.writefile(JSON.stringify(newlist))
  };

  // _saveProducts = (products) => {
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
  // }

  // _delProducts = (products) => {
  //   // this.setState({
  //   //   placelist: this.state.placelist.filter(function (place) {
  //   //     return place.place !== products.place;
  //   //   })
  //   // })
  //   // this.state.realm.write(() => {
  //   //   this.state.realm.delete(
  //   //     this.state.realm.objects('Product').filter(userObj => userObj.place == products.place),
  //   //   )
  //   // });
  //   this.setState({
  //   })
  //   this.state.realm.write(() => {
  //     this.state.realm.delete(
  //       this.state.realm.objects('Product').filter(userObj => userObj.place == products.place),
  //     )
  //   });
  // }

  // _delAllProducts = () => {
  //   this.state.realm.write(() => {
  //     this.state.realm.deleteAll()
  //   });
  // }

  // _queryProducts = () => {
  //   return this.state.realm.objects('Product');
  // }


  render() {
    // const SideMenus = <Side navigator={Side} handleSideMenusPress={this.handleSideMenusPress} />;
    return (
      // <SideMenu menu={SideMenus} menuPosition="right" isOpen={false}>
      <ImageBackground style={{ flex: 1 }} source={require('./image/background.png')}>
        <View style={styles.container}>
          <ScrollView>
            <View>
              <View style={styles.todoItems}>
                {this.state.placelist.map(place => (
                  <Item
                    key={place.place_id}
                    data={place}
                    statu={true}
                    onPress={this.handlePress}
                    onButtonPress={this.handleButtonPress}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
        <FAB
          iconTextComponent={<Icon name="plus" />}
          onClickAction={() => {
            // console.log('FAB pressed');
            this.handleRedirectForm()
          }}
          visible={true}
        />
      </ImageBackground>
      // </SideMenu>
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

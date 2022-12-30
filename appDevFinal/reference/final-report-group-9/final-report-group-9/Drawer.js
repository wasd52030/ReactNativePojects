import React from 'react';
import { StyleSheet, Linking, TouchableOpacity, View, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Realm from 'realm';
import RNFS from 'react-native-fs'
import Icon from 'react-native-vector-icons/Feather';
class MealDrawer extends React.Component {
   = () => {
    // this.savedate(global.placelist)
    // 若已於餐點列表畫面但再次點擊則僅關閉 Drawer 視窗
    Actions.currentScene !== 'mealList' ? Actions.push('mealList') : Actions.drawerClose();
  };

  handleRedirectMealList = () => {
    // console.log('global.placelist');
    // console.log(global.placelist.length);
    // this.savedate(global.placelist)
    // 若已於餐點列表畫面但再次點擊則僅關閉 Drawer 視窗
    Actions.currentScene !== 'DinnerList' ? Actions.push('DinnerList') : Actions.drawerClose();
  };

  handleOpenMap = () => {
    Linking.openURL('https://www.google.com/maps/search/?api=1&query=高雄科技大學燕巢校區');
  };

  handleOpenTelephone = () => {
    Linking.openURL('tel:0912345678');
  }; 

  handleRedirectDeviceFeedback = () => {
    Actions.push('DeviceFeedback', { hideTabBar: true });
  };

  handlesetting = () => {
    Actions.push('Setting', { hideTabBar: true });
  };

  // savedate = (data) => {
  //   const realm = new Realm({
  //     schema: [
  //       //其中一個realm model(物件)
  //       {
  //         //realm內model名稱(似table)
  //         name: 'Product',
  //         // 定義此物件的屬性
  //         properties: {
  //           // keyid: 'int',
  //           place: 'string',
  //           thumbnail_image_url: 'string',
  //           rating: 'string',
  //           address: 'string',
  //           map_url: 'string',
  //           price_level: 'int',
  //           opening_hours: 'string',
  //           user_ratings_total: 'int'
  //         }
  //       }
  //     ]
  //   })

  //   realm.write(() => {
  //     console.log('data');
  //     console.log(data.length);
  //     console.log('delete');
  //     realm.deleteAll()
  //     console.log('data');
  //     console.log(data.length);
  //     console.log('save');
  //     for (var i = 0; i < data.length; i++) {
  //       //每筆資料
  //       const product = data[i];
  //       console.log(product);
  //       //create是新增資料到model(物件)
  //       realm.create('Product', {
  //         place: product['place'],
  //         thumbnail_image_url: product['thumbnail_image_url'],
  //         rating: String(product['rating']),
  //         address: product['address'],
  //         map_url: product['map_url'],
  //         price_level: product['price_level'],
  //         opening_hours: product['opening_hours'],
  //         user_ratings_total: product['user_ratings_total'],
  //       });
  //     }
  //   });

  // }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.75)' }}>
        <View style={styles.drawTitleView}>
          <Image style={{ flex: 1, height: 200, }} source={require('./image/dra.jpg')} />
        </View>
        <TouchableOpacity onPress={this.handleRedirectTodoList} style={styles.drawerItemView}>
          <Text style={styles.drawerItemText}><Icon size={18} name="home" />{'   '}我的最愛</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={this.handleRedirectMealList} style={styles.drawerItemView}>
          <Text style={styles.drawerItemText}><Icon size={18} name="map-pin" />{'   '}附近的美食</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={this.handlesetting} style={styles.drawerItemView}>
          <Text style={styles.drawerItemText}><Icon size={18} name="settings" />{'   '}設定</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={this.handleOpenMap} style={styles.drawerItemView}>
          <Text style={styles.drawerItemText}><Icon size={18} name="globe" />{'   '}前往官網</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={this.handleOpenTelephone} style={styles.drawerItemView}>
          <Text style={styles.drawerItemText}><Icon size={18} name="phone-call" />{'   '}聯絡我們</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={this.handleRedirectDeviceFeedback} style={styles.drawerItemView}>
          <Text style={styles.drawerItemText}><Icon size={18} name="rss" />{'   '}回報問題</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    margin: 10,
  },
  drawTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  drawTitleText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white'
  },
  cancelImage: {
    width: 20,
    height: 20,
  },
  divider: {
    borderBottomColor: '#DDD',
  },
  drawerItemView: {
    marginVertical: 10,

  },
  drawerItemText: {
    color: 'white',
    fontSize: 16,

  },
});

export default MealDrawer;

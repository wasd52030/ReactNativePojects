import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';

export default function Item(props) {
  const {
    data: { place, thumbnail_image_url, rating, address, map_url, price_level, opening_hours, user_ratings_total, local_image_url },
    statu,
    onPress,
    onButtonPress,
  } = props;

  return (
    <TouchableOpacity
      onPress={() =>
        onPress(statu, props.data)
      }
      // 根據完成狀態呈現不同的左框線顏色樣式
      style={styles.content}>
      <ImageBackground
        source={local_image_url ?{uri: 'file:///'+local_image_url,} :{uri: 'https://'+thumbnail_image_url,}}
        style={styles.image}>
        {/* <View style={styles.imageContent}> */}
        {/* <Image
          // 根據完成狀態顯示不同的待辦項目圖示
          source={{
            uri: thumbnail_image_url,
          }}
          style={styles.image}
        /> */}
        {/* </View> */}
        <View style={styles.todoContent}>
          <View>
            {/* 根據完成狀態顯示不同的標題樣式 */}
            {/* <Text style={styles.Title}>{place}</Text>
          <Text style={styles.subTitle}>評價:{rating}{"\n"}地址:{address}</Text> */}
          </View>
          <View>
            <View style={styles.tagView}>
              {/* 將 type 傳入定義的函示對應顯示中文類型文字 */}
              <TouchableOpacity
                style={{ position: 'relative' }}
                onPress={() => onButtonPress(statu, props.data)
                }>
                <Image
                  source={statu ? require('./image/1star.png') : require('./image/0star.png')}
                  style={{
                    width: 30,
                    height: 30,
                    position: 'relative',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: '#rgba(135,135,135, 0.6)',
                position: 'relative',
                width: Dimensions.get('window').width / 2 - 10,
                height: 50,
                color: 'black',
                marginTop: Dimensions.get('window').width / 5.4 ,

              }}>
              <Text
                style={styles.infotext}
                numberOfLines={1}
                ellipsizeMode="tail">
                {place}
              </Text>
              <Text style={styles.infotext}>評價:{rating}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  content: {
    flexDirection: 'row', // 每個 TodoItem 區塊透過水平方向排列
    alignItems: 'center', // 垂直置中
    backgroundColor: '#rgba(255,255,255 0.8)', // 區塊內的背景顏
    marginVertical: 12, // 區塊上下垂直外距大小
    padding: 5, // 區塊四周內距大小
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2 - 10,
    height: Dimensions.get('window').height / 4,
    borderRadius: 10,
    marginHorizontal: 5
  },
  Border: {
    borderLeftColor: '#5661EC', // 左框線顏色
  },
  imageContent: {
    flex: 0.3, // 圖示區塊大小
  },
  image: {
    width: Dimensions.get('window').width / 2 - 10,
    height: Dimensions.get('window').height / 4,
    resizeMode: 'contain',
    borderRadius: 10,
    overflow: 'hidden',
  }, // 圖示大小
  todoContent: {
    flex: 0, // 待辦內容區塊大小
    flexDirection: 'row', // 待辦內容透過水平方向排列
    justifyContent: 'space-between', // 待辦內容左右貼齊排列
    // alignItems: 'cover', // 待辦內容交叉軸置中（垂直方向）
  },
  Title: {
    fontSize: 16, // 標題文字大小
    fontWeight: 'bold', // 標題文字粗細
    width: 200,
  },
  subTitle: {
    fontSize: 14, // 子標題文字大小
    color: 'gray', // 子標題文字顏色
    paddingTop: 7, // 區塊上下內距大小
  },
  tagView: {
    alignSelf: 'flex-end', // 自己本身元素排列方向
    backgroundColor: '#rgba(255, 255, 255, 0.2)', // 背景顏色
    paddingHorizontal: 2, // 區塊左右內距大小
    paddingVertical: 2, // 區塊上下內距大小
    borderRadius: 1000, // 邊框圓角
    marginBottom: 22,
    position: 'relative',
  },
  tagText: {
    color: 'white', // 類型文字顏色
    fontSize: 14, // 類型文字大小
  },
  time: {
    color: 'gray', // 時間文字顏色
    paddingTop: 7, // 區塊上下內距大小
    textAlign: 'right', // 靠右對齊
  },
  listImg: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  infotext: {
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
  },
});
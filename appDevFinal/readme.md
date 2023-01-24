# simply map note

一個簡單的紀錄地點的東西，下面是開發歷程與參考資料，這次的期末報告就是這玩意。

對了，不得不提，學長給的code幾乎不能用，與它奮戰一段時間後就決定自幹了==

- 20221119

    - Done
      - 確立基本畫面
      - 研究資料儲存，決定使用firebase
    
- 20221122

    - Done
      - 把從firebase拉下來的資料放到畫面上
    
- 20221201
  
    - Done
      - 微調我的最愛顯示的細節
    
- 20221202
  
    - Done
      - 把GoogleMap加進去
    
- 20221203

    - Done

      - 找到`GooglePlacesAutocomplete`這個套件，不僅能在搜尋時提供建議，點選後還有一堆可用資料，例如說名稱、經緯度，地點相片.....等
      - 不過地點相片只提供`photo_reference`，要取用照片需要使用下面的網址，帶入所需參數去使用
      
        ```
        https://maps.googleapis.com/maps/api/place/photo
          ?maxwidth=400
          &photo_reference=photo_reference
          &key=YOUR_GOOGLE_MAP_API_KEY
        ```
    
      - 基於`GooglePlacesAutocomplete`這個套件重構搜尋頁面
      - 在`GooglePlacesAutocomplete`的基礎上加入清除搜尋欄位
    
- 20221205

    - Done
        - 將搜尋得到的位置資訊存入firebase firestore database中
        - 引入`react-native-android-location-enabler`來處理假設user沒開定位的狀況
    
- 20221210

    - Done
        - 實作刪除我的最愛
    
- 20221211

    - Done
        - 藉由`react-native-maps-directions`來實現路線繪製
        - 可以將資料傳到googlemap做進一步的路線規劃



參考網頁與影片

- view structure $\rightarrow$ https://ithelp.ithome.com.tw/users/20121828/ironman/3042
- firebase $\rightarrow$ https://ithelp.ithome.com.tw/users/20119550/ironman/2221 (只參考firebase的部分) 
- GooglePlacesAutocomplete https://www.youtube.com/watch?v=Wq3dO05jv6o
- react-native-android-location-enabler $\rightarrow$ https://github.com/Richou/react-native-android-location-enabler
- release apk $\rightarrow$ https://ithelp.ithome.com.tw/articles/10188858
- GooglePlacesAutocomplete custom clear button $\rightarrow$ https://github.com/FaridSafi/react-native-google-places-autocomplete/issues/581
- react-native-maps-directions $\rightarrow$https://github.com/bramus/react-native-maps-directions
- open maps/google maps in react native $\rightarrow$ https://stackoverflow.com/questions/43214062/open-maps-google-maps-in-react-native

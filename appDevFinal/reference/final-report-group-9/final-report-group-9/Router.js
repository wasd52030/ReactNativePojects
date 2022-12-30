import React from 'react';
import {
  Router,
  Stack,
  Scene,
  Tabs,
  Drawer,
  Text,
  Actions,
} from 'react-native-router-flux';
import mealList from './mealList';
import TodoDrawer from './Drawer';
import DeviceFeedback from './DeviceFeedback';
import Setting from './Setting';
import DinnerList from './DinnerList';
import ItemDetail from './ItemDetail';
import Form from './Form';
import Side from './Side';
import Icon from 'react-native-vector-icons/FontAwesome';

const Routes = () => {
  return (
    <Router>
      <Drawer drawerIcon={<Icon color={'white'} name="th-list" size={30} />} drawerWidth={230} contentComponent={TodoDrawer} tapToClose={true} negotiatePan={true}>
        {/* <Tabs headerLayoutPreset="center" tabBarPosition="bottom" showLabel={false}> */}
        <Stack navigationBarStyle={{ backgroundColor: 'rgba(0,0,0,0.75)' }} key="root" headerLayoutPreset="center" >
          <Scene titleStyle={{ color: 'white' }} key="DinnerList" component={DinnerList} title="附近的美食" initial />
          <Scene titleStyle={{ color: 'white' }} key="mealList" component={mealList} title="我的最愛" initial />
          <Scene titleStyle={{ color: 'white' }} key="DeviceFeedback" component={DeviceFeedback} title="回報問題" back backButtonTintColor='white'/>
          <Scene titleStyle={{ color: 'white' }} key="Setting" component={Setting} title="設定" back backButtonTintColor='white' />
          <Scene titleStyle={{ color: 'white' }} key="ItemDetail" component={ItemDetail} title="詳細資訊" back  backButtonTintColor='white'/>
          <Scene titleStyle={{ color: 'white' }} key="Form" component={Form} title="新增店家" back backButtonTintColor='white' />
          <Scene titleStyle={{ color: 'white' }} key="Side" component={Side} title="SideMenu" back />
        </Stack>
        {/* <Stack key="root2" headerLayoutPreset="center">
            <Scene key="DinnerList" component={DinnerList} title="附近的美食" initial />
            <Scene key="DeviceFeedback" component={DeviceFeedback} title="回報問題" back />
            <Scene key="Setting" component={Setting} title="設定" back />
            <Scene key="ItemDetail" component={ItemDetail} title="詳細資訊" back />
            <Scene key="Form" component={Form} title="新增店家" back />
          </Stack> */}
        {/* </Tabs> */}
      </Drawer>
    </Router>
  );
};


export default Routes;

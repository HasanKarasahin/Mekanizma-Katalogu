import { createStackNavigator, createAppContainer , createDrawerNavigator } from "react-navigation";

import App from './App.js';
import VideoDetails from './src/screens/VideoDetails.js';
import AddItem from './src/screens/AddItem.js';
import ListItem from './src/screens/ListItem.js';

const AppNavigator = createStackNavigator({
      ListItem: ListItem,
      AddItem: AddItem,
      App: App,
      VideoDetails: VideoDetails
});

const Drawer=createDrawerNavigator({
    ListItem:{
        screen:AppNavigator
    }
});


export default createAppContainer(Drawer);
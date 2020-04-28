import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Preload from '../../screen/preload/preload.screen'
import Login from '../../screen/login/login.screen'
import HomeDrawer from '../homeDrawer/homeDrawer.navigators'

const Stack = createStackNavigator()

const MainStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Preload' component={Preload} options={{ headerShown:false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown:false }} />
            <Stack.Screen name='HomeDrawer' component={HomeDrawer} options={{ headerShown:false }}/>
        </Stack.Navigator>
    )
}

export default MainStack


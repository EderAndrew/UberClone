import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Home from '../../screen/home/home.screen'

const Drawer = createDrawerNavigator()

const HomeDrawer = () => {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={Home}/>
        </Drawer.Navigator>
    )
}

export default HomeDrawer
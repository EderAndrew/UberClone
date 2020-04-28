import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { store, persistor } from './redux/store/store.redux'
import { NavigationContainer } from '@react-navigation/native'
import MainStack from './navigators/mainStack/mainStack.navigators'

const App = () => {
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
    
  )
}

export default App
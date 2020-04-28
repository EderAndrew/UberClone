import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

import Reducers from '../reducers/index.reducer'

const persistedReducer = persistReducer({
    key:'root',
    storage:AsyncStorage,//quem vai salvar
    whitelist:['userReducer']//lista do reducers que entrarão no asyncstorage
}, Reducers)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
import React, { useState } from 'react'
import { CommonActions } from '@react-navigation/native'
import { connect } from 'react-redux'
import { StatusBar, Platform, ActivityIndicator } from 'react-native'
import userDevsApp from '../../api/userDevsAppApi/userDevsAppApi.api'
import {
    Container,
    Header,
    HeaderTitle,
    Menu,
    MenuItem,
    MenuItemText,
    Input,
    ActionButton,
    ActionButtonText,
    LoadingArea,
} from './styled.component'

const Login = props =>{
    const api = userDevsApp()

    const [activeMenu, setActiveMenu] = useState('signin')
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)
    
    const handleSignIn = async() => {
        if(email && password){
            setLoading(true)
            const res = await api.signin(email, password)
            setLoading(false)

            if(res.error){
                alert(res.error)
            } else{
                //setar token no reducer
                props.setToken(res.token)
                //Mandar pra tela homeStack
                props.navigation.dispatch(CommonActions.reset({
                    index:0,
                    routes:[
                        { name: 'HomeStack' }
                    ]
                }))
            }
        }
    }

    const handleSignUp = async() => {
        if(name && email && password){
            setLoading(true)
            const res = await api.signup(name, email, password)
            setLoading(false)

            if(res.error){
                alert(res.error)
            }else{
                props.setToken(res.token)

                props.navigation.dispatch(CommonActions.reset({
                    index:0,
                    routes:[
                        { name: 'HomeDrawer' }
                    ]
                }))
            }
        }
    }

    return(
        <Container behavior={Platform.OS === 'ios'?'padding':null}>
        <StatusBar backgroundColor='#3574cb' />
            <Header>
                <HeaderTitle>DevsUber</HeaderTitle>
            </Header>
            <Menu>
                <MenuItem
                  active={activeMenu == 'signin'}
                  onPress={()=>setActiveMenu('signin')}
                  underlayColor='transparent'
                >
                    <MenuItemText>Login</MenuItemText>
                </MenuItem>
                <MenuItem
                  active={activeMenu == 'signup'}
                  onPress={()=>setActiveMenu('signup')}
                  underlayColor='transparent'
                >
                    <MenuItemText>Cadastrar</MenuItemText>
                </MenuItem>
            </Menu>

            {activeMenu == 'signup' && <Input
              editable={!loading}
              value={name}
              onChangeText={t=>setNome(t)}
              placeholder='Nome'
              placeholderTextColor='#999'/> 
            }
            <Input
              editable={!loading}
              value={email}
              onChangeText={t=>setEmail(t)}
              keyboardType='email-address'
              placeholder='Email' 
              placeholderTextColor='#999'
              autoCapitalize="none"
            />
            <Input
              editable={!loading}
              value={password}
              onChangeText={t=>setPassword(t)}
              secureTextEntry={true}
              placeholder='Senha'
              placeholderTextColor='#999'
            />
            {activeMenu == 'signin' &&
                <ActionButton disabled={loading} onPress={handleSignIn}>
                    <ActionButtonText>Login</ActionButtonText>
                </ActionButton>
            }
            
            {activeMenu == 'signup' &&
                <ActionButton disabled={loading} onPress={handleSignUp}>
                    <ActionButtonText>Cadastrar</ActionButtonText>
                </ActionButton>
            }
            
            {loading &&
                <LoadingArea>
                    <ActivityIndicator size='large' color='#eee' />
                </LoadingArea>
            }
           
        </Container>
    )
}


const mapStateToProps = state => {
    return{
        token:state.userReducer.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setToken:(token)=>dispatch({ type:'SET_TOKEN', payload:{ token } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
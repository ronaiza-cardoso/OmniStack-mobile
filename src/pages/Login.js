import React, { useState, useEffect } from 'react'
import { 
    Platform, 
    StyleSheet, 
    Image, 
    TextInput,  
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Toast from 'react-native-root-toast'

import api from '../services/api'

import logo from '../assets/logo.png'

export default function Login({ navigation }) {
    const [user, setUser] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user })
            }
        })
    },[])

    async function handleLogin() {
        try {
            const response = await api.post('/devs', { username: user })
            
            await AsyncStorage.setItem('user', response.data._id)
            navigation.navigate('Main', { user: response.data._id })
        } catch (error) {
            setError(true)
        }
    }

    return (
        <KeyboardAvoidingView 
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}
        >
            <Image source={logo}/>

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu usuário no Github"
                placeholderTextColor="#ddd"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <TextInput style={styles.buttonText}>Entrar</TextInput>
            </TouchableOpacity>

            <Toast
                visible={error}
                position={-20}
                duration={2000}
                hideOnPress={true}
                animation={true}
                backgroundColor={'#df4723'}
                textColor={'#fff'}
                onHide={() => setError(false)}
            >Usuário não existe no Github</Toast>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: '#fff',
        fontSize: 16
    }
})
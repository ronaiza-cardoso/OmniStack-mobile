import React, { useEffect, useState } from 'react';
import { 
    SafeAreaView,
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import logo from '../assets/logo.png'
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'

import api from '../services/api'

export default function Main({ navitaion }) {
    const id = navigation.getParam('_id')
    const [user, setUser] = useState([])
    useEffect(() => {
        (async function lodaUsers() {
            const response = await api.get('/devs', {
                user: id
            })
            setUser(response.data)
        })()

    }, id)

	return (
		<SafeAreaView style={styles.container}>
			<Image style={styles.logo} source={logo}/>

            <View style={styles.cardsContainer}>
                <View style={styles.card}>
                    <Image style={styles.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/7999914?s=460&v=4'}}/>
                    <View style={styles.footer}>
                        <Text style={styles.name}>Ronaiza Cardoso</Text>
                        <Text style={styles.bio} numberOfLines={3}>
                            Ut deserunt deserunt voluptate excepteur anim cupidatat ex pariatur est ad non nulla deserunt adipisicing.
                            Ut deserunt deserunt voluptate excepteur anim cupidatat ex pariatur est ad non nulla deserunt adipisicing.
                            Ut deserunt deserunt voluptate excepteur anim cupidatat ex pariatur est ad non nulla deserunt adipisicing.
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} >
                    <Image source={dislike}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Image source={like}/>
                </TouchableOpacity>
            </View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 30
    },

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },

    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    },

    avatar: {
        flex: 1,
        height: 300
    },

    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15
    },

    name: {
        fontSize: 16,
        color: '#333'
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 2
    },

    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 30
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#333',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 }
    }
})
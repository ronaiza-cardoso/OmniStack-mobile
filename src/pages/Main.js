import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

import api from '../services/api';

export default function Main({ navigation }) {
    const id = navigation.getParam('user');
	const [users, setUser] = useState([]);
	useEffect(() => {
		async function lodaUsers() {
			const response = await api.get('/devs', {
				headers: {
                    user: id
                }
            });
			setUser(response.data);
		}

		lodaUsers();
    }, [id]);
    
    async function handleLogout() {
        await AsyncStorage.clear()

        navigation.navigate('Login')
    }

    async function handleDislike() {
        const [ {_id}, ...rest ] = users
        await api.post('devs/' + _id + '/dislikes', null, {
            headers: { user: id }
        })

        setUser(rest)
    }
    async function handleLike() {
        const [ {_id}, ...rest ] = users
        await api.post('devs/' + _id + '/likes', null, {
            headers: { user: id }
        })

        setUser(rest)
    }

	return (
		<SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

			<View style={styles.cardsContainer}>
				{users.length ? users.map((user, index) =>
					<View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
						<Image
							style={styles.avatar}
							source={{ uri: user.avatar }}
						/>
						<View style={styles.footer}>
							<Text style={styles.name}>{user.name}</Text>
							<Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
						</View>
					</View>
				) : (
                    <Text style={styles.empty} >Acabou :(</Text>
                )}
			</View>
            {users.length !== 0 && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleDislike}>
                        <Image source={dislike} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleLike}>
                        <Image source={like} />
                    </TouchableOpacity>
                </View>
            )}
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
    },
    
    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 20
    }
})
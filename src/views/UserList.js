/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import {Avatar, ListItem} from 'react-native-elements'
import {View, FlatList, Alert} from 'react-native';
import UsersContext from '../context/UsersContext';

export default props => {

    const {state, dispatch } = useContext(UsersContext)
 
    function confirmUserDeletion(user) {
        Alert.alert('Excluir usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getUserItem({item: user}) {
        return (
            <ListItem
            key={user.id}
            bottomDivider
            onPress={() => props.navigation.navigate('UserForm', user)}>
                <Avatar title={user.name} source={{uri: user.avatarUrl}} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    iconProps={{name: 'edit'}}
                    iconStyle={{fontSize: 25, color: 'orange'}} />
                <ListItem.Chevron
                onPress={() => confirmUserDeletion(user)}
                iconProps={{name: 'delete'}}
                iconStyle={{fontSize: 25, color: 'red'}} />
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList 
                keyExtractor={user => user.id}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    );
};

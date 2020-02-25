import React from 'react';
import {View, Text} from 'react-native';

export default function subjectItem({item}){
    return (
        <View>
            <Text>{`Name: ${item.name}`}</Text>
            <Text>{`Identity: ${item.identity}`}</Text>
            <Text>{`Class name: ${item.className}`}</Text>
            <Text>--------------</Text>
        </View>
    )
}

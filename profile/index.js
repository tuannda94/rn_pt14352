import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image, Switch} from 'react-native';
import InfoText from './info-text';
import SubjectItem from './subject-item';

export default function Profile() {
    const userProfile = {
        info: {
            avatar: 'https://iap.poly.edu.vn/user/ph/PH09025.jpg',
            name: 'Nguyen Van A',
            email: 'a@gmail.com',
            address: 'HN',
            phone: '0123456789',
            active: true
        },
        subjects: [
            {
                name: 'React Native',
                identity: 'MOB306',
                className: 'PT14352',
            },
            {
                name: 'React Native',
                identity: 'MOB306',
                className: 'PT14352',
            },
            {
                name: 'React Native',
                identity: 'MOB306',
                className: 'PT14352',
            }
        ]
    };
    // Khai bao state + ham thay doi gia tri cua no
    const [showInfo, setShowInfo] = useState(true);

    return (
        <View style={style.profileContainer}>
            <View style={style.avatar}>
                <Image style={style.image} source={{uri: userProfile.info.avatar}} />
                <Switch value={showInfo} onValueChange={() => setShowInfo(!showInfo)} />
            </View>
            <Text>--------------</Text>
            <View>
                {
                    showInfo
                        ? <InfoText data={userProfile.info} />
                        : null
                }
                <Text>--------------</Text>
                <FlatList
                    data={userProfile.subjects} // mảng nhận vào để hiển thị danh sách
                    renderItem={({item}) => <SubjectItem item={item} />} // item ứng với {name: '', identity: '', className: ''}
                    keyExtractor={(item, index) => index}
                />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    profileContainer: {},
    avatar: {},
    image: {
        width: 200,
        height: 200,
        borderRadius: 200
    }
});

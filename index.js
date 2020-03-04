import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Switch} from 'react-native';
import {registerRootComponent} from 'expo'; // higherOrder component

function App() {
    const API = 'https://5e5a60986a71ea0014e61d88.mockapi.io/api/subjects';
    // Dinh nghia ham xu ly cong viec call API
    const fetchSubjects = () => {
        return fetch(
            API, // api
            {} // object khai bao method, header(kieu du lieu gui len, kieu du lieu nhan ve), body(data gui len)
        )
        .then((response) => response.json())
        .then((responseJson) => {setSubjects(responseJson)})
        .catch((error) => console.log(error));
    };

    useEffect(
        // tham so 1: la 1 arrow function chua cac xu ly lien quan den API
        // tham so 2: la 1 mang, chua cac item la cac bien co su thay doi,
            // neu thay doi thi moi goi tiep cai ham o tham so 1
        () => {fetchSubjects();}
        , [showList]
        // Neu tham so thu 2 la array, khong co item nao thi se chi chay 1 lan
        // Neu co thi se kiem tra su thay doi va neu thay doi thi goi lai arrow function
        // Hien tai khi state showList thay doi thi arrow function o tren chua call lai du da render lai roi
        // Gia su neu phan trang va click thi state luu page se thay doi nhung api lay du lieu trang moi van chua goi
    )

    console.log(subjects);

    const [subjects, setSubjects] = useState([]);
    const [showList, setShowList] = useState(true);

    return (
        <View style={styles.container}>
            <Text>List subject</Text>
            <Switch value={showList} onValueChange={() => setShowList(!showList)} />
            {showList ?
            <FlatList
                data={subjects}
                renderItem={({item}) =>
                <View>
                    <Text>{item.id}</Text>
                    <Text>{item.identity}</Text>
                    <Text>{item.name}</Text>
                    <Text>{item.className}</Text>
                    <Image style={styles.logo} source={{uri: item.logo}} />
                </View>
            }
            />
            : null}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50
    }
});

export default registerRootComponent(App);

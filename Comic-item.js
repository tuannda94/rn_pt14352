import React, { useState } from 'react';
import {

    TouchableHighlight,
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity,
    Modal
} from 'react-native';

export default function subjectItem({ item, handleDelete }) {
    const alertDelete = (name, handleDelete) => {
        return Alert.alert(
            'Delete Subject', // tham so dau tien: title
            `Bạn có muốn xóa không ${name} Không?`, // tham so t2: content
            [
                {
                    text: 'Có',
                    onPress: () => { handleDelete(name) }
                },
                {
                    text: 'Không',
                    onPress: () => { }
                }
            ],
            { cancleable: false } // cho click ra ben ngoai alert hay khong (true -> disable)
        )
    };
    const [showModalComic, setShowModalComic] = useState(false);
    return (
        <View style={style.colum}  >
          
            <Modal visible={showModalComic} >

                <View style={style.colum}>
                    <View style={style.viewboder1} >
                        < Image style={style.imgmodel} source={{ uri: item.img }} />
                    </View>
                    <View style={style.item1} >
                        <View  >
                            <Text style={style.h1}>{`Name: ${item.name}`}</Text>
                            <Text style={style.h2}>{`Author: ${item.author}`}</Text>
                            <Text style={style.h2}>{`Category: ${item.category}`}</Text>
                            <Text style={style.h2}>{`Chapters: ${item.chapters}`}</Text>
                            <Text style={style.h2}>{`Content: ${item.content}`}</Text>
                            <Text style={style.h2}>{`Active: ${item.active ? 'Full' : 'Not full'}`}</Text>
                        </View>

                        <TouchableHighlight
                            style={style.submit}
                            onPress={() => { setShowModalComic(false) }}>
                            <Text style={style.submitText}>Not detail</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const style = StyleSheet.create({
    colum: {
        justifyContent: "center",
        flex: 1,

        flexDirection: 'column',
        backgroundColor: 'white',

        borderColor: "#00bcd4",
        marginTop: 20


    }, solid: {
        height: 1,
        backgroundColor: "#00bcd4"
    },
    row: {
        flex: 1,


        flexDirection: "row",
        backgroundColor: 'white',

        borderColor: "#00bcd4"

    }, viewboder: {


        padding: 10,
        backgroundColor: "#ffff",
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#00bcd4',
        marginBottom: 20

    },
    viewboder1: {


        padding: 10,
        backgroundColor: "#ffff",
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#00bcd4',
        marginBottom: 20

    }
    , image: {


        padding: 10,

        width: 80,
        height: 100,
        borderRadius: 2
    },
    h1: {
        padding: 5,
        fontSize: 20,

    },
    h2: {
        marginLeft: 5,
        padding: 5,
    },
    submit: {
        overflow: 'hidden',


        marginTop: 13,
        padding: 10,
        backgroundColor: '#00bcd4',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ffff"
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
    }, item1: {
        flex: 1,
        flexDirection: "column",
        flexGrow: 1
    }, item: {

    },
    row2: {
        marginTop: 50,

        display: "flex",
        borderRadius: 5,

        flexDirection: 'row',
        backgroundColor: 'white',

        borderColor: "#00bcd4"

    },
    imgmodel: {

        margin: 10,
        padding: 10,
        marginBottom: 10,
        width: 175,
        height: 300,
        borderRadius: 1
    }

});

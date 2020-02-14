import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Row from './row';

// Khi ten file la index.js thi ben import se chi can tro den thu muc
// import xxx from './list' -> './list/index'
export default function List({data})
{
    const renderRow = () => {
        // Khai bao mang rong de lay cac phan hien thi tung row vao
        const list = [];

        for(let i = 0; i < data.length; i++) {
            const row = (
                <Row item={data[i]} />
            );
            // Push row vua nhan duoc vao trong list
            list.push(row);
        }

        return list;
    }

    return(
        renderRow()
    );
}

const style = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 20,
        margin: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#ccc"
    },
    right: {
        marginLeft: 20,
        fontSize: 30,
        fontStyle: "italic"
    }
});

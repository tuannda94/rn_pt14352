import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Switch,
  Modal,
  Button,
  TextInput,
  Picker
} from 'react-native';
import InfoText from './info-text';
import SubjectItem from './subject-item';

export default function Profile() {
  let userProfile = {
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
        identity: 'MOB307',
        className: 'PT14352',
      },
      {
        name: 'React Native',
        identity: 'MOB308',
        className: 'PT14352',
      }
    ]
  };

  // Khai bao state + ham thay doi gia tri cua no
  const [showInfo, setShowInfo] = useState(true);
  // Chuyen viec su dung userprofile sang state, de khi user thay doi gia tri se render lai man hinh
  const [user, setUser] = useState(userProfile);
  // Tao state kiem soat viec hien thi cua modal add subject
  const [showModal, setShowModal] = useState(false);

  // Khai bao ham thuc hien cong viec xoa
  const handleDeleteSubject = (identity) => {
    // su dung let de co the gan gia tri moi
    let newSubjectList = user.subjects;
    // filter ((item) => tra ve dieu kien ma item do se duoc xu ly)
    // sau khi filter xong (chay het vong lap voi dieu kien dua ra) -> tra ve mang moi co cac item thoa man dk

    newSubjectList = newSubjectList.filter((subject) => subject.identity != identity);
    userProfile.subjects = newSubjectList;
    setUser(userProfile);
  }

  const [nameSetter,setName]=useState("");
  const [identitySetter,setIdentity]=useState("");
  const [classNameSetter,setClassName]=useState("");
  return (
    <View style={style.profileContainer}>
      <View style={style.avatar}>
        <Image style={style.image} source={{ uri: user.info.avatar }} />
        <Switch
          value={showInfo}
          onValueChange={() => setShowInfo(!showInfo)}
        />
      </View>
      <Text>--------------</Text>
      <View>
        {showInfo ? <InfoText data={user.info} /> : null}
        <Text>--------------</Text>
        <Button
          title="Add subject"
          onPress={() => {
            setShowModal(true);
          }}
        />
        <FlatList
          data={user.subjects} // mảng nhận vào để hiển thị danh sách
          renderItem={({ item }) => (
            <SubjectItem item={item} handleDelete={handleDeleteSubject} />
          )} // item ứng với {name: '', identity: '', className: ''}
          keyExtractor={(item,index) => index}
        />
      </View>
      <Modal visible={showModal}>
        <View>
          <Text style={style.title}>Modal Add Subject</Text>
          <TextInput style={style.inputLabel} placeholder="Name" onChangeText={(text) => setName(text)} />
          <TextInput style={style.inputLabel} placeholder="Identity" onChangeText={(text) => setIdentity(text)} />
          <Picker mode="dropdown" style={style.inputLabel} selectedValue={classNameSetter.toString()}  onValueChange={(itemValue, index) => {
            setClassName(itemValue);
          }}>
            <Picker.Item value="PT1111" label="PT1111" />
            <Picker.Item value="PT1112" label="PT1112" />
            <Picker.Item value="PT1113" label="PT1113" />
          </Picker>
          <View style={style.btnParent}>
            <View style={style.button}>
              <Button
                title="Cancle"
                onPress={() => {
                  setShowModal(false);
                }}
              />
            </View>
            <View style={style.button}>
              <Button title="Submit" onPress={() => {
                  const newSubject = {
                  name:nameSetter.toString(),
                  identity:identitySetter.toString(),
                  className:classNameSetter.toString()
                }
                user.subjects.push(newSubject);
                setUser(user);
                setShowModal(false);
              }} />
            </View>
          </View>
        </View>
      </Modal>
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
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
    backgroundColor: "#00bcd4",
    padding: 16
  },
  inputLabel: {
    borderColor: "#00bcd4",
    borderWidth: 1,
    borderRadius: 10,
    margin: 8,
    height: 50,
    paddingLeft: 8
  },
  btnParent: {
    marginTop: 16,
    flexDirection: "row"
  },
  button: {
    margin: 8,
    justifyContent:"space-around"
  }


});

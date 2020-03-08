import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Switch, Button, Modal, TextInput} from 'react-native';
import {registerRootComponent} from 'expo'; // higherOrder component

function App() {
    const [subjects, setSubjects] = useState([]);
    const [showList, setShowList] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [className, setClassName] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [logoURL, setLogoURL] = useState('');
    const [identity, setIdentity] = useState('');
    const [id, setId] = useState('');
    const [ isUpdate, setIsUpdate] = useState(false);
    const [isDetail,setIsDeail] =useState(false);
    const [showDetailModal,setShowDetailModal] = useState(false);
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
        () => {
            fetchSubjects();
        }
        , []
        // Neu tham so thu 2 la array, khong co item nao thi se chi chay 1 lan
        // Neu co thi se kiem tra su thay doi va neu thay doi thi goi lai arrow function
        // Hien tai khi state showList thay doi thi arrow function o tren chua call lai du da render lai roi
        // Gia su neu phan trang va click thi state luu page se thay doi nhung api lay du lieu trang moi van chua goi
    )
    // console.log(subjects, 123123, showList);

    const deleteSubject = (id) => {
        const newSubject = subjects.filter(item => item.id != id);
        setSubjects(newSubject);
    }

    const handleDelete = (id) => {
        setShowLoading(true);
        deleteSubject(id);

        fetch(
            `${API}/${id}`,
            {method: 'DELETE'}
        ).then(() => {
            setShowLoading(false);
        })
        .catch((error) => console.log(error));
    }

    const setModalData = (data) => {
        setClassName(data.className);
        setSubjectName(data.name);
        setLogoURL(data.logo);
        setIdentity(data.identity);
        setIsUpdate(data.id); // set isUpdate = id -> neu co id thi se hieu la true, con k co id thi se la undefined -> hieu la false
    }

    const handleAddSubject = (responseJson) => {
        const newSubjects = [...subjects]; // clone subjects, neu clone object -> {...subject}

        return newSubjects.push(responseJson); // return de gan gia tri duoi phan then
    }

    const handleUpdateSubject = (responseJson) => {
        const newSubjects = [...subjects];
        // Tim vi tri item bi thay doi
        const updateSubjectIndex = newSubjects.findIndex(item => item.id = responseJson.id);
        // Gan item moi cho vi tri do trong array
        newSubjects[updateSubjectIndex] = responseJson;

        return newSubjects;
    }

    const handleSubmit = () => {
        // 1. Hien thi loading va an modal sau khi press submit
        setShowLoading(true);
        setShowModal(false);
        // 2. Khai bao subject duoc them moi kem key value
        const subject = {
            className: className,
            name: subjectName,
            logo: logoURL,
            identity: identity
        };
        // const subject = {
        //     className,
        //     name: subjectName,
        //     logo: logoURL,
        //     identity
        // };
        // 3. Call API de them subject vao db tren server
        const api = isUpdate ? `${API}/${isUpdate}` : API;
        fetch(
            api,
            {
                method: isUpdate ? 'PUT' : 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(subject)
            }
        ).then((response) => response.json())
        .then((responseJson) => {
            let newSubjects = [];
            if (isUpdate) {
                newSubjects = handleUpdateSubject(responseJson);
            } else {
                newSubjects = handleAddSubject(responseJson);
            }

            setSubjects(newSubjects);
            setShowLoading(false);
        })
        .catch((error) => console.log(`ERROR: ${error}`));

        setModalData({
            className: '',
            name: '',
            logo: '',
            identity: ''
        });
    }   

    const showEditModal = (id) => {
        const subject = subjects.find((item) => item.id == id);

        setModalData(subject);
        setShowModal(true);
    }
    const  showDetailModall =(id) => {
        return fetch(
            API+"/"+id
        ).then((response)=>response.json())
        .then((responseJson)=>
        {setShowDetailModal(true);
         setSubject(responseJson);
        })
        .catch((error)=>console.error(error))
       
    }
    const handleCancle = () => {
        setShowModal(false);
    }
    const handleCancleDetail = () => {
        setShowDetailModal(false);
    }

    

    const setSubject=(response)=>{
        setClassName(response.className);
        setSubjectName(response.name);
        setLogoURL(response.logo);
        setIdentity(response.identity);
        setIsUpdate(response.id);
        setId(response.id)
    }

    return (
      <View style={styles.container}>
        <Text>List subject</Text>
        <Switch value={showList} onValueChange={() => setShowList(!showList)} />
        {
            showLoading
                ? <Text>LOADING...</Text>
                : null
        }
        <Button title='ADD SUBJECT' onPress={() => setShowModal(true)} />
        <Modal visible={showModal} >
            <View>
                <Text>Class Name</Text>
                <TextInput value={className} onChangeText={(value) => setClassName(value)} />
            </View>
            <View>
                <Text>Subject Name</Text>
                <TextInput value={subjectName} onChangeText={(value) => setSubjectName(value)} />
            </View>
            <View>
                <Text>Logo (Input Image URL)</Text>
                <TextInput value={logoURL} onChangeText={(value) => setLogoURL(value)} />
            </View>
            <View>
                <Text>identity</Text>
                <TextInput value={identity} onChangeText={(value) => setIdentity(value)} />
            </View>
            <View>
                <Button title='SUBMIT' onPress={() => handleSubmit()} />
                <Button title='CANCLE' onPress={() => handleCancle()} />
            </View>
        </Modal>
        {showList ? (
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <View>
                <Text>{item.id}</Text>
                <Text>{item.identity}</Text>
                <Text>{item.name}</Text>
                <Text>{item.className}</Text>
                <Image style={styles.logo} source={{ uri: item.logo }} />
                <Button title='DETAIL' onPress={() => showDetailModall(item.id)} />
                <Button title='EDIT' onPress={() => showEditModal(item.id)} />
                <Button title="DELETE" onPress={() => handleDelete(item.id)} />
              </View>
            )}
            keyExtractor={(item, index) => item.id}
          />
        ) : null}

        <Modal visible={showDetailModal}>
            <View style={styles.detail_modal}>
            <View   >
                        <Image  source={{uri:logoURL}} />
                    </View>
                    <View>
                        <View >
                            <Text >ID: {id}</Text>
                        </View>
                        <View>
                            <Text >CLASSNAME: {className}</Text>
                        </View>
                        <View>
                            <Text >SUBJECTNAME: {subjectName}</Text>
                        </View>
                        <View>
                            <Text >IDENTITY: {identity}</Text>
                        </View> 
                    </View>
                <Button style={styles.modal_detail} title='BACK' onPress={() => handleCancleDetail()} />
            </View>
        </Modal>
      </View>
    );
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
    },
    modal_detail:{
        top:100
    },
    detail_modal:{
        alignItems:'center',
        margin:20
    }
});

export default registerRootComponent(App);

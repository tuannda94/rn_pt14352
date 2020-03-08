import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Switch, Button, Modal, TextInput,TouchableOpacity,ImageBackground} from 'react-native';
import {registerRootComponent} from 'expo'; 

function App() {
    const [subjects, setSubjects] = useState([]);
    const [showList, setShowList] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [total_chapters, setTotal_chapters] = useState('');
    const [id, setId] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [showModalDetail, setShowModalDetail] = useState(false);

    const API = 'https://5e63524af48bc60014536aa7.mockapi.io/api/subjects';
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

    const getItemFromAPI=(id)=>{
        return fetch(
            API+"/"+id
        ).then((response)=>response.json())
        .then((responseJson)=>
        {setShowModalDetail(true);
         setSubject(responseJson);
        console.log(responseJson)})
        .catch((error)=>console.error(error))
    }

    const setSubject=(response)=>{
        setName(response.name);
        setCategory(response.category);
        setTotal_chapters(response.total_chapters);
        setThumbnail(response.thumbnail);
        setIsUpdate(response.id);
        setId(response.id)
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
        setName(data.name);
        setCategory(data.category);
        setThumbnail(data.thumbnail);
        setTotal_chapters(data.total_chapters);
        setIsUpdate(data.id); // set isUpdate = id -> neu co id thi se hieu la true, con k co id thi se la undefined -> hieu la false
    }

    const handleAddSubject = (responseJson) => {
        const newSubjects = [...subjects]; 

        return newSubjects.push(responseJson);
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
            name: name,
            category: category,
            thumbnail: thumbnail,
            total_chapters: total_chapters
        };
        
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
            name: '',
            category: '',
            thumbnail: '',
            total_chapters: ''
        });
    }

    const showEditModal = (id) => {
        const subject = subjects.find((item) => item.id == id);

        setModalData(subject);
        setShowModal(true);
    }



    const handleCancle = () => {
        setShowModal(false);
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
        <Modal visible={showModalDetail}>
                <View style={styles.container_detail}>
                    <View style={styles.image} >
                        <Image style={styles.image} source={{uri:thumbnail}} />
                    </View>
                    <View>
                        <View >
                            <Text style={styles.textDetail}>ID: {id}</Text>
                        </View>
                        <View>
                            <Text style={styles.textDetail}>Name: {name}</Text>
                        </View>
                        <View>
                            <Text style={styles.textDetail}>Catogery: {category}</Text>
                        </View>
                        <View>
                            <Text style={styles.textDetail}>Total chapters: {total_chapters}</Text>
                        </View> 
                    </View>
                    



                    <View style={styles.containerButton}>
                        <TouchableOpacity disabled={false}  
                                    onPress={
                                        ()=>setShowModalDetail(false)
                                    }
                                    style={[styles.button]}>
                                <Text style={[styles.text]}>Back</Text>

                        </TouchableOpacity>
                    </View>
               </View>

        </Modal>


        <Modal visible={showModal} >
            <View>
                <Text>Class Name</Text>
                <TextInput value={name} onChangeText={(value) => setName(value)} />
            </View>
            <View>
                <Text>Subject Name</Text>
                <TextInput value={category} onChangeText={(value) => setCategory(value)} />
            </View>
            <View>
                <Text>Logo (Input Image URL)</Text>
                <TextInput value={thumbnail} onChangeText={(value) => setThumbnail(value)} />
            </View>
            <View>
                <Text>identity</Text>
                <TextInput value={total_chapters} onChangeText={(value) => setTotal_chapters(value)} />
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
                <Text>{item.total_chapters}</Text>
                <Text>{item.name}</Text>
                <Text>{item.category}</Text>
                <Image style={styles.logo} source={{ uri: item.thumbnail }} />
                <Button title='EDIT' onPress={() => showEditModal(item.id)} />
                <Button title="DELETE" onPress={() => handleDelete(item.id)} />
                <Button title="DETAIL" onPress={() =>  getItemFromAPI(item.id)} />
              </View>
            )}
            keyExtractor={(item, index) => item.id}
          />
        ) : null}
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
    button: {
        width:100,
        display: 'flex',
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2AC062',
        shadowColor: '#2AC062',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    image:{   
      
        borderRadius:60,
        width:120,
        height:120
    },
    container_detail:{
        
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDetail:{
        color:'black',
        padding:8,
        fontSize:15
    },

    text: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#FFFFFF',
    },
    
    text1: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#FFFFFF',
    }
});

export default registerRootComponent(App);
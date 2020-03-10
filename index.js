import React, { useState,useEffect } from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Switch,
  Modal,
  Button,
  TextInput,
  Picker,
  Alert,
  Platform,
  ScrollView
}
  from 'react-native';
import ComicItem from './Comic-item';
import InfoText from './info-text';
import { TrackingConfiguration } from 'expo/build/AR';
export default function Profile() {
  const comicProfile = 
  
   [
   
    ];
 
 const info= {
name:"",
age:"",
}
  
const API = 'https://5e64475ba49c210016106937.mockapi.io/api/v1/comic';
// Dinh nghia ham xu ly cong viec call API
const fetchComics = () => {
    return fetch(
        API, // api
        {} // object khai bao method, header(kieu du lieu gui len, kieu du lieu nhan ve), body(data gui len)
    )
        .then((response) => response.json())
        .then((responseJson) => { setComic(responseJson) })
        .catch((error) => console.log(error));
};

useEffect(
    // tham so 1: la 1 arrow function chua cac xu ly lien quan den API
    // tham so 2: la 1 mang, chua cac item la cac bien co su thay doi,
    // neu thay doi thi moi goi tiep cai ham o tham so 1
    () => {
        fetchComics();
    }
    , []
    // Neu tham so thu 2 la array, khong co item nao thi se chi chay 1 lan
    // Neu co thi se kiem tra su thay doi va neu thay doi thi goi lai arrow function
    // Hien tai khi state showList thay doi thi arrow function o tren chua call lai du da render lai roi
    // Gia su neu phan trang va click thi state luu page se thay doi nhung api lay du lieu trang moi van chua goi
)
// console.log(Comics, 123123, showList);
 // Khai bao state + ham thay doi gia tri cua no
 const [category, setCategory] = useState(true);
 const [name, setName] = useState('');
 const [img, setImg] = useState('');
 const [chapters, setChapters] = useState('');
 const [author, setAuthor] = useState('');
 const [content, setContent] = useState('');
 const [status, setStatus] = useState(true);
 const [showInfo, setShowInfo] = useState(true);
 // Chuyen viec su dung userprofile sang state, de khi user thay doi gia tri se render lai man hinh
 const [comics, setComic] = useState(comicProfile);
 const [ifo, setInfo] = useState(info);
 const [showModalComic, setShowModalComic] = useState(false);
 const [showLoading, setShowLoading] = useState(false);
 const [showAddComic, setShowAddComic] = useState(false);
 // Tao state kiem soat viec hien thi cua modal add Comic
 const [showModalUser, setShowModalUser] = useState(true);
 const [showComic, setShowComic] = useState(false);
 const [currentComic, setcurrentComic] = useState({});
 const [showModal, setShowModal] = useState(false);
 const [isUpdate, setIsUpdate] = useState(false);
 // Khai bao ham thuc hien cong viec xoa
 const deleteComic = (id) => {
  const newComic = comics.filter(item => item.id != id);
  setComic(newComic);
}
 const handleDeleteComic = (id) => {
  setShowLoading(true);
  deleteComic(id);

  fetch(
      `${API}/${id}`,
      { method: 'DELETE' }
  ).then(() => {
      setShowLoading(false);
  })
      .catch((error) => console.log(error));
 }
 const fetchItem = (id) => {
  return fetch(
      API + "/" + id
  ).then((response) => response.json())
      .then((responseJson) => {
          setShowModalComic(true);
          setcurrentComic(responseJson);
          setShowLoading(false); setShowModalComic(true);
          console.log(responseJson);

      })
      .catch((error) => console.error(error))
}
const handleGetItem = (id) => {
  setShowLoading(true);
  fetchItem(id);
}

 const [inputUserName, setInputUserName] = useState('');
 const [inputUserAge, setInputUserAge] = useState('');


 const setDefaultValue = () => {
   setInputUserName('');
   setInputUserAge('');
setShowComic(false);
 }

 const setDefaultButton = () => {
 
setShowComic(false);
 }


 // Tao ham va xu ly viec add Comic

 const handleAddUser = () => {
   info.name = inputUserName,
    info.age = inputUserAge,

     // };

     // let newComicList = user.comics;
     // newComicList.push(newComic);
     // userProfile.comics = newComicList;

     setInfo(info);
     console.log(info);
   setShowModalUser(false);
   setDefaultValue();
 }
 const handleAddComic = (responseJson) => {
  const newComics = [...comics]; // clone subjects, neu clone object -> {...subject}

  return newComics.push(responseJson); // return de gan gia tri duoi phan then
}

const handleUpdateComic = (responseJson) => {
  const newComics = [...comics];
  // Tim vi tri item bi thay doi
  const updateSubjectIndex = newComics.findIndex(item => item.id === responseJson.id);
  // Gan item moi cho vi tri do trong array
Console.log(updateSubjectIndex);
  newComics[updateSubjectIndex] = responseJson;

  return newComics;
}
const setModalData = (data) => {
  setName(data.name);
      setCategory(data.category);
  setImg(data.img);
  setChapters(data.chapters);
  setContent(data.content);
  setAuthor(data.author);

  setIsUpdate(!!data.id); // set isUpdate = id -> neu co id thi se hieu la true, 
  // con k co id thi se la undefined -> hieu la false
}
const handleSubmit = () => {
  // 1. Hien thi loading va an modal sau khi press submit
  setShowLoading(true);
  setShowAddComic(false);
  // 2. Khai bao subject duoc them moi kem key value
  const subject = {
    category:category,
    name:name,
    img: img,
    chapters:chapters,
    author:author,
    content:content
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
          // let newComics = [];
          // if (isUpdate) {
          //     newComics = handleUpdateComic(responseJson);
          // } else {

          //     newComics = handleAddComic(responseJson);
            
          // }

          // setComic(newComics);
          // setShowLoading(false);
          if(!isUpdate){
          const newComic=[...comics];
          newComic.push(responseJson);
          setComic(newComic);
          setShowLoading(false);}
          if(isUpdate){
            let newComic=[...comics];
            console.log(newComic)
             const updateSubjectIndex = newComic.findIndex(item => item.id === responseJson.id);
             console.log(updateSubjectIndex);
  // Gan item moi cho vi tri do trong array
  newComic[updateSubjectIndex] = responseJson;
  setComic(newComic);
  setShowLoading(false);}
          
      })
      .catch((error) => console.log(`ERROR: ${error}`));

  setModalData({
      category: '',
      name: '',
      img: '',
      chapters: '',
      author:'',
      content:''
  });
}

const showEditModal = (id) => {
  const cm = comics.find((item) => item.id == id);

  setModalData(cm);
  setShowAddComic(true);
}

const handleCancle = () => {
  setShowAddComic(false);
}
 const alertDelete = (name,id) => {
  return Alert.alert(
      'Delete Subject', // tham so dau tien: title
      `Bạn có muốn xóa không ${name} Không?`, // tham so t2: content
      [
          {
              text: 'Có',
              onPress: () => { handleDeleteComic(id) }
          },
          {
              text: 'Không',
              onPress: () => { }
          }
      ],
      { cancleable: false } // cho click ra ben ngoai alert hay khong (true -> disable)
  )
};
 return (
   <View >

   
     <View style={{flex:1,flexDirection:"column", marginTop :Platform.OS==='ios'?34:0}}   >
 <View style={{height:64,marginBottom:50,alignItems:"center"}}>
       {showInfo ? <InfoText data={ifo} /> : null}
       <Text>--------------</Text>
       <Button
         title="Quay lại"
         onPress={() => {
           setShowModalUser(true);
         }}

       />
   
   <TouchableHighlight
                          style={style.submit1}
                          onPress={() => { setShowAddComic(true) }}
                          underlayColor='#fff'>
                          <Text style={style.submitText}>ADD</Text>
       </TouchableHighlight>
     
     </View>
        <View style={{ height: 500, backgroundColor: "white" }} >
        {
                showLoading
                    ? <Text>LOADING...</Text>
                    : null
            }
           <FlatList
            data={comics} 
            renderItem={({ item }) => (
              <View>
              <View style={style.row}>
                  <View style={style.viewboder}>
                      < Image style={style.image} source={{ uri: item.img }} />
                  </View>
                  <View style={style.item1} >
                      <View >
                          <Text style={style.h1}>{`Name: ${item.name}`}</Text>
                          <Text style={style.h2}>{`Category: ${item.category}`}</Text>
                          <Text style={style.h2}>{`Chapters: ${item.chapters}`}</Text>

                          <Text style={style.h2}>{`Active: ${item.active ? 'Full' : 'Not full'}`}</Text>
                      </View>
                  </View>
                  <View style={style.item} >

                      <TouchableHighlight
                          style={style.submit}
                          onPress={() => { alertDelete(item.name,item.id) }}
                          underlayColor='#fff'>
                          <Text style={style.submitText}>Delete</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                          style={style.submit}
                          onPress={() => {showEditModal(item.id)}}
                          underlayColor='#fff'>
                          <Text style={style.submitText}>Edit</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                          style={style.submit}
                          onPress={() => { handleGetItem(item.id)}}>
                          <Text style={style.submitText}>Detail</Text>
                      </TouchableHighlight>
                  </View>
              </View>
              <View style={style.solid}>

              </View>
          </View>
            )} // item ứng với {name: '', identity: '', className: ''}
            keyExtractor={(item, index) => item.id}
          />
        </View>
      </View>
      
      <Modal visible={showModalUser}>
        <View style={styles.container}>
          <Text style={styles.title}>Thông tin người dùng</Text>
          <Text style={styles.chu}>Tên</Text>
          <TextInput style={styles.inputLabel} value={inputUserName} onChangeText={(value) => setInputUserName(value)} />
          <Text style={styles.chu}>Tuổi</Text>
          <TextInput keyboardType='number-pad' style={styles.inputLabel} value={inputUserAge} onChangeText={(value) => setInputUserAge(value)} />
          <TouchableHighlight
            disabled={showComic}
            style={style.submit}

            onPress={() => {
              if (inputUserAge == "" || inputUserAge == "") {

                Alert.alert(
                  'Bạn phải nhập đầy đủ thông tin')


              } else {
                if (inputUserAge < 18) {
                  setShowComic(true)
                  Alert.alert(
                    'Bạn chưa đủ tuổi !'
                  )
                  setDefaultButton();
                }

                else {
                  setShowModalUser(false);
                  setShowComic(false);

                  handleAddUser()
                }
              }

            }
            }
            underlayColor='#fff'>
            <Text style={style.submitText}>Vào đọc truyện</Text>
          </TouchableHighlight>

        </View>
      </Modal>
      <Modal visible={showModalComic} >

<View style={style.colum}>
    <View style={style.viewboder1} >
        < Image style={style.imgmodel} source={{ uri: currentComic.img }} />
    </View>
    <View style={style.item1} >
        <View  >
            <Text style={style.h1}>{`Name: ${currentComic.name}`}</Text>
            <Text style={style.h2}>{`Author: ${currentComic.author}`}</Text>
            <Text style={style.h2}>{`Category: ${currentComic.category}`}</Text>
            <Text style={style.h2}>{`Chapters: ${currentComic.chapters}`}</Text>
            <Text style={style.h2}>{`Content: ${currentComic.content}`}</Text>
            <Text style={style.h2}>{`Active: ${currentComic.active ? 'Full' : 'Not full'}`}</Text>
        </View>

        <TouchableHighlight
            style={style.submit}
            onPress={() => { setShowModalComic(false) }}>
            <Text style={style.submitText}>BACK</Text>
        </TouchableHighlight>
    </View>
</View>
</Modal>
<Modal   visible={showAddComic}  >
<View style={style.viewboder1} >
        < Image style={style.imgmodel} source={{ uri: currentComic.img }} />
    </View>
  <ScrollView>
          <View style={style.h1}>
            <Text style={styles.chu} >Name</Text>
            <TextInput style={styles.inputLabel} value={name} onChangeText={(value) => setName(value)} />
          </View>
          <View style={style.h2}>
            <Text style={styles.chu}>Author</Text>
            <TextInput style={styles.inputLabel} value={author} onChangeText={(value) => setAuthor(value)} />
          </View  >
     
          <View style={style.h2}>
            <Text style={styles.chu}>Category</Text>
            <TextInput style={styles.inputLabel} value={category} onChangeText={(value) => setCategory(value)} />
          </View>
          <View style={style.h2}>
            <Text style={styles.chu}>Chapters</Text>
            <TextInput style={styles.inputLabel} value={chapters} onChangeText={(value) => setChapters(value)} />
          </View>
          <View style={style.h2}>
            <Text style={styles.chu}>Content</Text>
            <TextInput style={styles.inputLabel} value={content} onChangeText={(value) => setContent(value)} />
          </View >
          <View style={styles.chu} >
            <Text>Active</Text>
           
            <Switch value={status} onValueChange={() => setStatus(!status)} />
          </View>
          
        <TouchableHighlight
            style={style.submit}
            onPress={() => {handleSubmit()}}>
            <Text style={style.submitText}>Submit</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={style.submit}
            onPress={() => {handleUpdateComic()}}>
            <Text style={style.submitText}>Comic</Text>
        </TouchableHighlight>
        </ScrollView>
          </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: Platform.OS === 'ios' ? 34 : 0
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    textAlign: "center",
    color: "#00bcd4",

  },
  inputLabel: {
    fontSize: 15,
    color: "#00bcd4",
    borderColor: "#00bcd4",
    borderWidth: 1,
    borderRadius: 10,
    margin: 8,
    height: 50,
    paddingLeft: 8

  },

  chu: {
    padding: 10,
    fontSize: 20,
    color: "#00bcd4",
    textAlign: "left"
  },

  bt: {
    color: "#00bcd4"

  }
});
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


      padding:10 ,
      backgroundColor: "#ffff",
      borderRadius: 2,
      borderWidth: 1,
      borderColor: '#00bcd4',
  margin:10

  },
  viewboder1: {

      padding: 10,
      backgroundColor: "#ffff",
      borderRadius: 2,
      borderWidth: 1,
      borderColor: '#00bcd4',
      

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
      marginTop: 5,
      padding: 10,
      backgroundColor: '#00bcd4',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ffff"
  },
  submit1: {
    width:100,
    alignItems:"center",
    overflow: 'hidden',
    marginBottom: 10,
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

      marginTop: 10,
      padding: 10,
 
      width: 175,
      height: 300,
      borderRadius: 1
  }

});
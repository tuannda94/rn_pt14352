import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import Expo from "expo";

class App extends React.Component {
  const content = "FPT POLY";

  const gptb1 = (a, b) => {
    if (a == 0 && b == 0) {
      return "vo so nghiem";
    }

    if (a == 0 && b != 0) {
      return "vo nghiem";
    }

    if (a != 0 && b != 0) {
      return -b / a;
    }

    if (a != 0 && b == 0) {
      return -b / a;
    }
  };

  const valueGpt = gptb1(3, 4); // c1

  return (
    // <View style={myStyle.app}>
    //   <Text style={myStyle.text}>{content}</Text>
    //   <Text>{valueGpt}</Text>
    //   <Text>{gptb1(5, 0)}</Text>
    //   <Text>hello poly pt14352-MOB</Text>
    // </View>
    <ScrollView>
        <Text>123123123</Text>
      <View style={{ flex: 1, alignItems: "center", marginTop: 200 }}>
        <Text
          style={{ color: "red", fontSize: 60 }}
        >{`Truong ten la: ${content}`}</Text>
        <Image source={require("./PH11674.jpg")} />
        <Image
          source={{ uri: "https://iap.poly.edu.vn/logo.png" }}
          style={myStyle.image}
        />
      </View>
    </ScrollView>
  );
}

const myStyle = StyleSheet.create({
  app: {
    backgroundColor: "#ccc",
    fontSize: 30
  },
  text: {
    color: "#fff"
  },
  image: {
    width: 300,
    height: 400
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Expo.registerRootComponent(App);

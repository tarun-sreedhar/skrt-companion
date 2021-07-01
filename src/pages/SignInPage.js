import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import LottieView from 'lottie-react-native';
export var isLoggedIn = false;

const ScreenContainer = ({ children }) => (
  <View style = {styles.container}>{children}</View>
)

export const SignInPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../../assets/goCart.png")} />
        <View>
        <LottieView
        style = {styles.cartAni}
        source = {require("../../assets/41819-shopping-cart-icon")}
        autoPlay = {true}
        loop = {true}
        />
        </View>
        <StatusBar style="auto" />
       
        <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
          />
        </View>
 
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
 
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
 
        <Button title="Login" onPress={() => {navigation.navigate("SKRT"); isLoggedin = true;}}/>
      
      </View>
    </ScreenContainer>
  );
}

export const setLogIn = ({navigation}) => {
  isLoggedIn = !isLoggedIn;
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  
  cartAni: {
    width:300,
    height:300,
  },

  image: {
    width: 200,
    height: 100,
    marginBottom: 0,
    justifyContent:'flex-start'
  },
 
  inputView: {
    backgroundColor: "#ADD8E6",
    borderRadius: 30,
    width: 1000,
    height: 45,
    alignItems: "center",
    marginBottom:10
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    alignItems: "center",
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
    paddingTop:10
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});

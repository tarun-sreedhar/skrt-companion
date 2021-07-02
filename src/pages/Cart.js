import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {SwipeListView} from 'react-native-swipe-list-view';
import InputSpinner from "react-native-input-spinner";


import './BarcodeView.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import firebase from 'firebase/app'

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyA5CjNAoW1M_HohYvAM-ZLaXTzCOQEo06k',
    authDomain: 'skrt-3dda3.firebaseapp.com',
    databaseURL: 'https://skrt-3dda3-default-rtdb.firebaseio.com',
    projectId: 'skrt-3dda3',
    storageBucket: 'skrt-3dda3.appspot.com',
    messagingSenderId: '717588843701',
    appId: 'app-id',
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();


const ScreenContainer = ({ children }) => (
    <View style = {styles.container_2}>{children}</View>
)

export const Cart = ({ navigation }) => {
    const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View style={{flexDirection: "row", paddingLeft: 10}}>
                <View style={{
                    flex: 1,
                    justifyContent: "center"
                }}>
                    <Text style={{fontSize: 20}}>
                        {data.item.text}
                    </Text>
                </View>

                <View style={{flex: 0.9, justifyContent:"center"}}>
                    <InputSpinner
                        min={1}
                        step={1}
                        skin="paper"
                        style={{width: "80%"}}
                        colorMax={"#f04048"}
                        colorMin={"#40c5f4"}
                        editable={false}
                        fontSize={25}
                        value={data.item.quantity}
                    />
                </View>


                <View style={{
                    flex: 0.5,
                    justifyContent: "center"
                }}>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>{"$" + (Math.round(data.item.price * data.item.quantity * 100)/100).toFixed(2)}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );

  const handleCheckout = () => {
      //readCartFromDatabase(global.id_code);
    navigation.navigate("Confirmation");
  }

  const handleReject = () => {
      navigation.navigate("Rejection");
  }

    return (
      <ScreenContainer>
          <View style={
            {
              flex: 10,
              paddingTop: 40
            }
          }>
            <SwipeListView
                data={readCartFromDatabase(global.id_code)}
                renderItem={renderItem}
            />
          </View>

          <View style={{flex: 1, justifyContent: 'flex-start', flexDirection:"row"}}>
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  height: "100%",
                  backgroundColor: '#FF0000',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={handleReject}>
                <Text style={{fontWeight: "bold", color: 'white', fontSize: 25}}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={{
                      flex: 0.5,
                      height: "100%",
                      backgroundColor: '#1cb51c',
                      alignItems: 'center',
                      justifyContent: 'center',
                  }}
                  onPress={handleCheckout}>
                  <Text style={{fontWeight: "bold", color: 'white', fontSize: 25}}>Approve</Text>
              </TouchableOpacity>

          </View>

      </ScreenContainer>
    );
  };

function readCartFromDatabase(userId){
    var retArr = [];
    retArr.push({"barcode": "819039021098",
        "key": "3",
        "price": "49.99",
        "quantity": 1,
        "text": "Tile Mate + Slim (2020) 4-pack (2 Mates, 2 Slims)"});
    var read_cart = database.ref('orders/' + userId + "/cart");
    console.log("in function" + userId);
    read_cart.on("value", (snapshot) => {
        console.log(snapshot.val())
    })
    return retArr;
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  
    container_2: {
      flex: 1,
      backgroundColor: "#fff"
    },
   
    backTextWhite: {
      color: '#FFF',
      fontSize: 20
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 100,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'black',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    }
  });
  
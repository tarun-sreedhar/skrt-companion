import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView, 
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard
} from "react-native";
import CreditCard from 'react-native-credit-card-form-ui';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { useFocusEffect } from '@react-navigation/native';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
  
const ScreenContainer = ({ children }) => (
    <View style = {styles.container}>{children}</View>
  )



  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@card_key', jsonValue)
    } catch (e) {
      // saving error
      console.log("saving error")
    }
  }

  const storeCard = async (index, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@current_card', jsonValue)
      await AsyncStorage.setItem('@current_card_index', index.toString())
    } catch (e) {
      // saving error
      console.log("saving error")
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@card_key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log("error reading")
    }
  }

  const getCardIndex = async () => {
    try {
      const index = await AsyncStorage.getItem('@current_card_index')
      return index != null ? index : null; 
    } catch (e) {
      console.log("error reading")
    }
  }


  

export const Payment = ({ navigation }) => {
  
      var [state, setState] = useState({
      activeIndex:0,
      carouselItems: [
      // {
      //     title:"Item 1",
      //     text: "Text 1",
      //     imgUrl: "https://i.imgur.com/5oUkgLB.png",
      // },
      // {
      //     title:"348592937859236",
      //     text: "Ronaldo Gomez",
      //     imgUrl:"https://i.imgur.com/JWqsQan.png",
          
      // },
      // {
      //     title:"Item 3",
      //     text: "Text 3",
      //     imgUrl:"https://i.imgur.com/deGaUxh.png",
          
      // },
      // {
      //     title:"Item 4",
      //     text: "Text 4",
      //     imgUrl:"https://i.imgur.com/mUVxJha.png",
          
      // },
      // {
      //     title:"Item 5",
      //     text: "Text 5",
      //     imgUrl:"",
          
      // },
    ]
   })
  
  const creditCardRef = React.useRef();

  const handleSubmit = React.useCallback(() => {
    Keyboard.dismiss()
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      var CCnumber = data.number.slice(data.number.length - 4);
      var cardType = ""
      if (data.brand == "visa") {
        cardType = "https://i.imgur.com/deGaUxh.png"
      }
      if (data.brand == "american-express") {
        cardType = "https://i.imgur.com/JWqsQan.png"
      }
      if (data.brand == "mastercard") {
        cardType = "https://i.imgur.com/5oUkgLB.png"
      }
      
      var userData = {
        title: CCnumber,
        text: data.holder,
        imgUrl: cardType,

        brand: data.brand,
        fullNumber: data.number,
        cvv: data.cvv,
        expiration: data.expiration,
        holder: data.holder, 
      }
      var prevState = state.carouselItems;
      prevState.push(userData)
      setState({carouselItems: prevState})
      storeData(state.carouselItems)

      if(state.carouselItems.length == 1) {
        saveSelectedCard(0)
      }
      
    }
  }, []);

  const _renderItem = ({item, index}) => {
    return (
        <View style={styles.chaka}>
          <Image source={{uri: item.imgUrl}} style = {styles.image} />
            <Text style={{fontSize: 30}}>{ item.title }</Text>
            <Text>{item.text}</Text>
        </View>
    );
  }

  const saveSelectedCard = (slideIndex) => {
    console.log(state.carouselItems[slideIndex])
    storeCard(slideIndex, state.carouselItems[slideIndex])
  }
  
  useFocusEffect(
    React.useCallback(() =>  {

      console.log("focused")
      async function updateList(){

        const fetched_carousel_items = await getData();
        const currIndex = await getCardIndex();
        console.log("before snap: saved index ", currIndex, "current Index ", this.carousel.currentIndex)
        setState({carouselItems: fetched_carousel_items})
        setTimeout(() => this.carousel.snapToItem(currIndex, animated=false, fireCallback=false), 250)
        //this.carousel.snapToItem(currIndex, animated=false, fireCallback=true)
        console.log("after snap: saved index ", currIndex, "current Index ", this.carousel.currentIndex)
        Keyboard.dismiss()
      }
      updateList();
    }, [])
  );

    return (
      
      <ScreenContainer>
          <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={20}
              style={styles.container}
              >
              <CreditCard ref={creditCardRef} />
              <Button title="Add Card" onPress={handleSubmit} />
          </KeyboardAvoidingView>
          <View style={{ flex: 1, flexDirection:'column', justifyContent: 'center'}}>
          <Carousel
            layout={"default"} layoutCardOffset={18}
            ref={ref => this.carousel = ref}
            data={state.carouselItems}
            renderItem={_renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={saveSelectedCard}
          />
          </View>
      </ScreenContainer>
      
    );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  chaka: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT/1.36,
    resizeMode: 'contain'
  },
});
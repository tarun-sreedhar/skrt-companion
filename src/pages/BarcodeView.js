import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import LottieView from 'lottie-react-native';

export const BarcodeView = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setTimeout(() => {
            setScanned(false);
          }, 5000)
        global.id_code = data.toString();
        alert(`Order ID ${global.id_code} has been scanned.`);
        navigation.navigate("Cart");
    };
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            
            <View>
            <LottieView
            style={styles.scan}
            source = {require("../../assets/16589-qrcode-scanner.json")}
            autoPlay = {true}
            loop = {true}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scan: {
        alignItems: 'center',
        width:300,
        height:300,
        paddingTop:110,
        paddingLeft:40
      },
    container: {
        flex: 1,
    },
    toptext: {
        alignItems: "center",
        top: 30,

    },
    
});
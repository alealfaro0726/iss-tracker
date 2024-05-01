import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Platform, Image, ImageBackground} from 'react-native';

export default class HomeScreen extends Component{
    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <ImageBackground
                    source={require("../assets/bg.png")}
                    style={styles.backgroundImage}>

                <View style={styles.titleBar}>
                    <Text style={styles.titleText}>ISS Tracker App</Text>
                </View>

                <TouchableOpacity style = {styles.routeCard} onPress={() => {
                    this.props.navigation.navigate("IssLocation")
                }}>
                    <Text style={styles.routeText}>ISS Location</Text>
                    <Text style={{paddingLeft:30,color:'red',fontSize:15}}>Know More ---</Text>
                    <Image source={require("../assets/iss_icon.png")} style ={styles.iconImage} />
                    
                </TouchableOpacity>
                <TouchableOpacity style = {styles.routeCard} onPress={() => {
                    this.props.navigation.navigate("Meteors")
                }}>
                    <Text style={styles.routeText}>
                    <Image source={require("../assets/meteor_icon.png")} style ={styles.iconImage} />
                        Meteors
                    </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: 'blue',
    },

    titleText:{

    },

    droidSafeArea:{
        marginTop: Platform.OS==="android"?StatusBar.currentHeight:0,

    },

    titleBar:{
        flex:0.15,
        justifyContent:'center',
        alignItems:'center'
    },

    routeCard:{
        flex:0.25,
        marginLeft:50,
        marginRight:50,
        marginTop:50,
        borderRadius:30,
        backgroundColor:'white',
    },

    routeText:{
        fontSize:30,
        fontWeight:'bold',
        color:'blue',
        marginTop:'75',
        paddingLeft:30
    },

    backgroundImage:{
        flex:1,
        resizeMode:"cover",

    },

    iconImage:{
        position:'absolute',
        height:200,
        width:200,
        resizeMode:'contain',
        right:20,
        top:-80
    }

})
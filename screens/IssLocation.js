import React, {Component} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Text, View, SafeAreaView, StyleSheet,Platform,  StatusBar, Image, ImageBackground, Alert} from 'react-native';
import axios from 'axios'


export default class IssLocation extends Component{
    constructor(props){
        super(props);

        this.state={
            location:{}
        }
    }

    getIssLocation=()=>{
        axios
        .get("https://api.wheretheiss.at/v1/satellites/25544")
        .then(response=> {
            this.setState({
                location:response.data
            })
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }

    componentDidMount(){
        this.getIssLocation();
    }

    render(){
        if(Object.keys(this.state.location).length === 0){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>Loading...</Text>
                </View>
            )
        } else{
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <ImageBackground source={require("../assets/bg.png")} style={styles.backgroundImage}>
                    <View style={styles.titleBar}>
                        <Text style={styles.titleText}>ISS Location</Text>
                    </View>

                    <View style={styles.mapcontainer}>
                        <MapView style={styles.map} region={{latitude:this.state.location.latitude,
                                        longitude:this.state.location.longitude,
                                        latitudeDelta:100,
                                        longitudeDelta:100,
                        }}>
                            <Marker coordinate={{latitude:this.state.location.latitude,longitude:this.state.location.longitude}}>
                                <Image source={require('../assets/iss_icon.png')} style={{width:50,height:50}}></Image>
                            </Marker>
                            
                        </MapView>
                    </View>
                        <View style={styles.infocontainer}>
                            <Text style={styles.infotext}>Latitude: {this.state.location.latitude}</Text>
                            <Text style={styles.infotext}>Longitude: {this.state.location.longitude}</Text>
                            <Text style={styles.infotext}>Velocity: {this.state.location.velocity}</Text>
                            <Text style={styles.infotext}>Altitude: {this.state.location.altitude}</Text>
                        </View>
                </ImageBackground>
            </View>
        )
        }
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    droidSafeArea:{
        marginTop: Platform.OS==="android"?StatusBar.currentHeight:0,
    },
    backgroundImage:{
        flex:1,
        resizeMode:'cover',
    },
    titleBar:{
        flex:0.15,
        justifyContent:'center',
        alignContent:'center',
    },
    titleText:{
        fontSize:40,
        fontWeight:'bold',
        color:'white',
    },
    mapcontainer:{
        flex:0.7,
    }, 
    map:{
        width:'100%',
        height:'100%',
    },
    infocontainer:{
        flex:0.2,
        backgroundColor:'white',
        padding:10,
        borderRadius:25,
    },
    infotext:{
        fontSize:15,
        color:'black',
    }




})
import React, {Component} from 'react';
import {Text, View, SafeAreaView,StyleSheet,Image, Platform, Dimensions} from 'react-native';
import axios from "axios";
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';
import { ImageBackground } from 'react-native-web';

export default class Meteors extends Component{

    constructor(){
        super();

        this.state = {
            meteors: {},
        }
    }

    getMeteors = () => {
        axios
        .get('https://api.nasa.gov/neo/rest/v1/feed?api_key=lzLtMMaOf584epHSia7iII4To1peF8tv5IBDu0bT')
        .then(response => {
            this.setState({
                meteors: response.data.near_earth_objects
            })
        })
        .catch(error => {
            alert(error.message)
        })
    }

    componentDidMount(){
        this.getMeteors()
    }

    keyExtractor = (item, index) => {
        index.toString()
    }
    renderItem = ({item}) => {
        let meteor = item
        let bgimage, speed, size
        if(meteor.threatScore <= 30){
            bgimage = require('../assets/meteor_bg1.png')
            speed = require('../assets/meteor_speed3.gif')
            size = 100
        } else if(meteor.threatScore <= 75){
            bgimage = require('../assets/meteor_bg2.png')
            speed = require('../assets/meteor_speed2.gif')
            size = 150
        } else{
            bgimage = require('../assets/meteor_bg3.png')
            speed = require('../assets/meteor_speed1.gif')
            size = 200
        }
        return(
            <View>
                <ImageBackground source={bgimage} style={styles.backgroundImage}>
                    <View style={styles.gifContainer}>
                        <Image source={speed} style={{width:size,height:size,alignSelf:'center'}}/>                        
                    </View>
                    <Text style={[styles.cardTitle, {marginTop:400, marginLeft:50}]}>Meteor: {item.name}</Text>
                    <Text style={[styles.cardText, {marginTop:20, marginLeft:50}]}>Closest To Earth: {item.close_approach_data[0].close_approach_date_full}</Text>
                    <Text style={[styles.cardText, {marginTop:20, marginLeft:50}]}>Minimum Diameter: {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
                    <Text style={[styles.cardText, {marginTop:20, marginLeft:50}]}>Maximum Diameter: {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
                    <Text style={[styles.cardText, {marginTop:20, marginLeft:50}]}>Velocity Diameter: {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
                </ImageBackground>
            </View>
        )
    }

    render(){
        if(Object.keys(this.state.meteors).length === 0){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>Loading...</Text>
                </View>
            )
        } else{
            let meteor_array = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date]
            })
            let meteors = [].concat.apply([], meteor_array)
            meteors.forEach(function(element){
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min  + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers) * 1000000000
            });
            meteors.sort(function(a, b){
                return b.threatScore-a.threatScore
            })
            meteors = meteors.slice(0,5)
            return(
                <View style={{flex:1, backgroundColor: 'black'}}>
                    <SafeAreaView style={styles.droidSafeArea} />   
                    <FlatList 
                        data = {meteors}
                        renderItem = {this.renderItem}
                        keyExtractor = {this.keyExtractor}
                        horizontal = {true}
                    ></FlatList>
                    
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    droidSafeArea:{
        marginTop: Platform.OS === "android"?StatusBar.currentHeight:0,
    },
    backgroundImage:{
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    cardTitle:{
        fontSize:20,
        marginTop:10,
        fontWeight:'bold',
        color:'white'
    },
    gifContainer:{
        justifyContent:'center',
        flex:1,
        alignItems:'center',
    },
    cardText:{
        fontSize:19,
        marginTop:10,
        color:'yellow'
    }

})
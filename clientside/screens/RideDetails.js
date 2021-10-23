import React, { Component } from 'react';
import {StyleSheet,Text,View, TouchableOpacity, Image, Alert, ImageBackground, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';

export default class RideDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                /*can only get images to work with links, not through assets folder */
                {id:1, title: "James Robins" , rating: "4.20",
                startingLocation:"1 Underhill Street, St Luciaaaaaaa" + "\n", endingLocation:"2 Underhill Street, St Luciaaaaaaaaaaaaaaaaaaaaa  ",
                startingTime:"12:38", endingTime:"14:28", 
                avatar:"https://i.gyazo.com/04338e95abcdeafd86c9d5450dbefcea.png"},
            ]
        };
    }


    Redeem = () => {
        Alert.alert('Success', 'Hi')
        /**/
    }



  render() {
    return (
        
        <View style={styles.container}>
            <BackButton/>
            <View>
                <ImageBackground 
                    style={styles.bImage}
                    source={require('../assets/map.png')}>  
                        <Text style={styles.textTitle}>Ride Details</Text>
                </ImageBackground>
            </View>   
            <Text style={styles.driverText}>Driver</Text>


        
            <FlatList style={styles.list}
                data={this.state.data}
                contentContainerStyle={styles.listContainer}
                numColumns={1}
                horizontal={false}

                keyExtractor= {(item) => {
                    return item.id;
                }}
                /*Padding between rows */
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.verticalSeparator}/>
                    )
                }}

                renderItem={(post) => {
                    const item = post.item;
                    return (
                        <View style={styles.items}>
               
                            <View style={styles.itemHead}>
                                <View>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Image style={styles.starImage} source={require("../assets/star.png")}/>
                                    <Text style={styles.rating}>{item.rating}</Text>
                    
                                    {/*Top line gathers image from assests/local folders. Bottom line from URL */}
                                    {/*<Image style={styles.avatarImage} source={require("../assets/exampleAvatar.png")}/>*/}
                                    <Image style={styles.avatarImage} source={{uri:item.avatar}}/> 

                                </View>
                            </View>
                
                            <View style={styles.itemFooter}>
                                <View style={styles.barContainer}>
                                    <View style={styles.barSection}>
                                        <TouchableOpacity style={styles.barButton} onPress={() => this.Redeem()}>
                                            <Image style={styles.arrow} source={require('../assets/arrow.png')}/>
                                         </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                }}/>


            <FlatList style={styles2.list, styles2.container}
                data={this.state.data}
                contentContainerStyle={styles2.listContainer}
                numColumns={1}
                horizontal={false}

                keyExtractor= {(item) => {
                    return item.id;
                }}
                /*Padding between rows */
                ItemSeparatorComponent={() => {
                    return (
                <View style={styles2.verticalSeparator}/>
                )
                }}

                renderItem={(post) => {
                    const item = post.item;
                    return (
                        <View style={styles2.items}>
               
                            <View style={styles2.itemHead}>
                                <View>
                                    <Image style={styles2.dotArrow} source={require("../assets/dotArrow.png")}/>
                                    <Text style={styles2.startingTimeText}>{item.startingTime}</Text>
                                    <Text style={styles2.endingTimeText}>{item.endingTime}</Text>
                                    <Text style={styles2.title}>{item.startingLocation} </Text>
                                    <Text style={styles2.title}>{item.endingLocation}</Text>
                    
                                </View>
                            </View>
                        </View>
                    )
                }}/>
        </View>    
    );
  }

}

/*Style sheet1, so bottom container of page aka driver details */
const styles = StyleSheet.create({

    container:{
        flex:1,
        marginTop:180,
    },

    /* padding between card and edge of screen */
    list: {
        paddingHorizontal: 6,
        backgroundColor:"#f3f2f2",
    },
    listContainer:{
        alignItems:'center',
    },

    /****** item box design**********/
    items:{
        /*padding between boxes */
        marginVertical: 1,
        backgroundColor:"white",
        flexBasis: '48%',
        marginHorizontal: 5,
        borderRadius:20
    },
    itemHead: {
        paddingVertical: 50,
        paddingHorizontal: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    itemFoot:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 1,
        paddingBottom: 15,
        paddingHorizontal: 19,
    },
  
    /* Individual item elements */
    title:{
        fontSize:20,
        flex:5,
        fontWeight:'bold',
        position:'relative',left:20
    },

    //driver rating number
    rating:{
        fontWeight:'bold',
        fontSize:14,
        position:'relative', left:44, top: 10,
    },
    //arrow image button
    arrow: {
        width:40,
        height:30,
        //position:'relative',top:-50,
    },

    /* bottom elements */
    barContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
        flex: 2
    },
    barSection: {
        justifyContent: 'flex-end',
        position:'absolute',bottom:58,
        flexDirection: 'row',
        flex: 6,
    },
    //map image
    bImage: {
        width: 400, 
        height: 350, 
        resizeMode: 'contain',
        justifyContent:'center',
        position:'relative',bottom:120,
    },

    textTitle:{
        color: "black",
        fontSize: 35,
        lineHeight:100,
        fontWeight: "bold",
        textAlign:'center',
        marginTop:-400,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 3
    },

    starImage:{
        width: 22,
        height: 22,
        position:'absolute', left: 17, top:35
        },

    avatarImage:{
        width: 90,
        height: 90,
        position:'absolute', left: -93, top:-20,
        borderRadius:30,
    },

    driverText:{
        color: "black",
        fontSize: 22,
        position:'absolute', top:310,left:35,
        fontWeight:'bold',
    },

});


/********************style 2********************************* */
const styles2 = StyleSheet.create({
    container:{
        flex:1,
        marginTop:50,
        position:'absolute',
    },
    
    /****** item box design**********/
    items:{
      /*padding between boxes */
        marginVertical: 1,
        backgroundColor:"white",
        flexBasis: '48%',
        marginHorizontal:5,
        borderRadius:90,
        borderBottomEndRadius:120
    },
    itemHead: {
        paddingVertical: -10,
        paddingHorizontal: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    /* Individual item elements */
    title:{
        fontSize:16,
        flex:5,
        position:'relative',left:50, top:-80,
    },
    //time text on left of container
    startingTimeText:{
        fontWeight:'bold',
        fontSize:14,
        position:'relative', left:-50, bottom: 30,
    },
    endingTimeText:{
        fontWeight:'bold',
        fontSize:14,
        position:'relative', left:-50, bottom: -20,
    },

    //arrow and dot image
    dotArrow:{
        
        position:'relative', left: 10, top:60
        },

});

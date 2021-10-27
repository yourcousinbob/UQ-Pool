import React, { Component } from 'react';
import {StyleSheet,Text,View, Image,ImageBackground, FlatList} from 'react-native';
import BackButton from '../components/BackButton';

/**
 * App's Ride History Page
 */
export default class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id:1,
                startingLocation:"1 Underhill Street, St Lucia" + "\n", 
                endingLocation:"2 Underhill Street, St Lucia",
                startingTime:"12:38", endingTime:"14:28", date:"07/10/2021", cancelled:true},
                {id:2,
                startingLocation:"3 Underhill Street, St Lucia" + "\n", 
                endingLocation:"4 Underhill Street, St Lucia",
                startingTime:"14:38", endingTime:"16:28", date:"08/10/2021", cancelled: false},
            ]
        };
    }



    render() {
        return (
            <View style={styles.container}>
                <BackButton/>
                <View style={styles.container2}>
                    <ImageBackground 
                        style={styles.bImage}
                        source={require('../assets/historyBack.png')}>  
                            <Text style={styles.textTitle}>Ride History</Text>
                    </ImageBackground>
                </View>   

                <FlatList style={styles2.list, styles.container3}
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
                                        <Image style={styles2.linebreakImg} source={require("../assets/linebreak.png")}/>
                                        {item.cancelled == true ? <Text style={styles2.cancelledText}>Cancelled</Text>:null}
                                        <Text style={styles2.dateText}>{item.date}</Text>
                                        <Text style={styles2.cancelledText}>{item.cancelled}</Text>
                                        <Image style={styles2.dotArrow} source={require("../assets/dotArrow.png")}/>
                                        <Text style={styles2.startingTimeText}>{item.startingTime}</Text>
                                        <Text style={styles2.endingTimeText}>{item.endingTime}</Text>
                                        <Text style={styles2.startLocationText}>{item.startingLocation} </Text>
                                        <Text style={styles2.endLocationText}>{item.endingLocation}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>    
        );
    }
}

/*Style sheet 1 */
//background styling
const styles = StyleSheet.create({
    //used to square back button
    container:{
        flex:1,
        marginTop:3,
    },
    //bIMG and title
    container2:{
        flex:1,
        marginTop:250,
    },

    //ride history details
    container3:{
        flex:1,
        marginTop:-620,
    },

    //map image
    bImage: {
        width: 290, 
        height: 160, 
        resizeMode: 'contain',
        justifyContent:'center',
        position:'relative',bottom:180,left:40
    },

    textTitle:{
        color: "black",
        fontSize: 35,
        lineHeight:100,
        fontWeight: "bold",
        textAlign:'center',
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 3,
        position:'absolute', top:-10, left: 60
    },

});


/***************style 2***************/
//container styling
const styles2 = StyleSheet.create({
    container:{
        flex:1,
        marginTop:-40,
        position:'absolute',
    },
    
    /****** item box design**********/
    items:{
        /*padding between boxes */
        marginVertical:15,
        backgroundColor:"white",
        flexBasis: '48%',
        marginHorizontal:5,
        borderRadius:100,
        borderBottomEndRadius:100,
        marginBottom:10
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
        fontWeight:'100',
        color:'grey',
        fontSize:14,
        position:'relative', left:-35, bottom: 20,
    },
    endingTimeText:{
        fontWeight:'100',
        color:'grey',
        fontSize:14,
        position:'relative', left:-35, bottom: -35,
    },

    //arrow and dot image
    dotArrow:{
        
        position:'relative', left: 10, top:70
        },

    startLocationText:{
        position:'relative', left: 50, top:-65
    },
    
    endLocationText:{
        position:'relative', left: 50, top:-45
    },

    dateText:{
        position:'absolute', top:25, left:-20,
        fontWeight:'bold',
    },

    //text only shows if ride is cancelled=true
    cancelledText:{
        color:'red',
        fontWeight:'bold',
        position:'absolute', top:21, left:160,
        fontSize:17,
    },

    //line break between date and other elements
    linebreakImg:{
        width:350,
        height:10,
        position:'absolute', top:42, left:-60
    },

});

import React, { Component } from 'react';
import {StyleSheet,Text,View, TouchableOpacity, Image, Alert, ImageBackground, FlatList} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';


export default class Help extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        /*can only get images to work with links, not through assets folder */
        {id:1, title: "Trip started without me"},
        {id:2, title: "Driver took a bad route "} ,
        {id:3, title: "Trip ended incorrectly   "}, 
        {id:4, title: "View more....                  "}, 
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
         <View>
                <ImageBackground 
                    style={styles.bImage}
                    source={require('../assets/helpBackground.png')}>  
                        <Text style={styles.textTitle}>Get Help</Text>
                </ImageBackground>
        </View>   
        
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
                    
                  </View>
                </View>
                
                <View style={styles.itemFooter}>
                  <View style={styles.barContainer}>
                    <View style={styles.barSection}>
                      <TouchableOpacity style={styles.barButton} onPress={() => this.Redeem()}>
                        <Image style={styles.shoppingIcon} source={require('../assets/arrow.png')}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          }}/>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:300,
  },
  /* padding between card and edge of screen */
  list: {
    paddingHorizontal: 6,
    backgroundColor:"#f3f2f2",
  },
  listContainer:{
    alignItems:'center'
  },
  
  /****** item box design**********/
  items:{
    /*padding between boxes */
    marginVertical: 1,
    backgroundColor:"white",
    flexBasis: '48%',
    marginHorizontal: 5,
  },
  itemHead: {
    paddingVertical: 12,
    paddingHorizontal: 60,
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
    fontSize:18,
    flex:5,
  },
  shoppingIcon: {
    width:30,
    height:24,
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
    position:'absolute',bottom:10,
    flexDirection: 'row',
    flex: 6,
  },
  
   bImage: {
    width: 400, 
    height: 100, 
    resizeMode: 'contain',
    justifyContent:'center',
    position:'absolute',bottom:80,
    
},

textTitle:{
    color: "black",
    fontSize: 55,
    lineHeight:100,
    fontWeight: "bold",
    textAlign:'center',
    marginTop:-100
},

});  
 
import React, { Component } from 'react';
import {StyleSheet,Text,View, TouchableOpacity, Image, Alert, ImageBackground, FlatList} from 'react-native';
import SampleButton from '../components/Samples/SampleButton';
import { SafeAreaView } from 'react-native-safe-area-context';


export default class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        /*can only get images to work with links, not through assets folder */
        {id:1, title: "Member Since         ", Text:"2019"},
        {id:2, title: "UQ Degree               ", Text:"Bachelor of Finance"} ,
        {id:3, title: "Distance Travelled ", Text:"6943434343" + " km"}, 
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
                    source={require('../assets/riderBack.png')}>  
                        <Text style={styles.nameTitle}>Name Here</Text>
                </ImageBackground>

      
              <TouchableOpacity style={styles.phoneButton} onPress={()=>{alert("you clicked me")}}>
                <Image source={require("../assets/phone.png")}/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.dotsButton} onPress={()=>{alert("you clicked me")}}>
                <Image source={require("../assets/dots.png")}/>
              </TouchableOpacity>

              
              <Image style={styles.starImage} source={require("../assets/star.png")}/>
              <Text style={styles.ratingText} >4.20</Text> 
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
                    <Text style={styles.itemBody}>{item.Text}</Text>
                  </View>
                </View>
                
                <View style={styles.itemFooter}>
                  <View style={styles.barContainer}>
                    <View style={styles.barSection}>
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
    marginTop:350,
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
    paddingVertical: 10,
    paddingHorizontal: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  /*The text under container titles */
  itemBody:{
    fontSize:14,
    flex:5,
    fontStyle: 'italic',
  },
  
 
  /* Container title */
  title:{
    fontSize:18,
    flex:5,
  },
  
  /* bottom elements */
  barContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    flex: 2
  },

   bImage: {
    width: 300, 
    height: 160, 
    resizeMode: 'contain',
    justifyContent:'center',
    position:'absolute',bottom:190,left:50,
    
},

/*Name style */
nameTitle:{
    color: "black",
    fontSize: 40,
    lineHeight:100,
    fontWeight: "bold",
    textAlign:'center',
    marginTop:280
},

/* uncommented as not needed anymore
helpButton:{
    backgroundColor: "purple",
        borderRadius: 5, 
        height: 50,
        width: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative',left:150, bottom:60,
}, */

phoneButton:{
  width: 40,
  height: 40,
  position:'absolute', left: 280, top:-80
},

dotsButton:{
  width: 40,
  height: 40,
  position:'absolute', left: 90, top:-80
},

starImage:{
  width: 22,
  height: 22,
  position:'absolute', left: 165, top:-100
},

ratingText:{
  fontWeight:'bold',
  position:'absolute', left:190, top:-97

}


});  
 
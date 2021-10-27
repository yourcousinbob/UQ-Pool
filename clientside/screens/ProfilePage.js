import React from 'react';
import {StyleSheet,Text,View, TouchableOpacity, Image, Alert, ImageBackground, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { selectFirst, selectLast } from '../slices/userSlice';
import BackButton from '../components/BackButton';

/**
 * App's Profile Page
 */
export default function ProfilePage() {
    const data = [
        {id:1, title: "Member Since         ", Text:"2021"},
        {id:2, title: "UQ Degree               ", Text:"Bachelor of Science"} ,
        {id:3, title: "Distance Travelled ", Text:"6943434343" + " km"}, 
    ];
  const name = useSelector(selectFirst) + " " + useSelector(selectLast);
  
  return (
      <SafeAreaView style={styles.container}>
          <BackButton/>
          <View style={styles.container2}>
              <ImageBackground 
                  style={styles.bImage}
                  source={require('../assets/riderBack.png')}>  
                      <Text style={styles.nameTitle}>{name}</Text>
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

          <FlatList style={styles.list, styles.container3}
              data={data}
              contentContainerStyle={styles.listContainer}
              numColumns={1}
              horizontal={false}

              keyExtractor= {(item) => {
              return item.id;
              }}
            /*Seperator */
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
        </SafeAreaView>
  );
}

//stylesheet
const styles = StyleSheet.create({
  //had to change margin to 0 to accommodate backButton
  container:{
    flex:1,
    marginTop:0,
    position:'relative', top:1
  },

  //bIMG, and other assets
  container2:{
    flex:1,
    position:'absolute', top:400
  },

  //lists container
  container3:{
    flex:1,
    position:'relative', top:250, left:45
  },
  /* padding between card and edge of screen */
  list: {
    paddingHorizontal: 6,
    backgroundColor:"#f3f2f2",
  },
  listContainer:{
    alignItems:'center',
    position:'absolute',top:100
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
    flex:1
    
},

/*Name style */
nameTitle:{
    color: "black",
    fontSize: 40,
    lineHeight:100,
    fontWeight: "bold",
    textAlign:'center',
    marginTop:280,
},

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

},

backContainer:{
    position: "absolute",
		top: -270,
		left: 0,
		zIndex: 9999,
},

back:{
    width: 40,
		height: 40,
		borderRadius: 50 / 2,
		margin: 20,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		shadowOffset: { height: 3 },
		shadowOpacity: 0.4,
		shadowRadius: 8,
		shadowColor: "gray",
		elevation: 5,
},


});  
 
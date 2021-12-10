/**
 * This is a example of a typical screen in react native. To view this page, 
 * you can do a few things. 
 * 
 * 1) Move the StackScreen for this page as the first one within App.js
 * 2) Render a SampleButton component on the homescreen and link it to this page
 * 
 * Components can be added onto this page, along with other 
 * text, images, or whatever..
 */

import React from 'react'
import { StyleSheet, View, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import SampleButton from '../components/Samples/SampleButton';

 
const SampleScreen = () => {     
    return (
        /* SafeAreaView prevents content from going into the notch of a phone*/
        <SafeAreaView> 
            {/* Pages are usually contained in a view */}
            <View>  
                {/* I've add an image here */}
                <Image 
                    style={styles.image}
                    source={
                        require('../assets/logo.png')
                    }
                />
                {/* Here I have imported a sample component */}
                <SampleButton/>
            </View>
        </SafeAreaView>
    )
}

export default SampleScreen 
// You need this so you can use SampleScreen in other files

// Apply styles to your components, similiar to CSS 
const styles = StyleSheet.create({
    image: {
        width: 200, 
        height: 100, 
        resizeMode: 'contain'
    },
})


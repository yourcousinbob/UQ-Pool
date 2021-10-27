import React from "react";
import { View, Text, StyleSheet } from "react-native"
import { Rating } from "react-native-ratings"
import { useNavigation } from "@react-navigation/core"
import { selectDriver } from "../slices/sessionSlice";
import { useSelector } from "react-redux";


/* The screen that displays after a trip has ended*/
const RateTripScreen = () => {
    const navigation = useNavigation();
    const driver = useSelector(selectDriver);

    async function ratingCompleted(rating, driver) {
        const postRating = await fetch('https://uqpool.xyz:7777/rate', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sid: 1234567,
                //driver.driver_id,
                rating: 4
            })
        })
        //console.log("User" + sid + "rated driver" + driver.driver_id + " a " + rating)
        navigation.navigate("Root", {screen:"Home"})
    }

    return (
        <View >
			<Text style={styles.rating_text}>How was your trip?</Text>
            <Rating
                showRating
                onFinishRating={() => ratingCompleted(driver) }
                style={styles.rating}
            />
        </View>
    );
}
export default RateTripScreen;

const styles = StyleSheet.create({

    container:{

    },

	rating_text:{
        textAlign: 'center',
        paddingTop:"20%"
    },

    rating:{
        paddingTop:"50%",
    }
})

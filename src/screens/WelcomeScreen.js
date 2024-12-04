import { StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar'

export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
 <View style={styles.mainContainer}>
      <Image 
      source ={require('../../assets/images/welcome.png')}
      style={{
        position:'absolute',
        width:'100%',
        height:'100%'
      }}
      resizeMode='cover'
      />
     <StatusBar style="light" />
   <View style={styles.logoContainer}>
      <View style={styles.box}>
        <Text style={styles.text}>MT</Text>
      </View>
   </View>
   <Text style={styles.subtext}>
          Movie Tonight?
        </Text>

        <Text style={styles.smallText}>
      Watch and find movies that bring your mood back.
    </Text>
    <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HomeTab")}
        >
          <Text style={styles.buttonText}>Explore</Text>
        </TouchableOpacity>

</View>
  
  )
}
const styles = StyleSheet.create({
    mainContainer:{  flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    box: {
      backgroundColor: 'red',
      padding: 20,
      borderRadius: 24,
    
    },
    text: {
      color: 'white',
      fontSize: 32,
      fontWeight: '800',
      letterSpacing: 2,
      marginVertical: 16,
    },
    subtext:{
     color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginVertical: 16, 
    },
    
    smallText:{
    color: 'white',
    letterSpacing: 1.5,
    marginBottom: 80,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    width:'80%',
    
    },
    button:{
        paddingHorizontal: 48,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'red',
    marginBottom:50
    },
    buttonText:{
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    }
  });


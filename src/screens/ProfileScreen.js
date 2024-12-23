import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  SafeAreaView,
  Share
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { image500 } from "../../utils/moviesApi";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as Localization from 'expo-localization'; 

const { width, height } = Dimensions.get("window");

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [savedMovies, setSavedMovies] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [region, setRegion] = useState(null); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedMovies = await AsyncStorage.getItem("savedMovies");
        const moviesArray = storedMovies ? JSON.parse(storedMovies) : [];
        setSavedMovies(moviesArray);

        const storedImage = await AsyncStorage.getItem("profileImage");
        if (storedImage) {
          setProfileImage(storedImage);
        }

      
        const userRegion = Localization.region;
        setRegion(userRegion); 
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    loadData();
  }, []);

  const handleImagePicker = async () => {
  
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus === "granted" && galleryStatus === "granted") {
      Alert.alert(
        "Profile Picture",
        "Choose an option",
        [
          {
            text: "Take Photo",
            onPress: async () => {
              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
              });
              if (!result.canceled) {
                const imageUri = result.assets[0].uri;
                setProfileImage(imageUri);
                await AsyncStorage.setItem("profileImage", imageUri); // Store image URI
              }
            },
          },
          {
            text: "Upload from Gallery",
            onPress: async () => {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
              });
              if (!result.canceled) {
                const imageUri = result.assets[0].uri;
                setProfileImage(imageUri);
                await AsyncStorage.setItem("profileImage", imageUri); 
              }
            },
          },
          { text: "Cancel", style: "cancel" },
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert(
        "Permission Denied",
        "You need to grant permissions to access the camera and gallery."
      );
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Hey! Check out this amazing app. Use my referral link to sign up and get 2 months of free subscription! \n\n Referral Link: https://yourapp.com/signup?referralCode=123456`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Failed to share referral link:", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={handleImagePicker}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : {
                    uri: "https://www.w3schools.com/w3images/avatar2.png", 
                  }
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>Mohammed Javeed</Text>
        <Text style={styles.userEmail}>javeed@gmail.com</Text>
        {/* <TouchableOpacity onPress={() => console.log("Edit Profile")} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity> */}
      </SafeAreaView>

      <View style={styles.regionSection}>
        <Text style={styles.sectionTitle}>Region Check</Text>
        {region ? (
          <Text style={styles.regionText}>
            You are currently in {region}.
          </Text>
        ) : (
          <Text style={styles.regionText}>Unable to detect your region.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Movies</Text>
        {savedMovies.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {savedMovies.map((movie, index) => (
              <TouchableOpacity
                key={index}
                style={styles.movieContainer}
                onPress={() => navigation.push("Movie", movie)}
              >
                <Image
                  source={{
                    uri: image500(movie.poster_path),
                  }}
                  style={styles.movieImage}
                />
                <Text style={styles.movieTitle}>
                  {movie.title.length > 15
                    ? movie.title.slice(0, 15) + "..."
                    : movie.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noMoviesText}>No saved movies yet.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Refer & Earn</Text>
        <Text style={styles.referText}>
          Invite your friends to try the app and earn 2 months of free
          subscription for every successful referral!
        </Text>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Refer Now</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Welcome")}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#121212",
    alignItems: "center",
    height: Dimensions.get("window").height,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  userEmail: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#1E40AF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  regionSection: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  regionText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
  },
  section: {
    width: "100%",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  movieContainer: {
    marginRight: 10,
    alignItems: "center",
  },
  movieImage: {
    width: width * 0.3,
    height: width * 0.45,
    borderRadius: 10,
    marginBottom: 5,
  },
  movieTitle: {
    color: "gray",
    fontSize: 14,
    textAlign: "center",
  },
  noMoviesText: {
    color: "gray",
    textAlign: "center",
    fontSize: 16,
  },
  referText: {
    color: "gray",
    fontSize: 16,
    marginBottom: 10,
  },
  shareButton: {
    backgroundColor: "#1E40AF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  shareButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

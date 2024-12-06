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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { image500 } from "../../utils/moviesApi";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [savedMovies, setSavedMovies] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  // Load saved movies and profile image from AsyncStorage
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
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    loadData();
  }, []);

  const handleImagePicker = async () => {
    // Request permissions for camera and gallery
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
                await AsyncStorage.setItem("profileImage", imageUri); // Store image URI
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
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>johndoe@gmail.com</Text>
        <TouchableOpacity onPress={() => console.log("Edit Profile")} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </SafeAreaView>

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
    fontSize: 16,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#E11D48",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

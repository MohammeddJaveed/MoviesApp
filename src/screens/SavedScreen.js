import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { image500 } from "../../utils/moviesApi";

const { width, height } = Dimensions.get("window");

export default function SavedScreen() {
  const navigation = useNavigation();
  const [savedMovies, setSavedMovies] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // Load saved movies from AsyncStorage when the screen gains focus
      const loadSavedMovies = async () => {
        try {
          const savedMovies = await AsyncStorage.getItem("savedMovies");
          const savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];
          setSavedMovies(savedMoviesArray);
          console.log("Pull saved movie from AsyncStorage");
        } catch (error) {
          console.log(error);
        }
      };
      loadSavedMovies();
    }, [navigation])
  );

  const clearSavedMovies = async () => {
    try {
      await AsyncStorage.removeItem("savedMovies");
      setSavedMovies([]);
      console.log("Clear all saved movies");
    } catch (error) {
      console.log("Error clearing saved movies", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/homescreen.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Saved Movies</Text>
              <TouchableOpacity
                onPress={clearSavedMovies}
                style={styles.clearButton}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.moviesGrid}>
            {savedMovies.length > 0 ? (
  savedMovies.map((movie, index) => (
    <View style={styles.movieItemContainer} key={index}>
      <TouchableOpacity onPress={() => navigation.push("Movie", movie)}>
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
    </View>
  ))
) : (
  <View style={styles.noMoviesContainer}>
    <Text style={styles.noMoviesText}>No saved movies</Text>
  </View>
)}

            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  backgroundImage: {
    flex: 1,
    width: Dimensions.get('window').width,
    height:Dimensions.get('window').height
   
  },
  headerContainer: {
    marginTop: 48,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  clearButton: {
    backgroundColor: "#1E40AF", // Blue-800
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  clearButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  moviesGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 16,
  },
  movieItemContainer: {
    marginTop: 16,
  },
  movieImage: {
    width: width * 0.41,
    height: height * 0.25,
    borderRadius: 24,
  },
  movieTitle: {
    color: "#D1D5DB", // Gray-300
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 4,
    marginTop: 4,
  },
  noMoviesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 300,
  },
  noMoviesText: {
    color: "#D1D5DB", // Gray-300
    fontSize: 18,
    fontWeight: "bold",
  },
});

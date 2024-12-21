import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Vibration
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../../utils/moviesApi";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
// import Loading from "../components/Loading";
import Cast from "../component/Cast";
import PopularMovie from "../component/PopularMovie";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFavorite, toggleFavourite] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    setLoading(false);
    if (data) {
      setMovie({ ...movie, ...data });
    }
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data) {
      setCast(data.cast);
    }
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  };


  const formatPopularity = (popularity) => {
    const percentage = (popularity / 1000)*17;
    return `${Math.round(percentage)} %`;
  };

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if (hours === 0) {
      return `${minutes}min`;
    } else if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}mins`;
    }
  };

  const toggleFavouriteAndSave = async () => {
    try {
      const savedMovies = await AsyncStorage.getItem("savedMovies");
      let savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];
  
      const isMovieSaved = savedMoviesArray.some(
        (savedMovie) => savedMovie.id === item.id
      );
  
      if (!isMovieSaved) {
        savedMoviesArray.push(movie);
        await AsyncStorage.setItem(
          "savedMovies",
          JSON.stringify(savedMoviesArray)
        );
        toggleFavourite(true);
        Vibration.vibrate(100); // Vibrate for 100ms when saved
      } else {
        const updatedSavedMoviesArray = savedMoviesArray.filter(
          (savedMovie) => savedMovie.id !== item.id
        );
        await AsyncStorage.setItem(
          "savedMovies",
          JSON.stringify(updatedSavedMoviesArray)
        );
        toggleFavourite(false);
        Vibration.vibrate(50); // Vibrate for 50ms when removed
      }
    } catch (error) {
      console.log("Error Saving Movie", error);
    }
  };
  

  useEffect(() => {
    const loadSavedMovies = async () => {
      try {
        const savedMovies = await AsyncStorage.getItem("savedMovies");
        const savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];

        const isMovieSaved = savedMoviesArray.some(
          (savedMovie) => savedMovie.id === item.id
        );

        toggleFavourite(isMovieSaved);
      } catch (error) {
        console.log("Error Loading Saved Movies", error);
      }
    };

    loadSavedMovies();
  }, [item.id]);

  return (
    <ScrollView Style={styles.container}>
      {/* Back Button and Movie Poster */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
          <ChevronLeftIcon size={30} strokeWidth={2} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavouriteAndSave} style={styles.iconContainer}>
          <HeartIcon size={30} strokeWidth={2} color={isFavorite ? "red" : "white"} />
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri:
            image500(movie.poster_path) ||
            "https://th.bing.com/th/id/R.4dc29c271625202308a26ed96d1d962d?rik=qKnKhs7roVDpXA&pid=ImgRaw&r=0",
        }}
        style={styles.movieImage}
      />

      <View style={styles.detailsContainer}>
        <Image
          source={require("../../assets/images/homescreen1.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View>
          <Text style={styles.movieTitle}>{movie?.title}</Text>
          <View style={styles.genresContainer}>
            {movie?.genres?.map((genre, index) => (
              <Text key={index} style={styles.genreText}>
                {genre.name} {index + 1 !== movie.genres.length ? "• " : ""}
              </Text>
            ))}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              {formatPopularity(movie.popularity)} * {formatRuntime(movie.runtime)}{" "}
              {movie.release_date?.split("-")[0] || "N/A"}
            </Text>
          </View>
          <Text style={styles.overviewText}>{movie.overview}</Text>
        </View>
        {movie?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast} />}
        {movie?.id && similarMovies.length > 0 && (
          <PopularMovie title="Similar Movies" data={similarMovies} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    
  
  },
  backButtonContainer: {
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 48,
    position: "absolute",
  },
  iconContainer: {
    backgroundColor: "#2496ff",
    padding: 8,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  movieImage: {
    width: width,
    height: height * 0.55,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 16,
    marginTop: -98,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // overflow: "hidden",
    position: "relative",
  },
  backgroundImage: {
    width: width,
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
  },
  movieTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    letterSpacing: 2,
    paddingLeft:20
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft:20
  },
  genreText: {
    color: "#B0B0B0",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
    marginRight: 8,
  },
  infoContainer: {
    backgroundColor: "#2496ff",
    padding: 8,
    borderRadius: 10,
    width: "75%",
    marginBottom: 8,
    marginLeft:20
    // paddingLeft:20
  },
  infoText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "left",
  },
  overviewText: {
    color: "#B0B0B0",
    fontSize: 14,
    letterSpacing: 1,
    lineHeight: 22,
    paddingHorizontal:20
  },
});

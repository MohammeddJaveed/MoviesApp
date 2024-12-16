import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import TrendingMovies from "../component/TrendingMovies";
import PopularMovie from "../component/PopularMovie";
import TopRatedMovies from "../component/TopRatedMovies";
import UpcomingMovie from "../component/UpcomingMovie";

import { movieApiKey } from "../../utils/apiKey";

export default function HomeScreen() {
  const navigation = useNavigation();

  const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${movieApiKey}`;
  const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${movieApiKey}`;
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}`;
  const upcomingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${movieApiKey}`;

  // State for profile image
  const [profileImage, setProfileImage] = useState(null);

  // Fetch profile image from AsyncStorage
  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem("profileImage");
        if (storedImage) {
          setProfileImage(storedImage);
        }
      } catch (error) {
        console.error("Failed to load profile image:", error);
      }
    };

    loadProfileImage();
  }, []);

  // State management for movies
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isTrendingLoading, setTrendingLoading] = useState(false);
  const [trendingError, setTrendingError] = useState("");

  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [isTopRatedLoading, setTopRatedLoading] = useState(false);
  const [topRatedError, setTopRatedError] = useState("");

  const [popularMovies, setPopularMovies] = useState([]);
  const [isPopularLoading, setPopularLoading] = useState(false);
  const [popularError, setPopularError] = useState("");

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isUpcomingLoading, setUpcomingLoading] = useState(false);
  const [upcomingError, setUpcomingError] = useState("");

  // Function to fetch movies
  const fetchMovies = async (url, setData, setLoading, setError, errorMessage) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data.results || []);
    } catch (err) {
      console.error(`Error fetching movies from ${url}:`, err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(
      trendingMoviesUrl,
      setTrendingMovies,
      setTrendingLoading,
      setTrendingError,
      "Failed to fetch trending movies."
    );
  }, []);

  useEffect(() => {
    fetchMovies(
      topRatedMoviesUrl,
      setTopRatedMovies,
      setTopRatedLoading,
      setTopRatedError,
      "Failed to fetch top-rated movies."
    );
  }, []);

  useEffect(() => {
    fetchMovies(
      popularMoviesUrl,
      setPopularMovies,
      setPopularLoading,
      setPopularError,
      "Failed to fetch popular movies."
    );
  }, []);

  useEffect(() => {
    fetchMovies(
      upcomingMoviesUrl,
      setUpcomingMovies,
      setUpcomingLoading,
      setUpcomingError,
      "Failed to fetch upcoming movies."
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../../assets/images/homescreen1.png")}
        style={{
          position: "absolute",
          width: "100%",
        }}
        resizeMode="cover"
      />
      <ScrollView>
        <View style={styles.container}>
          {/* Avatar */}
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <View style={styles.avatarContainer}>
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : { uri: "https://www.w3schools.com/w3images/avatar2.png" }
                }
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>

          {/* Notification and Search Icons */}
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <BellIcon size={30} strokeWidth={2} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {isTrendingLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView>
            {/* Trending Movies */}
            {trendingMovies?.length > 0 && <TrendingMovies data={trendingMovies} />}

            {/* Popular Movies */}
            {popularMovies?.length > 0 && <PopularMovie title="Popular" data={popularMovies} />}

            {/* Top Rated Movies */}
            {topRatedMovies?.length > 0 && <TopRatedMovies title="Top Rated" data={topRatedMovies} />}

            {/* Upcoming Movies */}
            {upcomingMovies?.length > 0 && <UpcomingMovie title="Upcoming" data={upcomingMovies} />}
          </ScrollView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 16,
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 100,
    overflow: "hidden",
  },
  avatar: {
    width: 45,
    height: 45,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 16,
  },
});

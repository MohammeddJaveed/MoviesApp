import { View, Text,Image, ScrollView,StyleSheet,TouchableOpacity, SafeAreaView, ActivityIndicator, } from 'react-native'
import React, { useState,useEffect} from 'react'
import { BellIcon, MagnifyingGlassIcon, ScaleIcon } from "react-native-heroicons/outline";
import { useNavigation } from '@react-navigation/native';
import TrendingMovies from '../component/TrendingMovies';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

import { fetchTrendingMovie } from '../../utils/moviesApi';
import { movieApiKey } from '../../utils/apiKey';
import PopularMovie from "../component/PopularMovie"; 
import TopRatedMovies from '../component/TopRatedMovies';

import UpcomingMovie from '../component/UpcomingMovie';



export default function HomeScreen() {
  const navigation = useNavigation();
  const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${movieApiKey}`;
  const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${movieApiKey}`;
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}`;
  const upcomingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${movieApiKey}`;
  
  // State management
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
  
  // Function to fetch data from an API endpoint
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
  
  // Fetch Trending Movies
  useEffect(() => {
    fetchMovies(
      trendingMoviesUrl,
      setTrendingMovies,
      setTrendingLoading,
      setTrendingError,
      "Failed to fetch trending movies."
    );
  }, []);
  
  // Fetch Top Rated Movies
  useEffect(() => {
    fetchMovies(
      topRatedMoviesUrl,
      setTopRatedMovies,
      setTopRatedLoading,
      setTopRatedError,
      "Failed to fetch top-rated movies."
    );
  }, []);
  
  // Fetch Popular Movies
  useEffect(() => {
    fetchMovies(
      popularMoviesUrl,
      setPopularMovies,
      setPopularLoading,
      setPopularError,
      "Failed to fetch popular movies."
    );
  }, []);
  
  // Fetch Upcoming Movies
  useEffect(() => {
    fetchMovies(
      upcomingMoviesUrl,
      setUpcomingMovies,
      setUpcomingLoading,
      setUpcomingError,
      "Failed to fetch upcoming movies."
    );
  }, []);
 console.log('popular data',popularMovies)
  return (
    <SafeAreaView style={{flex:1}}>
         <Image
        source={require("../../assets/images/homescreen1.png")}
        style={{
          position: "absolute",
          width: "100%",
          // height: "100%",
        }}
        resizeMode="cover"
      />
      <ScrollView>
        
      <View style={styles.container}>
      {/* Avatar */}
      <TouchableOpacity onPress={()=> navigation.navigate("Profile")}>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../assets/images/avatar.png")}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>
      </TouchableOpacity>

      {/* Notification and Search Icon */}
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
        <ActivityIndicator size="large" color="#0000ff" /> // Loading indicator
      ) : (
        <ScrollView>
           {/* Trending Movies */}
           {trendingMovies?.length > 0 && <TrendingMovies data={trendingMovies} />}

          

           {/* Popular Movies */}
           {popularMovies?.length > 0 && <PopularMovie title="Popular"  data={popularMovies} />}

           {/* topRated Movies */}
           {topRatedMovies?.length > 0 && <TopRatedMovies title="Top Rated" data={topRatedMovies} />}

           {/* upcoming Movies */}
           {upcomingMovies?.length > 0 && <UpcomingMovie title="Upcoming" data={upcomingMovies} />}
           
          
        </ScrollView>
      )}
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 16,
    // marginTop:30x
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

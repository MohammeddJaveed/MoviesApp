import { View, Text, Dimensions,StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import Carousal from "react-native-snap-carousel";
import MovieCard from '../MovieCard';

var { width,height } = Dimensions.get("window");

export default function TrendingMovies({ data }) {
  console.log("Trending Movies", data);
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text  style={styles.title}>
          Trending Movie
        </Text>
      </View>

      {/* Carousal */}
      <Carousal
        data={data}
        renderItem={({ item }) => (
          
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1} 
        inactiveSlideScale={0.86}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.8}
        slideStyle={styles.carouselSlide}
        

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8, // Converts to "mt-2"
    marginBottom: 16, // Converts to "mb-4"
  },
  headerRow: {
    flexDirection: "row", // Converts to "flex-row"
    justifyContent: "space-between", // Converts to "justify-between"
    marginHorizontal: 16, // Simulates "mx-4"
    marginBottom: 16, // Converts to "mb-4"
  },
  title: {
    color: "white", // Converts to "text-white"
    fontSize: 18, // Converts to "text-lg"
    fontWeight: "bold", // Converts to "font-bold"
  },
  carouselSlide: {
    display: "flex", // Converts to "flex"
    alignItems: "center", // Converts to "align-center"
    
  },
});



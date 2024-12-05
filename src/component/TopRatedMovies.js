import {
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    FlatList,
    StyleSheet,
  } from "react-native";
  import React from "react";
  import { useNavigation } from "@react-navigation/native";
  import { image500 } from "../../utils/moviesApi";
//   import { LinearGradient } from "expo-linear-gradient";
  
  const { width, height } = Dimensions.get("window");
  
  export default function TopRatedMovies({ data, title, genre }) {
    console.log("genre details",data)
    const navigation = useNavigation();
  
    const renderItem = ({ item, index }) => {
        const itemGenre = (genre || []).find((g) => g.id === item.genre_ids[0]);
  
      return (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => navigation.push("Movie", item)}
        >
          <View style={styles.movieContainer}>
            <Image
              source={{
                uri: image500(item.poster_path),
              }}
              style={styles.image}
            />
  
            {/* <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.9)"]}
              style={styles.gradient}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            /> */}
  
            <View style={styles.infoContainer}>
              <Text style={styles.movieTitle}>
                {item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}
              </Text>
  
              <View style={styles.ratingGenreContainer}>
                <Text style={styles.rating}>{item.vote_average} *</Text>
                <Text style={styles.genre}>{itemGenre?.name}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
  
        <FlatList
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      marginVertical: 16, // Equivalent to "my-4"
    },
    header: {
      marginHorizontal: 16, // Equivalent to "mx-4"
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerText: {
      color: "#FFFFFF", // White text
      fontSize: 18, // Large text
      fontWeight: "bold", // Bold text
    },
    flatListContent: {
      paddingHorizontal: 15, // Adds space on the sides of the FlatList
    },
    movieContainer: {
      marginRight: 16, // Equivalent to "mr-4"
      marginBottom: 24, // Equivalent to "mb-6"
      position: "relative",
    },
    image: {
      borderRadius: 24, // Equivalent to "rounded-3xl"
      width: width * 0.63,
      height: height * 0.15,
    },
    // gradient: {
    //   position: "absolute",
    //   bottom: 0,
    //   width: "100%",
    //   height: "100%",
    //   borderBottomLeftRadius: 24,
    //   borderBottomRightRadius: 24,
    // },
    infoContainer: {
      position: "absolute",
      bottom: 12, // Adjusted for better spacing
      left: 12,
    },
    movieTitle: {
      color: "#B3B3B3", // Neutral light gray color
      fontSize: 16, // Adjusted text size for better readability
      fontWeight: "bold",
    },
    ratingGenreContainer: {
      flexDirection: "row",
      marginTop: 4, // Adds some spacing between the title and the details
    },
    rating: {
      color: "#B3B3B3", // Neutral light gray
      fontSize: 14, // Slightly smaller for subtitle
      fontWeight: "500", // Medium font weight
      marginRight: 8, // Spacing between rating and genre
    },
    genre: {
      color: "#B3B3B3", // Neutral light gray
      fontSize: 14,
      fontWeight: "500",
    },
  });
  
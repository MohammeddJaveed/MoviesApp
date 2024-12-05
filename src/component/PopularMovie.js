import {
    View,
    Text,
    TouchableWithoutFeedback,
    FlatList,
    Image,
    Dimensions,
    StyleSheet,
  } from "react-native";
  import React from "react";
  import { useNavigation } from "@react-navigation/native";
  import { image500 } from "../../utils/moviesApi";
  
  const { width, height } = Dimensions.get("window");
  
  export default function PopularMovie({ data,title }) {
    const navigation = useNavigation();
  
    const renderItem = ({ item, index }) => {
      return (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => navigation.push("Movie", item)}
        >
          <View style={styles.movieContainer}>
            <Image
              source={{
                uri:
                  image500(item.poster_path) ||
                  "https://th.bing.com/th/id/R.983b8085251688a15240a6ab11b97c39?rik=MlZlZUcTUEgjyw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fwp1946050.jpg&ehk=s%2fbeqrs6stRqTs%2bO5MOpsePOb%2bQbXA2KyK8HwRy4jCw%3d&risl=&pid=ImgRaw&r=0",
              }}
              style={styles.image}
            />
  
            <Text style={styles.movieTitle}>
              {item.title.length > 12 ? item.title.slice(0, 12) + "..." : item.title}
            </Text>
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
      marginBottom: 16, // Equivalent to "mb-4"
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
      alignItems: "center", // Centers the content horizontally
    },
    image: {
      borderRadius: 24, // Equivalent to "rounded-3xl"
      width: width * 0.3,
      height: height * 0.2,
    },
    movieTitle: {
      color: "#B3B3B3", // Neutral light gray color
      marginTop: 4, // Adds spacing between image and title
      fontSize: 14, // Smaller text for the title
      fontWeight: "bold", // Bold text
      textAlign: "center", // Center align the title under the image
    },
  });
  
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import { XMarkIcon } from "react-native-heroicons/outline";
// import Loading from "../components/Loading";
import { image500, searchMovies } from "../../utils/moviesApi";

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = (search) => {
    if (search && search.length > 2) {
      setLoading(true);
      searchMovies({
        query: search,
        include_adult: false,
        language: "en-US",
        page: "1",
      }).then((data) => {
        console.log("We got our search results");
        setLoading(false);
        if (data && data.results) {
          setResults(data.results);
        }
      });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/homescreen2.png")}
        style={styles.backgroundImage}
      />

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for your Favorite movies"
          placeholderTextColor={"gray"}
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsContainer}
        >
          <Text style={styles.resultsCount}>
            {results.length} Results
          </Text>

          <View style={styles.resultsGrid}>
            {results.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View style={styles.resultItem}>
                  <Image
                    source={{
                      uri:
                        image500(item.poster_path) ||
                        "https://th.bing.com/th/id/R.983b8085251688a15240a6ab11b97c39?rik=MlZlZUcTUEgjyw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fwp1946050.jpg&ehk=s%2fbeqrs6stRqTs%2bO5MOpsePOb%2bQbXA2KyK8HwRy4jCw%3d&risl=&pid=ImgRaw&r=0",
                    }}
                    style={styles.resultImage}
                  />
                  <Text style={styles.resultTitle}>
                    {item.title.length > 19
                      ? item.title.slice(0, 19) + "..."
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    width: width,
    height: height,
    position: "absolute",
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 48,
    flexDirection: "row",
    padding: 8,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
  },
  searchInput: {
    paddingBottom: 4,
    paddingLeft: 16,
    flex: 1,
    fontSize: 16,
    color: "black",
    fontWeight: "500",
  },
  resultsContainer: {
    paddingHorizontal: 15,
  },
  resultsCount: {
    color: "white",
    fontWeight: "600",
    marginLeft: 4,
    fontSize: 18,
    marginTop: 8,
  },
  resultsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  resultItem: {
    marginBottom: 16,
    alignItems: "flex-start",
  },
  resultImage: {
    width: width * 0.44,
    height: height * 0.3,
    borderRadius: 24,
  },
  resultTitle: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 4,
    marginTop: 4,
  },
});

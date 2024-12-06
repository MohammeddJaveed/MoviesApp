import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from "react-native";
import { image500 } from "../../../utils/moviesApi";

export default function Cast({ cast, navigation }) {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeTab", item)}
        style={styles.castItem}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.castImage}
            source={{
              uri: image500(item.profile_path),
            }}
          />
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>
            {item?.character.length > 10
              ? `${item.original_name.slice(0, 10)} ...`
              : item?.original_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cast</Text>

      <FlatList
        horizontal
        data={cast}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginBottom: 32,
  },
  title: {
    color: "white",
    fontSize: 18,
    marginHorizontal: 16,
    marginBottom: 12,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  castItem: {
    alignItems: "flex-start",
    marginRight: 24,
  },
  imageContainer: {
    justifyContent: "flex-start",
    width: "100%",
    height: 120,
    borderRadius: 8,
    overflow: "hidden",
  },
  castImage: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
  },
  nameContainer: {
    marginTop: 8,
  },
  nameText: {
    color: "white",
    textAlign: "left",
    fontSize: 14,
  },
});

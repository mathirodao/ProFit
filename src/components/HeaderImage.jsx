import React from "react";
import { StyleSheet, View, Text, Image, useWindowDimensions } from "react-native";
import { colors } from "../global/colors";

const HeaderImage = ({ image, description }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: image }} style={[styles.image, { width }]} resizeMode="cover" />
      <View style={styles.textOverlay}>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </View>
  );
};

export default HeaderImage;

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
  },
  image: {
    height: 200,
    width: '100%',
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  description: {
    fontSize: 16,
    color: colors.blanco,
  },
});

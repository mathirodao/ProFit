import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { colors } from "../global/colors";
import HeaderImage from "../components/HeaderImage";
import FlatCard from "../components/FlatCard";
// import { useDispatch } from 'react-redux'
// import { setRoutines } from '../features/shop/shopSlice'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useGetRoutinesQuery } from "../services/fitService";

const RoutinesScreen = ({ route, navigation }) => {
  const { image, description } = route.params;
  const { width, height } = useWindowDimensions();
  const [isPortrait, setIsPortrait] = useState(true);

  const { data: routines, error, isLoading } = useGetRoutinesQuery();

  const filteredRoutines = routines
  ? Object.values(routines).filter(routine => routine.createdBy === "ProFit")
  : [];

  useEffect(() => {
    setIsPortrait(width < height);
  }, [width, height]);

  const renderRoutineItem = ({ item, index }) => (
    <Pressable
      onPress={() => {
        navigation.navigate("Rutina", {routineId: item.id});
      }}
    >
      <FlatCard style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.categoryTitle}>{item.name}</Text>
          <Text style={styles.description}>{item.description }</Text>
          <Text style={styles.duration}>{item.duration }</Text>
        </View>
      </FlatCard>
    </Pressable>
  );

  console.log("en routine");
  return (
    <View style={styles.container}>
      <HeaderImage image={image} description={description} />
      <View style={styles.contentContainer}>
      <Pressable
        onPress={() => {
          navigation.navigate("Crea tu rutina");
        }}
      >
        <FlatCard style={styles.row}>
          <MaterialIcons
            name="fitness-center"
            size={20}
            color={colors.acentoAzul}
          />
          <Text style={styles.cardText}> Crea tu rutina</Text>
          <MaterialIcons
            name="arrow-right"
            size={40}
            color={colors.acentoAzul}
          />
        </FlatCard>
      </Pressable>

      </View>
      <View style={styles.containerRoutines}>
        <Text style={styles.title}>Rutinas predeterminadas:</Text>
        <>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.grisIntermedio} />
          ) : error ? (
            <Text>Error al cargar las Rutinas</Text>
          ) : (
            <FlatList
              data={Object.values(filteredRoutines)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderRoutineItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
            />
          )}
        </>
      </View>
    </View>
  );
};

export default RoutinesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blanco,
  },
  containerRoutines: {
    flex: 3,
    backgroundColor: colors.blanco,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 0,
  },
  card: {
    width: 290, 
    minHeight:"100%",
    backgroundColor: colors.grisOscuro,
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.acentoAzul,
    paddingLeft: 20,
  },
  cardText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.acentoAzul,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    margin: 10,
    marginBottom: 0,
    backgroundColor: colors.blanco,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  flatListContent: {
    padding: 10,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    padding: 10, 
    justifyContent: "flex-start",
    backgroundColor: colors.gris,
  },
  
  description: {
    fontSize: 14,
    color: "white", 
    marginBottom: 5,
  },
  duration: {
    fontSize: 12,
    color: "white", 
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white", 
    marginBottom: 5,
  },
});

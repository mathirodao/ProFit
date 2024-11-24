import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../global/colors";
//import products from '../data/products.json'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { useGetRoutineQuery } from "../services/fitService";
import FlatCard from "../components/FlatCard";

const RoutineScreen = ({ route, navigation }) => {
  const { routineId } = route.params;
  

  console.log("routine ->", routineId);

  const { width, height } = useWindowDimensions();


  const {
    data: routineFound,
    error,
    isLoading,
  } = useGetRoutineQuery(routineId);

  console.log("Product found:", routineFound);

  const dispatch = useDispatch();

  const isNumeric = (value) => !isNaN(Number(value));

  const renderRoutineItem = ({ item, index }) => (
    <Pressable
      onPress={() => {
        console.log('tocando el ejercicio')
        navigation.navigate("Ejercicio", {exerciseId: item.id, exerciseName: item.name, routine: routineFound});
      }}
    >
      <View style={styles.cardContainer}>

        <Text style={styles.index}>{index + 1}</Text>

        <FlatCard style={styles.card}>
          <View style={styles.textContainer}>

            <Text style={styles.categoryTitle}>{item.name}</Text>

            <View style={styles.subInfoContainer}>
              <Text>REPS: </Text>
              <Text style={styles.description}>{item.reps}</Text>
              <Text>SETS: </Text>
              <Text style={styles.description}>{item.sets}</Text>
            </View>

            <Text style={styles.weight}>{item.weight}{isNumeric(item.weight) && (" Kg")}</Text>
          </View>
        </FlatCard>
      </View>
    </Pressable>
  );

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.grisIntermedio} />
      ) : error ? (
        <Text>Error al cargar la rutina</Text>
      ) : (
        <>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
          </Pressable>
          <FlatList
            data={Object.values(routineFound.exercises)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderRoutineItem}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <>
                <Text style={styles.textBrand}>{routineFound.duration}</Text>
                <Text style={styles.textTitle}>{routineFound.name}</Text>
                <Image
                  source={{ uri: routineFound.image }}
                  alt={routineFound.name}
                  style={{ width: "100%", height: width * 0.7 }}
                  resizeMode="contain"
                />
                <Text style={styles.longDescription}>
                  {routineFound.description}
                </Text>
                <View style={styles.tagsContainer}>
                  <View style={styles.tags}>
                    <Text style={styles.tagText}>Creada por : </Text>
                    <Text key={Math.random()} style={styles.tagText}>
                      {routineFound.createdBy}
                    </Text>
                  </View>
                </View>
                <Text style={styles.subtitle}>Ejercicios:</Text>
              </>
            )}
            ListFooterComponent={() => (
              routineFound.createdBy && routineFound.createdBy !== "ProFit" ? (
                <Pressable
                  style={({ pressed }) => [
                    { opacity: pressed ? 0.95 : 1 },
                    styles.addToCartButton,
                  ]}
                  onPress={() =>
                    dispatch(addItem({ ...routineFound, quantity: 1 }))
                  }
                >  
                  <Text style={styles.textAddToCart}>Agregar al carrito</Text>
                </Pressable>
              ) : null
              )}
          />
        </>
      )}
    </>
  );
};

export default RoutineScreen;

const styles = StyleSheet.create({
  goBack: {
    padding: 8,
    color: colors.acentoVerde,
  },
  productContainer: {
    paddingHorizontal: 16,
  },
  textBrand: {
    color: colors.acentoAzul,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  longDescription: {
    fontSize: 16,
    textAlign: "justify",
    paddingVertical: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  tags: {
    flexDirection: "row",
    gap: 5,
  },
  tagText: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.acentoAzul,
  },
  price: {
    fontWeight: "800",
    fontSize: 18,
  },
  discount: {
    backgroundColor: colors.blanco,
    width: 64,
    height: 64,
    borderRadius: 64,
  },
  discountText: {
    color: colors.blanco,
    textAlign: "center",
    verticalAlign: "center",
  },
  noStockText: {
    color: "red",
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    alignSelf: "center",
    paddingVertical: 16,
  },
  addToCartButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.acentoAzul,
    borderRadius: 16,
    marginVertical: 16,
  },
  textAddToCart: {
    color: colors.blanco,
    fontSize: 24,
    textAlign: "center",
  },
  flatListContent: {
    padding: 0,
  },
  description: {
    fontSize: 16,
    color: colors.acentoVerde, 
    marginRight: 10,
  },
  duration: {
    fontSize: 12,
    color: colors.negro,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  index: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.negro,
    marginRight: 10,
    minWidth: 20,
    textAlign: "center",
  },
  card: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    elevation: 3,
  },
  textContainer: {
    flexDirection: "column",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.acentoAzul,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.negro,
  },
  subInfoContainer: {
    flexDirection: "row", 
    alignItems: "flex-start", 
  },
  weight: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "right",
    marginTop: 10,
  },
});

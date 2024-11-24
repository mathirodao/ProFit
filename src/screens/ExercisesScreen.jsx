import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
// import routines from '../data/routines.json'
import FlatCard from "../components/FlatCard";
import { colors } from "../global/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import Search from "../components/Search";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetProductsByCategoryQuery,
  useGetExercisesQuery,
} from "../services/fitService";
import { setProductId } from "../features/routine/routinesSlice";

const ExercisesScreen = ({route, navigation}) => {
  const { routine } = route.params;
  const [exercisesFiltered, setExercisesFiltered] = useState([])
  const [search, setSearch] = useState("");

  const { data: exercises, error, isLoading } = useGetExercisesQuery();

  useEffect(() => {
    setExercisesFiltered(exercises)
  },[exercises])

  useEffect(() => {
    if (Array.isArray(exercises)) {
      if (search) {
        const productsTempSearched = exercises.filter((exercise) => typeof exercise.name === "string" &&
            exercise.name.toLowerCase().includes(search.toLowerCase())
        );
        setExercisesFiltered(productsTempSearched);
      } else {
        setExercisesFiltered(exercises);
      }
    }
  }, [exercises, search]);

  const renderExerciseItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
            navigation.navigate("Ejercicio", {exerciseId: item.id ,exerciseName: item.name ,routine})
        }}
      >
        <FlatCard style={styles.exerciseCard}>
          <View style={styles.cardContainer}>
            <Image source={{ uri: item.image }} style={styles.ExerciseCardImage} />

            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        </FlatCard>
      </Pressable>
    );
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState(null);
  //   const [exercises, setExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addExercise = (exercise) => {
    setExercises((prevExercises) => [...prevExercises, exercise]);
  };

  const editExercise = (editedExercise) => {
    setExercises((prevExercises) =>
      prevExercises.map((ex) =>
        ex.id === editedExercise.id ? editedExercise : ex
      )
    );
  };

  const saveRoutine = () => {
    const routine = {
      createdBy: "ProFit",
      name,
      description,
      duration,
      image,
      exercises,
    };
  };

  const ExerciseModal = () => {
    const [exerciseName, setExerciseName] = useState(
      selectedExercise?.name || ""
    );

    const handleSave = () => {
      if (selectedExercise) {
        editExercise({ ...selectedExercise, name: exerciseName });
      } else {
        addExercise({
          id: Date.now().toString(),
          name: exerciseName,
        });
      }
      setModalVisible(false);
      setSelectedExercise(null);
    };

    return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedExercise ? "Editar Ejercicio" : "Agregar Ejercicio"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Ejercicio"
              value={exerciseName}
              onChangeText={setExerciseName}
            />
            <Button title="Guardar" onPress={handleSave} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      {
        isLoading 
        ?
        <ActivityIndicator size="large" color={colors.grisIntermedio} />
        :
        error
        ?
        <Text>Error al cargar los ejercicios</Text>
        :
        <>
        <View style={styles.container}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
          </Pressable>
          <Search setSearch={setSearch} />
          <FlatList
            data={exercisesFiltered}
            keyExtractor={(item) => item.id}
            renderItem={renderExerciseItem}
            />
        </View>
        </>
      }
    </>
  );
};

export default ExercisesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 0,
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exerciseContainer: {
    color: "white",
    // flexDirection: "row",
    padding: 20,
    justifyContent: "flex-start",
    margin: 5,
    alignItems: "center",
    // gap: 10,
  },
  exerciseCard: {
    marginVertical: 8,
    padding: 0,
    marginHorizontal: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2, // sombra para Android
    shadowColor: '#000', // sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ExerciseCardImage: {
    width: 140,
    height: 100,
    borderRadius: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: '#007BFF', // azul
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#000',
  },
});

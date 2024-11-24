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
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
// import routines from '../data/routines.json'
import FlatCard from "../components/FlatCard";
import { colors } from "../global/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import Search from "../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { selectRoutineById } from "../features/routine/routinesSelectors";
import {
  addRoutine,
  selectAllRoutines,
  selectCurrentRoutineId,
} from "../features/routine/routinesSlice";
import { useAddRoutineToFirebaseMutation } from "../services/fitService";
import { setProductId } from "../features/routine/routinesSlice";

const CreateRoutineScreen = ({ navigation }) => {
  const [addRoutineToFirebase] = useAddRoutineToFirebaseMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const dispatch = useDispatch();

  const currentRoutineId = useSelector(selectCurrentRoutineId);
  const allRoutines = useSelector(selectAllRoutines);
  const routine = useSelector((state) =>
    currentRoutineId ? selectRoutineById(state, currentRoutineId) : null
  );
  const routinesState = useSelector((state) => state.routines || {});

  const currentRoutine = useSelector((state) =>
    selectRoutineById(state, currentRoutineId)
  );

  const handleSaveRoutine = async () => {
    console.log("routine.name", routine.name);
    if (routine && Array.isArray(routine.exercises)) {
      console.log("Exercises:", routine.exercises);
    } else {
      console.log("No exercises found or routine is undefined");
    }

    if (!currentRoutine) {
      console.error("Rutina no encontrada");
      return;
    }

    try {
      // await addRoutine(newRoutine).unwrap(); // Envía la rutina a Firebase
      const response = await addRoutineToFirebase(currentRoutine).unwrap();
      console.log("Rutina creada exitosamente en Firebase:", response);
      navigation.goBack(); // Navegar a otra pantalla
    } catch (error) {
      console.error("Error al crear la rutina:", error);
    }
  };

  const verifyCameraPermissions = async () => {
    console.log("verifyCameraPermissions");
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    console.log("granted", granted);
    if (!granted) return false;
    return true;
  };

  const pickImage = async () => {
    console.log("en pickImage");
    const permissionOk = await verifyCameraPermissions();
    if (permissionOk) {
      console.log("permisos concedidos");
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
      }
    } else {
      console.log("Permisos denegados");
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

  const handleCreateRoutine = () => {
    const routine = {
      createdBy: "user",
      name,
      description,
      duration,
      image,
      exercises: [],
    };

    dispatch(addRoutine(routine));

    navigation.navigate("Ejercicios", { routine });
  };

  return (
    <FlatList
      style={styles.container}
      data={exercises}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <Text style={styles.label}>Nombre de la Rutina</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el nombre"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese una descripción"
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Duración</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese la duración"
            value={duration}
            onChangeText={setDuration}
          />

          <Text style={styles.label}>Imagen</Text>
          <Pressable onPress={pickImage} style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text>Seleccionar Imagen</Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => {
              handleCreateRoutine();
            }}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Agregar Ejercicio</Text>
          </Pressable>
        </>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            setSelectedExercise(item);
            setModalVisible(true);
          }}
        >
          <View style={styles.exerciseCard}>
            <Text>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={<Text>No hay ejercicios añadidos.</Text>}
      ListFooterComponent={
        <Button title="Guardar Rutina" onPress={handleSaveRoutine} /> 
      }
    />
  );
};

export default CreateRoutineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
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
  exerciseCard: {
    padding: 15,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    marginVertical: 5,
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
});

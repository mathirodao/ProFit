import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Button,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useGetExerciseByIdQuery } from "../services/fitService";
import ValuePicker from "../components/ValuePicker";
import HeaderImage from "../components/HeaderImage";
import { colors } from "../global/colors";
import { MaterialIcons } from "@expo/vector-icons"; 
import { useDispatch, useSelector } from "react-redux";
import { addExerciseToRoutine, selectCurrentRoutineId } from "../features/routine/routinesSlice";

const ExerciseScreen = ({ route, navigation }) => {
  const {
    exerciseId,
    exerciseName,
    routine = { exercises: [] },
  } = route.params;

  const repsOptions = Array.from({ length: 50 }, (_, i) => i + 1);
  const setsOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const weightOptions = Array.from({ length: 100 }, (_, i) => i + 1);
  const dispatch = useDispatch();

  const currentRoutineId = useSelector(selectCurrentRoutineId);

  const handleSaveExercise = () => {
    const newExercise = {
      id: Date.now().toString(),
      name: exerciseName,
      reps: selectedReps,
      sets: selectedSets,
      weight: selectedWeight,
    };

    dispatch(
      addExerciseToRoutine({ routineId: currentRoutineId, exercise: newExercise })
    );
    navigation.goBack(); // O redirigir según corresponda
  };

  const exerciseFound = routine?.exercises?.find(
    (exercise) => exercise.id === exerciseId
  ) || {
    id: exerciseId,
    name: exerciseName,
    reps: 1,
    sets: 1,
    weight: "1",
  };

  // Estados locales para los valores seleccionados
  const [selectedSets, setSelectedSets] = useState(exerciseFound.sets);
  const [selectedReps, setSelectedReps] = useState(exerciseFound.reps);
  const [selectedWeight, setSelectedWeight] = useState(exerciseFound.weight);

  // Estados para los modales
  const [modalVisible, setModalVisible] = useState({
    reps: false,
    weight: false,
    sets: false,
  });

  const {
    data: exerciseById,
    error,
    isLoading,
  } = useGetExerciseByIdQuery(exerciseFound.id);

  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.grisIntermedio} />;
  }

  if (error) {
    return <Text>Error al cargar el ejercicio</Text>;
  }

  const openModal = (type) => {
    setModalVisible({ ...modalVisible, [type]: true });
  };

  const closeModal = (type) => {
    setModalVisible({ ...modalVisible, [type]: false });
  };

  const options = [
    {
      label: "Series",
      value: selectedSets,
      options: setsOptions,
      setValue: setSelectedSets,
      type: "sets",
    },
    {
      label: "Repeticiones",
      value: selectedReps,
      options: repsOptions,
      setValue: setSelectedReps, 
      type: "reps",
    },
    {
      label: "Peso",
      value: selectedWeight,
      options: weightOptions,
      setValue: setSelectedWeight, 
      type: "weight",
    },
  ];

  const isNumeric = (value) => !isNaN(Number(value));

  const handleSave = () => {
    const exerciseNew = {
      id: exerciseId,
      name: exerciseName,
      reps: selectedReps,
      sets: selectedSets,
      weight: selectedWeight,
    };

    const updatedRoutine = {
      ...routine,
      exercises: [...(routine?.exercises || []), exerciseNew], 
    };


  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderImage
          image={exerciseById.image}
          description={exerciseById.name}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.description}>{exerciseById.description}</Text>
          {options.map((option) => (
            <View key={option.type}>
              <TouchableOpacity
                style={[
                  styles.card,
                  option.type === "weight" && !isNumeric(option.value)
                    ? styles.disabledCard
                    : null,
                ]}
                onPress={() =>
                  routine.createdBy !== "ProFit" &&
                  (option.type !== "weight" || isNumeric(option.value))
                    ? openModal(option.type)
                    : null
                }
                disabled={
                  routine.createdBy === "ProFit" ||
                  (option.type === "weight" && !isNumeric(option.value))
                }
              >
                <Text style={styles.cardLabel}>{option.label}</Text>

                <View style={styles.editValue}>
                  <Text style={styles.cardValue}>
                    {option.value}
                    {option.type === "weight" &&
                      isNumeric(option.value) &&
                      " Kg"}
                  </Text>
                  {isNumeric(option.value) &&
                    routine.createdBy !== "ProFit" && (
                      <MaterialIcons
                        style={styles.icon}
                        name="edit"
                        size={24}
                        color={colors.acentoAzul}
                      />
                    )}
                </View>
              </TouchableOpacity>

              <Modal
                visible={modalVisible[option.type]}
                transparent={true}
                animationType="slide"
                onRequestClose={() => closeModal(option.type)}
              >
                <SafeAreaView style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <ValuePicker
                      label={option.label}
                      currentValue={option.value}
                      options={option.options}
                      onSave={option.setValue}
                    />
                    <Button
                      title="OK"
                      onPress={() => closeModal(option.type)}
                      color={colors.acentoAzul}
                    />
                  </View>
                </SafeAreaView>
              </Modal>
            </View>
          ))}

          {routine.createdBy !== "ProFit" && (
            <Button
              title="Guardar"
              onPress={handleSaveExercise}
              color={colors.acentoVerde}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ExerciseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blanco,
  },
  contentContainer: {
    padding: 20,
  },
  icon: {
    marginLeft: "20%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.grisClaro,
    backgroundColor: colors.blanco,
  },
  editValue: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.grisClaro,
    backgroundColor: colors.blanco,
  },
  description: {
    fontSize: 16,
    color: colors.negro,
    marginBottom: 15,
  },
  cardLabel: {
    fontSize: 16,
    color: colors.negro,
  },
  cardValue: {
    fontSize: 16,
    color: colors.acentoAzul,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.blanco,
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
});

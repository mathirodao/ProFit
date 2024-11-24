import { createSlice, createSelector } from '@reduxjs/toolkit';

// Generador de ID
function generateNewRoutineId() {
  const timestamp = Date.now(); // Fecha en milisegundos
  const random = Math.floor(Math.random() * 10000); // Número aleatorio de 4 dígitos
  return `${timestamp}${random}`;
}

// Estado inicial
const initialState = {
  routines: [], // Array para almacenar múltiples rutinas
  currentRoutineId: null,
};

const routinesSlice = createSlice({
  name: 'routines',
  initialState,
  reducers: {
    setCurrentRoutineId: (state, action) => {
      state.currentRoutineId = action.payload;
    },
    // Agregar una rutina con un ID generado automáticamente si no se proporciona
    addRoutine: (state, action) => {
      const newRoutineId = generateNewRoutineId();
      const newRoutine = {
        ...action.payload,
        id: newRoutineId,
        exercises: action.payload.exercises || [], // Asegurar que `exercises` exista como un array
      };
      state.routines.push(newRoutine);
      state.currentRoutineId = newRoutineId;
    },
    // Actualizar una rutina existente
    updateRoutine: (state, action) => {
      const { id, updatedRoutine } = action.payload;
      const index = state.routines.findIndex((routine) => routine.id === id);
      if (index !== -1) {
        state.routines[index] = updatedRoutine; // Reemplaza la rutina existente
      }
    },
    // Eliminar una rutina
    deleteRoutine: (state, action) => {
      state.routines = state.routines.filter(
        (routine) => routine.id !== action.payload
      );
    },
    // Agregar un ejercicio a una rutina
    addExerciseToRoutine: (state, action) => {
      const { routineId, exercise } = action.payload;

      // Buscar rutina por ID
      let routine = state.routines.find((routine) => routine.id === routineId);
      console.log('sera que encontro rutina', routine);
      if (routine) {
        // Agregar ejercicio si la rutina existe
        routine.exercises.push(exercise);
      } else {
        // Crear una nueva rutina con el ejercicio si no existe
        const newRoutineId = generateNewRoutineId();
        state.routines.push({
          id: newRoutineId,
          name: 'Nueva Rutina', // Nombre por defecto
          exercises: [exercise],
        });
      }
    },
    // Editar un ejercicio dentro de una rutina
    editExerciseInRoutine: (state, action) => {
      const { routineId, updatedExercise } = action.payload;
      const routine = state.routines.find((routine) => routine.id === routineId);
      if (routine) {
        routine.exercises = routine.exercises.map((ex) =>
          ex.id === updatedExercise.id ? updatedExercise : ex
        );
      }
    },
    // Eliminar un ejercicio de una rutina
    deleteExerciseFromRoutine: (state, action) => {
      const { routineId, exerciseId } = action.payload;
      const routine = state.routines.find((routine) => routine.id === routineId);
      if (routine) {
        routine.exercises = routine.exercises.filter((ex) => ex.id !== exerciseId);
      }
    },
  },
});

// Exportar acciones
export const {
  setCurrentRoutineId,
  addRoutine,
  updateRoutine,
  deleteRoutine,
  addExerciseToRoutine,
  editExerciseInRoutine,
  deleteExerciseFromRoutine,
} = routinesSlice.actions;

// Reducer por defecto
export default routinesSlice.reducer;

// =======================
// Selectores
// =======================

// Selector básico para obtener todas las rutinas
export const selectAllRoutines = (state) => state.routines.routines;

// Selector para obtener el ID de la rutina actual
export const selectCurrentRoutineId = (state) => state.routines.currentRoutineId;

// Selector para obtener una rutina específica por ID
export const selectRoutineById = (state, routineId) =>
  state.routines?.routines?.find((routine) => routine.id === routineId);



// routine {
//     "createdBy": "ProFit", 
//     "description": "Rutina para el fortalecimiento del tren superior, combinando ejercicios de pecho y tríceps.", 
//     "duration": "50-60 minutos", 
//     "exercises": [{"id": 1, "name": "Press de banca", "reps": 10, "sets": 4, "weight": "70"}, {"id": 3, "name": "Fondos", "reps": 12, "sets": 3, "weight": "peso corporal"}, {"id": 6, "name": "Press inclinado con mancuernas", "reps": 8, "sets": 4, "weight": "25"}, {"id": 7, "name": "Crossover con poleas", "reps": 15, "sets": 3, "weight": "20"}], 
//     "id": "5001", 
//     "image": "https://hips.hearstapps.com/hmg-prod/images/12-ejercicios-para-abdominales-elle-1632239590.jpg", 
//     "name": "Rutina - Pecho y Tríceps"}
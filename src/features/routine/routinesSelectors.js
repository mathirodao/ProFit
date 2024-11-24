// src/features/routines/routinesSelectors.js
import { createSelector } from '@reduxjs/toolkit';

// Selector básico para obtener todas las rutinas
export const selectAllRoutines = (state) => state.routines.routines;

// Selector para obtener una rutina específica por ID
export const selectRoutineById = createSelector(
  [selectAllRoutines, (_, routineId) => routineId],
  (routines, routineId) => routines.find((routine) => routine.id === routineId)
);

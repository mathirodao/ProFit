import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../global/colors";

const ValuePicker = ({ label, currentValue, options = [], onSave }) => {
  const [selectedItem, setSelectedItem] = useState(currentValue);

  const validOptions = options
    .map((item) => (typeof item === "number" ? item : Number(item)))
    .filter((item) => !isNaN(item));

  useEffect(() => {
    if (currentValue !== selectedItem) {
      setSelectedItem(currentValue);
    }
  }, [currentValue]);

  const handleValueChange = (itemValue) => {
    setSelectedItem(itemValue); 
    if (typeof onSave === "function") {
      onSave(itemValue); 
    }
  };

  return (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.valueText}>Actual: {selectedItem}</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedItem} 
          onValueChange={handleValueChange}
          style={styles.picker}
          dropdownIconColor={colors.acentoAzul}
        >
          {validOptions.map((option, index) => (
            <Picker.Item
              key={index}
              color={colors.acentoAzul}
              label={String(option)}
              value={option}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default ValuePicker;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    color: "#333",
  },
  valueText: {
    fontSize: 14,
    color: "#666",
  },
  pickerContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  picker: {
    width: "100%",
  },
});


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

const courses = [
  'Starter',
  'Main Course',
  'Dessert',
  'Beverage',
];

export default function AddMenuItemScreen({
  onSave,
  onBack,
}) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    if (
      !dishName.trim() ||
      !description.trim() ||
      !course ||
      !price.trim()
    ) {
      Alert.alert(
        'Missing Information',
        'Please complete all fields before saving.'
      );
      return;
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      Alert.alert(
        'Invalid Price',
        'Enter a valid price greater than zero.'
      );
      return;
    }

    const newItem = {
      id: `${Date.now()}-${Math.random()}`,
      name: dishName.trim(),
      description: description.trim(),
      course: course,
      price: numericPrice,
    };

    onSave(newItem);

    Alert.alert(
      'Success',
      `${dishName.trim()} has been added to your menu.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setDishName('');
            setDescription('');
            setCourse('');
            setPrice('');
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Add Menu Item</Text>
      <Text style={styles.subtitle}>
        Enter the details of your new dish.
      </Text>

      <Text style={styles.label}>Dish Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Grilled Chicken"
        value={dishName}
        onChangeText={setDishName}
        maxLength={80}
      />

      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Describe the dish and its ingredients"
        value={description}
        onChangeText={setDescription}
        multiline
        maxLength={300}
      />

      <Text style={styles.label}>Course *</Text>
      <View style={styles.courseContainer}>
        {courses.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.courseButton,
              course === item && styles.selectedCourse,
            ]}
            onPress={() => setCourse(item)}
          >
            <Text
              style={[
                styles.courseText,
                course === item && styles.selectedCourseText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Price (R) *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 89.99"
        value={price}
        onChangeText={(text) => {
          // Allow digits and one decimal point.
          if (/^\d*\.?\d*$/.test(text)) {
            setPrice(text);
          }
        }}
        keyboardType="decimal-pad"
        maxLength={10}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>
          Save Menu Item
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={onBack}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5EF',
  },
  content: {
    padding: 22,
    paddingBottom: 40,
  },
  backText: {
    color: '#244638',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 24,
  },
  title: {
    color: '#244638',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#666666',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 25,
  },
  label: {
    color: '#244638',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7D9D2',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
  },
  descriptionInput: {
    height: 110,
    textAlignVertical: 'top',
  },
  courseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  courseButton: {
    borderWidth: 1,
    borderColor: '#244638',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 13,
    backgroundColor: '#FFFFFF',
  },
  selectedCourse: {
    backgroundColor: '#244638',
  },
  courseText: {
    color: '#244638',
    fontSize: 13,
    fontWeight: '600',
  },
  selectedCourseText: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#244638',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    padding: 15,
    alignItems: 'center',
  },
  cancelText: {
    color: '#666666',
    fontWeight: '600',
  },
});
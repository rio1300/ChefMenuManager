
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function DisplayMenuScreen({
  menuItems,
  onBack,
  onAddMenu,
}) {
  const renderMenuItem = ({ item }) => (
    <View style={styles.menuCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.dishName}>{item.name}</Text>
        <Text style={styles.price}>
          R {item.price.toFixed(2)}
        </Text>
      </View>

      <Text style={styles.course}>{item.course}</Text>

      <Text style={styles.description}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Our Menu</Text>
      <Text style={styles.subtitle}>
        {menuItems.length} menu item(s) added
      </Text>

      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          menuItems.length === 0
            ? styles.emptyContainer
            : styles.listContent
        }
        ListEmptyComponent={
          <View style={styles.emptyMessage}>
            <Text style={styles.emptyTitle}>
              No Menu Items Yet
            </Text>

            <Text style={styles.emptyDescription}>
              Your menu is empty. Add your first dish
              to get started.
            </Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={onAddMenu}
            >
              <Text style={styles.addButtonText}>
                + Add First Dish
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5EF',
    paddingHorizontal: 22,
    paddingTop: 25,
  },
  backText: {
    color: '#244638',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 22,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#244638',
  },
  subtitle: {
    color: '#666666',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 30,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 17,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#B58B45',
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  dishName: {
    flex: 1,
    color: '#244638',
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    color: '#244638',
    fontSize: 16,
    fontWeight: 'bold',
  },
  course: {
    color: '#B58B45',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 9,
  },
  description: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyMessage: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 35,
  },
  emptyTitle: {
    color: '#244638',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyDescription: {
    color: '#666666',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#244638',
    borderRadius: 10,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
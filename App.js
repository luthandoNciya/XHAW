import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [totalPagesRead, setTotalPagesRead] = useState(0);
  const [averagePagesPerBook, setAveragePagesPerBook] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: 'Gardening',
    pages: 0,
  });

  const genres = ['Child-miding = 750', 'Gardening = 750', 'Sewing = 1500', 'Landscaping = 1500', 'Life Skills = 1500', 'Cooking = 750'];

  const addBook = () => {
    const { title, author, genre, pages } = newBook;
    if (title && author && genre && pages > 0) {
      const newTotalPagesRead = totalPagesRead + pages;
      const newBooks = [{ title, author, genre, pages , ...books}];

      setTotalPagesRead(newTotalPagesRead);
      setBooks(newBooks);

      
      const newAveragePagesPerBook = newTotalPagesRead / newBooks.length;
      setAveragePagesPerBook(newAveragePagesPerBook);

     
      setNewBook({
        title: '',
        author: '',
        genre: 'Gardening',
        pages: 0,
      });
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Empoweing the nation</Text>
      </View>

      <View style={styles.lastBookContainer}>
        <Text style={styles.sectionTitle}></Text>
        {books.length > 0 ? (
          <FlatList
            data={[books[0]]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.bookDetail}>Title: {item.title}</Text>
                <Text style={styles.bookDetail}>Author: {item.author}</Text>
                <Text style={styles.bookDetail}>Genre: {item.genre}</Text>
                <Text style={styles.bookDetail}>Pages: {item.pages}</Text>
              </View>
            )}
          />
        ) : (
          <Text> No books </Text>
      )}
      </View>
      
      <View style={styles.statisticsContainer}>
        <Text style={styles.sectionTitle}>Calculator</Text>
        <Text style={styles.statDetail}>Total Number of chosen courses: {totalPagesRead}</Text>
        <Text style={styles.statDetail}>Amount paid for courses: {averagePagesPerBook.toFixed(2)}</Text>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}> Pick your course</Text>
      </TouchableOpacity>

      {}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Add courses here</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Course Name"
            value={newBook.title}
            onChangeText={(text) => setNewBook({ ...newBook, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Another Course"
            value={newBook.author}
            onChangeText={(text) => setNewBook({ ...newBook, author: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Child minding; fees: 1500
                         Purpose: To provide alterations and new garment tailoring service"
            value={newBook.author}
            onChangeText={(text) => setNewBook({ ...newBook, author: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Landscaping; fees: 1500
                         Purpose: To provide landscaping services for new and established gardens"
            value={newBook.author}
            onChangeText={(text) => setNewBook({ ...newBook, author: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Cooking; fees: 750
                         Purpose: To prepare and cook nutritious family meals"
            value={newBook.author}
            onChangeText={(text) => setNewBook({ ...newBook, author: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="First Aid; fees: 1500
                         Purpose: To provide first aid awanesess and basic life support"
            value={newBook.author}
            onChangeText={(text) => setNewBook({ ...newBook, author: text })}
          />


          <View style={styles.dropdownContainer}>
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre}
                style={[
                  styles.dropdownButton,
                  newBook.genre === genre ? { backgroundColor: '#007AFF' } : null,
                ]}
                onPress={() => setNewBook({ ...newBook, genre: genre })}
              >
                <Text
                  style={[
                    styles.dropdownButtonText,
                    newBook.genre === genre ? { color: '#FFF' } : null,
                  ]}
                >
                  {genre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Full course"
            value={newBook.pages.toString()}
            onChangeText={(text) => setNewBook({ ...newBook, pages: parseInt(text) || 0 })}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.addBookButton} onPress={addBook}>
            <Text style={styles.addBookButtonText}>Add Entered Course</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>Home Screen</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 7,
    justifyContent: 'center',
    padding: 2,
    backgroundColor: '#b0c4de',
  },
  modalHeader: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 1,
  },
  input: {
    marginBottom: 80,
    padding: 20,
    backgroundColor: '#fff8dc',
    borderRadius: 40,
  },

  addBookButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },

  addBookButton: {
    backgroundColor: '#add8e6',
    borderRadius: 40,
    padding: 20,
    alignItems: 'center',
    marginTop: 30,
  },
  
  cancelButton: {
    backgroundColor: '#add8e6',
    borderRadius: 40,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    padding: 5,
  },
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#F2F2F2',
  },
  headerContainer: {
    alignItems: 'Left',
    marginBottom: 50,
    
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  
  lastBookContainer: {
    marginBottom: 200,
    backgroundColor: '#add8e6',
    borderRadius: 70,
    padding: 15,
    elevation: 2, 
    shadowColor: '#add8e6',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bookDetail: {
    fontSize: 16,
    color: '#555',
  },
  
statDetail: {
  fontSize: 16,
  color: '#555',
},

  statisticsContainer: {
    marginBottom: 200,
    backgroundColor: '#add8e6',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  
  statDetail: {
    fontSize: 16,
    color: '#555',
  },
  
  navButton: {
    flex: 1,
    backgroundColor: '#ba55d3',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },

  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },

  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },

  addButton: {
    backgroundColor: '#add8e6',
    borderRadius: 50,
    padding: 30,
    alignItems: 'right',
  },

  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default HomePage;
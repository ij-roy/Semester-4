import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { faker } from '@faker-js/faker/locale/en'; // Use ESM import

const YoloPayScreen = () => {
  const [isFrozen, setIsFrozen] = useState(false);

  // Generate random card details using @faker-js/faker
  const cardDetails = {
    number: faker.finance.creditCardNumber(),
    expiry: faker.date.future().toLocaleDateString(),
    cvv: faker.finance.creditCardCVV(),
  };

  // Toggle freeze/unfreeze
  const handleFreeze = () => {
    setIsFrozen(!isFrozen);
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation={isFrozen ? 'shake' : undefined}
        duration={1000}
        style={styles.cardContainer}
      >
        <Text style={styles.cardText}>Card Number: {cardDetails.number}</Text>
        <Text style={styles.cardText}>Expiry: {cardDetails.expiry}</Text>
        <Text style={styles.cardText}>CVV: {cardDetails.cvv}</Text>
      </Animatable.View>

      <TouchableOpacity onPress={handleFreeze} style={styles.freezeButton}>
        <Text style={styles.freezeButtonText}>
          {isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    marginVertical: 5,
  },
  freezeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  freezeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default YoloPayScreen;
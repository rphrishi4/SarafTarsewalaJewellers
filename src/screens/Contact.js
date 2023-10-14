import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../theme'

const Contact = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Service Options:</Text>
        <Text style={styles.infoText}>
          In-store shopping · Delivery
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.infoText}>
          Rani Avanti Bai Square, Mantri Bhavan, Khairlanji Rd, Tirora, Maharashtra 441911
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Timing:</Text>
        <Text style={styles.infoText}>
          Mon - Fri 10 am - 8 pm (Thursday Holiday)
        </Text>
        <Text style={styles.infoLabel}>Phone:</Text>
        <Text style={styles.infoText}>
          0976 598 8799
        </Text>
      </View>
    </View>
  )
}

export default Contact

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  infoContainer: {
    marginVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  infoText: {
    fontSize: 16,
    color: 'black',
  },
});
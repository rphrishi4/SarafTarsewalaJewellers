import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../theme';
import PrivacyPolicy from '../components/PrivacyPolicy';

const Terms = () => {
  const handleLinkPress = async () => {
    const url = 'https://rphrishi4.github.io/STJ/';
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error('Cannot open the provided URL');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.backgroundContainer}>
        <Text style={styles.heading}>Terms and Conditions</Text>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.sectionText}>
            By accessing or using the STJ App, you agree to be bound by these Terms. If you do not agree with any part of these Terms, do not use the App.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>2. App Usage</Text>
          <Text style={styles.sectionText}>2.1. Eligibility: You must be at least 18 years old to use the STJ App.</Text>
          <Text style={styles.sectionText}>2.2. Registration: Accurate and complete information is required for account registration.</Text>
          <Text style={styles.sectionText}>2.3. User Content: You are responsible for any content you upload or submit to the App.</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>3. Privacy Policy</Text>
          <Text style={styles.sectionText}>
            Your use of the App is also governed by our Privacy Policy. By using the App, you consent to the collection, use, and sharing of your information as described.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>4. Use of the App</Text>
          <Text style={styles.sectionText}>4.1. License: STJ grants you a limited, non-exclusive, non-transferable, revocable license to use the App.</Text>
          <Text style={styles.sectionText}>4.2. Prohibited Activities:</Text>
          <Text style={styles.listItem}>• Use the App for any illegal or unauthorized purpose.</Text>
          <Text style={styles.listItem}>• Attempt to gain unauthorized access to any part of the App.</Text>
          <Text style={styles.listItem}>• Engage in any fraudulent activity on the App.</Text>
        </View>

        <TouchableOpacity style={styles.linkContainer} onPress={handleLinkPress}>
          <Text style={styles.linkText}>Learn more on our website</Text>
        </TouchableOpacity>
        
        <PrivacyPolicy />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
  },
  backgroundContainer: {
    padding: 16,
    backgroundColor: colors.lightGray,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.marron,
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: colors.textGray,
    lineHeight: 22,
  },
  listItem: {
    fontSize: 16,
    color: colors.textGray,
    lineHeight: 22,
    marginLeft: 10,
  },
  linkContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: colors.blue,
    textDecorationLine: 'underline',
  },
});

export default Terms;

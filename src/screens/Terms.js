import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../theme'
import Slider from 'react-native-slider'; //uninstall



const Terms = () => {
  return (
    <ScrollView>

    <View style={styles.Backgroundcontainer}>
      
    <View style={styles.container}>
      <Text style={styles.heading}>Terms and Conditions</Text>

      <Text style={styles.section}>1. Acceptance of Terms</Text>
      <Text style={styles.text}>
        By accessing or using the STJ App, you agree to be bound by these Terms. If you do not agree with any part of these Terms, do not use the App.
      </Text>

      <Text style={styles.section}>2. App Usage</Text>
      <Text style={styles.text}>
        2.1. Eligibility: You must be at least 18 years old to use the STJ App. By using the App, you represent and warrant that you are 18 years of age or older.
      </Text>
      <Text style={styles.text}>
        2.2. Registration: You may be required to register an account to use certain features of the App. You are responsible for providing accurate and complete information during the registration process and keeping your login credentials secure.
      </Text>
      <Text style={styles.text}>
        2.3. User Content: You are solely responsible for any content you submit or upload to the App, including reviews, comments, images, and other user-generated content. You agree not to upload any content that violates these Terms or any applicable laws.
      </Text>

      <Text style={styles.section}>3. Privacy Policy</Text>
      <Text style={styles.text}>
        Your use of the App is also governed by our Privacy Policy. By using the App, you consent to the collection, use, and sharing of your information as described in the Privacy Policy.
      </Text>

      <Text style={styles.section}>4. Use of the App</Text>
      <Text style={styles.text}>
        4.1. License: STJ grants you a limited, non-exclusive, non-transferable, revocable license to use the App for personal, non-commercial purposes.
      </Text>
      <Text style={styles.text}>
        4.2. Prohibited Activities: You may not:
      </Text>
      <Text style={styles.text}>
        a. Use the App for any illegal or unauthorized purpose.
      </Text>
      <Text style={styles.text}>
        b. Attempt to gain unauthorized access to any part of the App.
      </Text>
      <Text style={styles.text}>
        c. Use the App in any manner that could disrupt, damage, or impair its operation.
      </Text>
      <Text style={styles.text}>
        d. Engage in any fraudulent activity on the App.
      </Text>
      <Text style={styles.text}>
        e. Use the App to promote or sell products or services without our prior written consent.
      </Text>
    </View>
    
    </View>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  Backgroundcontainer: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  section: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});

export default Terms;

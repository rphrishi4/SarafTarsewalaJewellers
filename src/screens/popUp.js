import React, { useState, useEffect } from 'react';
import { View, Modal, ScrollView, Text, StyleSheet, Image, Dimensions, Linking, ToastAndroid, RefreshControl, TouchableOpacity } from 'react-native';


const transparent = 'rgba(0, 0, 0, 0.5)';
export default function popUp() {
    const [popoup, setPopup] = useState(true);

    return (
        <Modal visible={popoup}
            animationType="slide"
            transparent={true}

        >
            <View style={{
                flex: 1, 
                justifyContent: "center",
                // width: '70%', height: '50%',
                alignItems: "center",
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
                <View
                    style={{
                        backgroundColor: 'white',
                        padding: 3,
                        width: '70%',
                        height: '70%',
                        borderRadius: 10,
                    }}>
                    <TouchableOpacity onPress={() => setPopup(false)}>
                        <Image
                            source={{ uri: 'https://icons.iconarchive.com/icons/iconsmind/outline/512/Close-icon.png' }}
                            style={styles.closeIconPopupRight}
                        />
                    </TouchableOpacity>
                    <Image
                        source={require('../assets/Images/popup.png')}
                        style={{
                            flex: 0, justifyContent: "center", //position: 'absolute',
                            width: '100%', height: '100%',
                            zIndex: -1,
                            borderRadius: 10,
                            // alignItems: "center",
                        }}
                    />

                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    closeIconPopupRight: {
        zIndex: 1,
        position: 'absolute',
         // Adjust this value for the desired vertical position
        right: 1, // Adjust this value for the desired horizontal position
        backgroundColor: 'rgba(0, 0, 0, 0.25)', // Background color with transparency
        borderRadius: 30, // Adjust to create a circular shape
        height: 40,
        width: 40,
         // Adjust for icon size and padding
         // Ensure it's displayed on top of the ScrollView
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

})
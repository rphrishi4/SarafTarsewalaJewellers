import firestore from '@react-native-firebase/firestore';

const fetchCarouselData = async () => {
  try {
    const carouselDataRef = firestore().collection('Banners'); // Replace with your collection name
    const snapshot = await carouselDataRef.get();

    const carouselData = [];
    snapshot.forEach((doc) => {
      carouselData.push(doc.data());
    });

    return carouselData;
  } catch (error) {
    console.error('Error fetching carousel data:', error); 
    return [];
  }
};
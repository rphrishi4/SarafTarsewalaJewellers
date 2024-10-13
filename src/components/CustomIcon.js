import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import the desired icon library
// Usage: <MaterialIcons name="icon-name" size={20} color="#4F8EF7" />
// Example custom icon component
const CustomIcon = ({ name, color, size }) => (
  <FontAwesome name={name} color={color} size={size} />
);

export default CustomIcon;
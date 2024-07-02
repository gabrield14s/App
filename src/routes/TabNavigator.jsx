import Home from "../pages/Home/Home";
import Passwords from "../pages/Passwords/Passwords";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="HomeStackNavigator" component={Home} options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="home"
              size={size + 5}
              color={focused ? 'blue' : color}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false
        }} />
        <Tab.Screen name="Passwords" component={Passwords} options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="lock"
              size={size + 5}
              color={focused ? 'blue' : color}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }} />
      </Tab.Navigator>
    );
  }
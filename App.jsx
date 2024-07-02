import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login/Login';
import NewUser from './src/pages/NewUser/NewUser';
import Home from './src/pages/Home/Home'
import ForgotPassword from './src/pages/ForgotPassword/ForgotPassword';
import TabNavigator from './src/routes/TabNavigator';
import Auth from './src/Components/auth';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Auth>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="NewUser"
            component={NewUser}
            options={
              { title: "Register" }
            }
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={
              { title: "Recover your password" }
            }
          />
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={ { headerShown: false } }
          />
          <Stack.Screen
            name="Passwords"
            component={TabNavigator}
          />
        </Stack.Navigator>
      </Auth>
    </NavigationContainer>
  );
}
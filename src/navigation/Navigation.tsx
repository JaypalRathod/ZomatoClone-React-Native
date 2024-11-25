import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@features/auth/SplashScreen';
import LoginScreen from '@features/auth/LoginScreen';
import { navigationRef } from '@utils/NavigationUtils';
import UserBottomTab from '@features/tabs/UserBottomTab';
import AnimatedTabs from '@features/tabs/AnimatedTabs';
import RestaurantScreen from '@features/restaurant/RestaurantScreen';
import OrderSuccessScreen from '@features/checkout/OrderSuccessScreen';
import CheckoutScreen from '@features/checkout/CheckoutScreen';

const Stack = createNativeStackNavigator();
const Navigation: FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName='SplashScreen'
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                
                <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
                
                <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />

                <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} />

                <Stack.Screen
                    options={{
                        animation: 'fade'
                    }}
                    name="LoginScreen"
                    component={LoginScreen}
                />

                <Stack.Screen
                    options={{
                        animation: 'fade'
                    }}
                    name="UserBottomTab"
                    component={AnimatedTabs}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
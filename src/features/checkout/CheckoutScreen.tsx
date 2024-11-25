import { View, Text, StyleSheet, Platform, ScrollView, Image, SafeAreaView } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@states/reduxHook'
import { clearRestaurantCart, selectRestaurantCart } from '@states/reducers/cartSlice'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import { goBack, replace } from '@utils/NavigationUtils'
import { Colors } from '@unistyles/Constants'
import CheckoutHeader from '@components/checkout/CheckoutHeader'
import OrderList from '@components/checkout/OrderList'
import CustomText from '@components/global/CustomText'
import Icon from '@components/global/Icon'
import { RFValue } from 'react-native-responsive-fontsize'
import BillDetails from '@components/checkout/BillDetails'
import ArrowButton from '@components/checkout/ArrowButton'

const CheckoutScreen: FC = () => {

    const route = useRoute() as any
    const restaurant = route?.params?.item
    const cart = useAppSelector(selectRestaurantCart(restaurant?.id))
    const totalItemPrice = cart?.reduce((total, item) => total + (item.cartPrice || 0), 0) || 0
    const totalItems = cart?.reduce((total, item) => total + (item.quantity || 0), 0) || 0
    const insets = useSafeAreaInsets()

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!cart || cart?.length === 0) {
            goBack();
        }
    }, [cart])

    const handlePressOrder = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            replace('OrderSuccessScreen', { restaurant: restaurant })
        }, 2000);
    }

    return (
        <View style={style.container}>
            <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />
            <CheckoutHeader title={restaurant?.name} />

            <ScrollView contentContainerStyle={style.scrollContainer}>
                <OrderList cartItems={cart} restaurant={restaurant} totalItems={totalItems} />

                <View style={style.flexRowBetween}>
                    <View style={style.flexRow}>
                        <Image source={require('@assets/icons/coupon.png')} style={{ width: 25, height: 25, borderRadius: 15 }} />
                        <CustomText variant='h6' fontFamily='Okra-Medium'>View all restaurant coupan</CustomText>
                    </View>
                    <Icon iconFamily='MaterialCommunityIcons' name='chevron-right' size={RFValue(16)} />
                </View>

                <BillDetails totalItemPrice={totalItemPrice} />
            </ScrollView>

            <View style={style.paymentGateway}>
                <View style={{ width: '30%' }}>
                    <CustomText fontSize={RFValue(6)} fontFamily='Okra-Medium'>💵 PAY USING CASH</CustomText>
                    <CustomText fontSize={RFValue(10)} style={{ marginTop: 2 }} fontFamily='Okra-Medium'>⚡️ Delivery</CustomText>
                </View>
                <View style={{ width: '70%' }}>
                    <ArrowButton
                        loading={loading}
                        price={totalItemPrice}
                        title="Place Order"
                        onPress={handlePressOrder}
                    />
                </View>
            </View>
            <SafeAreaView />

        </View>
    )
}

const style = StyleSheet.create({
    cancelText: {
        marginTop: 4,
        opacity: 0.6
    },
    paymentGateway: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'white',
        paddingLeft: 14,
        paddingTop: 10,
        position: 'absolute',
        bottom: 0,
        paddingBottom: Platform.OS === 'ios' ? 25 : 5,
        shadowOffset:{width:1, height:1},
        shadowOpacity:0.3,
        elevation:5,
        shadowRadius:5,
        shadowColor: Colors.lightText,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollContainer: {
        padding: 10,
        backgroundColor: Colors.background_light
    },
    flexRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    flexRowBetween: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15
    }
})

export default CheckoutScreen
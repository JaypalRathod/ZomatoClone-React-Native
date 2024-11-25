import { View, Text, ScrollView } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useAppSelector } from '@states/reduxHook'
import { selectRestaurantCartItem } from '@states/reducers/cartSlice'
import { modelStyles } from '@unistyles/modelStyles'
import { useStyles } from 'react-native-unistyles'
import CustomText from '@components/global/CustomText'
import MiniFoodCard from '@components/restaurant/MiniFoodCard'

const RemoveItemModal: FC<{ item: any, restaurant: any, closeModal: () => void }> = ({ item, restaurant, closeModal }) => {

    const cartItem = useAppSelector(selectRestaurantCartItem(restaurant?.id, item?.id))
    const { styles } = useStyles(modelStyles);

    useEffect(() => {
        if (!cartItem) {
            closeModal();
        }
    }, [cartItem])

    return (
        <View>
            <View style={styles.noShadowHeaderContainer}>
                <View style={styles.flexRowGap}>
                    <CustomText fontFamily='Okra-Black' fontSize={13}>customization for {item?.name}</CustomText>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainerWhiteBackground}>
                {cartItem?.customizations?.map((cus, index) => {
                    return (
                        <MiniFoodCard item={item} cus={cus} key={cus?.id} restaurant={restaurant} />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default RemoveItemModal
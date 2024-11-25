import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC, memo, useCallback } from 'react'
import { useAppDispatch } from '@states/reduxHook'
import { useStyles } from 'react-native-unistyles';
import { modelStyles } from '@unistyles/modelStyles';
import { addItemToCart, removeItemFromCart } from '@states/reducers/cartSlice';
import CustomText from '@components/global/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@unistyles/Constants';
import Icon from '@components/global/Icon';
import AnimatedNumber from 'react-native-animated-numbers';

const NonCustomizableCart: FC<{ item: any, restaurant: any }> = ({ item, restaurant }) => {

    const dispatch = useAppDispatch();
    const { styles } = useStyles(modelStyles);

    const addCartHandler = useCallback(() => {
        dispatch(addItemToCart({ restaurant: restaurant, item: { ...item, customizations: [] } }))
    }, [dispatch, restaurant?.id, item])

    const removeCartHandler = useCallback(() => {
        dispatch(removeItemFromCart({ restaurant_id: restaurant?.id, itemId: item.id }))
    }, [dispatch, restaurant?.id, item])

    return (
        <View style={styles.flexRowItemBaseline}>
            <View style={styles.flexRowGapBaseline}>
                <Image
                    style={styles.vegIcon}
                    source={item?.isVeg ? require('@assets/icons/veg.png') : require('@assets/icons/non_veg.png')}
                />

                <View>
                    <CustomText fontFamily='Okra-Bold'>{item?.name}</CustomText>
                    <CustomText fontFamily='Okra-Medium'>₹{item?.price}</CustomText>
                </View>
            </View>

            <View style={styles.cartOperationContainer}>
                <View style={styles.miniAddButtonContainer}>
                    <TouchableOpacity onPress={removeCartHandler}>
                        <Icon iconFamily='MaterialCommunityIcons' name='minus-thick' size={RFValue(10)} color={Colors.active} />
                    </TouchableOpacity>
                    <AnimatedNumber
                        includeComma={false}
                        animationDuration={300}
                        fontStyle={styles.miniAnimatedCount}
                        animateToNumber={item?.quantity}
                    />
                    <TouchableOpacity onPress={addCartHandler}>
                        <Icon iconFamily='MaterialCommunityIcons' name='plus-thick' size={RFValue(10)} color={Colors.active} />
                    </TouchableOpacity>
                </View>
                <CustomText fontFamily='Okra-Medium'>₹{item?.cartPrice}</CustomText>
            </View>
        </View>
    )
}

export default memo(NonCustomizableCart)
import { View, TouchableOpacity } from 'react-native'
import React, { FC, memo, useCallback, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@states/reduxHook'
import { useStyles } from 'react-native-unistyles'
import { foodStyles } from '@unistyles/foodStyles'
import { addItemToCart, removeCustomizableItem, removeItemFromCart, selectRestaurantCartItem } from '@states/reducers/cartSlice'
import CustomText from '@components/global/CustomText'
import { Colors } from '@unistyles/Constants'
import ScalePress from '@components/ui/ScalePress'
import Icon from '@components/global/Icon'
import { RFValue } from 'react-native-responsive-fontsize'
import AnimatedNumber from 'react-native-animated-numbers';
import CustomModal from '@components/modal/CustomModal'
import AddItemModal from '@components/modal/AddItemModal'
import ReapetItemModal from '@components/modal/ReapetItemModal'
import RemoveItemModal from '@components/modal/RemoveItemModal'

const AddButton: FC<{ item: any, restaurant: any }> = ({ item, restaurant }) => {
    const dispatch = useAppDispatch()
    const { styles } = useStyles(foodStyles);
    const cart = useAppSelector(selectRestaurantCartItem(restaurant?.id, item?.id))
    const modelRef = useRef<any>(null)

    const openReapetModal = () => {
        modelRef?.current?.openModal(
            <ReapetItemModal
                item={item}
                onOpenAddModal={() => {
                    openAddModal();
                }}
                closeModal={() => modelRef?.current?.closeModal()}
                restaurant={restaurant}
            />
        )
    }

    const openAddModal = () => {
        modelRef?.current?.openModal(
            <AddItemModal
                item={item}
                onClose={() => modelRef?.current?.closeModal()}
                restaurant={restaurant}
            />
        )
    }

    const openRemoveModal = () => {
        modelRef?.current?.openModal(
            <RemoveItemModal
                item={item}
                closeModal={() => modelRef?.current?.closeModal()}
                restaurant={restaurant}
            />
        )
    }


    const addCartHandler = useCallback(() => {
        if (item?.isCustomizable) {
            if (cart !== null) {
                openReapetModal()
                return
            }
            openAddModal()
        } else {
            dispatch(addItemToCart({ restaurant: restaurant, item: { ...item, customisation: [] } }))
        }
    }, [dispatch, item, restaurant, cart])


    const removeCartHandler = useCallback(() => {
        if (item?.isCustomizable) {
            if (cart?.customizations && cart?.customizations?.length > 1) {
                openRemoveModal()
                return
            }
            dispatch(removeCustomizableItem({
                restaurant_id: restaurant?.id,
                customizationId: cart?.customizations![0]?.id,
                itemId: item?.id
            }))
        } else {
            dispatch(removeItemFromCart({ restaurant_id: restaurant?.id, itemId: item?.id }))
        }
    }, [dispatch, item, restaurant, cart])


    return (
        <>
            <CustomModal ref={modelRef} />
            <View style={styles.addButtonContainer(cart !== null)}>

                {cart ? (
                    <View style={styles.selectedContainer}>
                        <ScalePress onPress={removeCartHandler} >
                            <Icon iconFamily='MaterialCommunityIcons' size={RFValue(13)} color='#fff' name='minus-thick' />
                        </ScalePress>
                        <AnimatedNumber
                            includeComma={false}
                            animationDuration={300}
                            animateToNumber={cart?.quantity}
                            fontStyle={styles.animatedCount}
                        />
                        <ScalePress onPress={addCartHandler}>
                            <Icon iconFamily='MaterialCommunityIcons' size={RFValue(13)} color='#fff' name='plus-thick' />
                        </ScalePress>
                    </View>
                ) : (
                    <TouchableOpacity onPress={addCartHandler} activeOpacity={0.6} style={styles.noSelectionContainer} accessibilityLabel='Add item to cart'>
                        <CustomText fontFamily='Okra-Bold' variant='h5' color={Colors.primary}>ADD</CustomText>
                        <CustomText style={styles.plusSmallIcon} variant='h5' color={Colors.primary}>+</CustomText>
                    </TouchableOpacity>
                )}


            </View>

            {item?.isCustomizable && (
                <CustomText fontFamily='Okra-Medium' style={styles.customizeText} >
                    Customisable
                </CustomText>
            )}
        </>
    )
}

export default memo(AddButton)
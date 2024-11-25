import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { screenHeight } from '@unistyles/Constants'
import Icon from '@components/global/Icon'
import { BlurView } from '@react-native-community/blur'

const CustomModal = forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false)
    const [content, setContent] = useState(null)

    useImperativeHandle(ref, () => ({
        openModal: (data: any) => {
            setContent(data)
            setVisible(true)
        },
        closeModal: () => {
            setVisible(false)
        }
    }))

    return (
        <Modal
            transparent
            visible={visible}
            animationType='slide'
            onRequestClose={() => setVisible(false)}
        >
            {Platform.OS === 'ios' && (
                <BlurView style={styles.absolute} blurType='light' blurAmount={10} />
            )}
            <View style={styles.modelContainer}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={() => { setVisible(false) }}
                        
                    >
                        <Icon iconFamily='Ionicons' name='close' size={24} color='#fff' />
                    </TouchableOpacity>
                    {content ? (
                        <View style={styles.modelContent}>
                            {content}
                        </View>
                    ) : (
                        <Text style={styles.placeholderText}>No Content Provided</Text>
                    )
                    }
                </View>
            </View>
        </Modal>
    )
})

const styles = StyleSheet.create({
    modelContent: {
        width: '100%',
        maxHeight: screenHeight * 0.7,
        minHeight: 150,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    modelContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        filter: Platform.OS === 'android' ? [{ blur: 4 }] : undefined,
    },
    contentContainer: {
        width: '100%',
        maxHeight: screenHeight * 0.7,
        minHeight: 150,
        borderRadius: 10,
    },
    closeIcon: {
        position: 'absolute',
        top: -60,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 200,
        padding: 10,
        zIndex: 1,
    },
    placeholderText: {
        textAlign: 'center',
        color: '#666',
        fontFamily: 'Okra-Medium',
    },
    absolute: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    }
})

export default CustomModal
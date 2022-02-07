import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

// app constants
import colors from '../constants/colors'

export default function MainButton(props) {
    return (
        <TouchableOpacity activeOpacity={ 0.5 } onPress={ props.onPress}>
            <View style={ styles.button }>
                <Text style={ styles.buttonText }>{ props.children }</Text>
            </View>
        </TouchableOpacity>
    )
}

// styles
const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'source-sans-pro-semibold',
        fontSize: 18,
    }
})
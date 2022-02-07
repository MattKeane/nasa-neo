import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

// app constants
import colors from '../constants/colors'

export default function Header(props) {
return (
        <View style={ styles.header } >
            <Text style={ styles.title }>{ props.title }</Text>
        </View>
    )
}

// styles
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'nasalization',
    },
})
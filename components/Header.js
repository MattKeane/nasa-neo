import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

export default function Header(props) {
    return (
        <View style={ styles.header } >
            <Text style={ styles.title }>{ props.title }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: '#0B3D91',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 18
    },
})
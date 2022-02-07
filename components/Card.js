import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

// props destructured
export default function Card({ nearEarthObject }) {
    // destructure name from nearEarthObject
    const { name } = nearEarthObject

    // Consider formatting large numbers to include commas

    // Object minimum diameter
    const minDiameter = 
        nearEarthObject
            .estimated_diameter
            .feet
            .estimated_diameter_min
            .toFixed(2)

    // Object maximum diameter
    const maxDiameter =
        nearEarthObject
            .estimated_diameter
            .feet
            .estimated_diameter_max
            .toFixed(2)

    // Object miss distance
    const missDistance =
        parseInt(
            nearEarthObject
                .close_approach_data[0]
                .miss_distance
                .miles
        )


    // Object speed
    const speed =
        parseInt(
            nearEarthObject
                .close_approach_data[0]
                .relative_velocity
                .miles_per_hour
        )

    // Is this object dangerous
    const dangerous = nearEarthObject.is_potentially_hazardous_asteroid       

    return (
        <View style={ styles.card }>
            <Text style={ styles.headerText }>{ name }</Text>
            <View style={ styles.bodyField}>
                <Text style={ styles.bodyLabel }>Diameter:</Text> 
                <Text style={ styles.bodyText }>{ minDiameter }–{ maxDiameter } ft.</Text>
            </View>
            <View style={ styles.bodyField}>
                <Text style={ styles.bodyLabel }>Miss Distance:</Text> 
                <Text style={ styles.bodyText }>{ missDistance } mi.</Text>
            </View>
            <View style={ styles.bodyField }>
                <Text style={ styles.bodyLabel }>Speed:</Text>
                <Text style={ styles.bodyText }>{ speed } MPH</Text>
            </View>
            {
                dangerous
                ?
                <Text style={ styles.dangerousText }>This object is potentially dangerous.</Text>
                :
                <Text style={ styles.dangerousText }>This object is not potentially dangerous.</Text>
            }
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5,
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
        width: 275,
    },
    bodyText: {
        fontFamily: 'source-sans-pro-regular',
        fontSize: 15,
    },
    headerText: {
        fontFamily: 'source-sans-pro-semibold',
        fontSize: 18,
        marginBottom: 5,
    },
    bodyField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bodyLabel: {
        fontFamily: 'source-sans-pro-semibold',
        fontSize: 15,
    },
    dangerousText: {
        fontFamily: 'source-sans-pro-regular',
        fontSize: 15,
        marginTop: 5,
    }
})
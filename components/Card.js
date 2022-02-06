import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

export default function Card({ nearEarthObject }) {
    const { name } = nearEarthObject

    const minDiameter = 
        nearEarthObject
            .estimated_diameter
            .feet
            .estimated_diameter_min
            .toFixed(2)

    const maxDiameter =
        nearEarthObject
            .estimated_diameter
            .feet
            .estimated_diameter_max
            .toFixed(2)

    const missDistance =
        parseInt(
            nearEarthObject
                .close_approach_data[0]
                .miss_distance
                .miles
        )

    const speed =
        parseInt(
            nearEarthObject
                .close_approach_data[0]
                .relative_velocity
                .miles_per_hour
        )

    const dangerous = nearEarthObject.is_potentially_hazardous_asteroid       

    return (
        <View style={ styles.card }>
            <Text style={ styles.headerText }>{ name }</Text>
            <Text style={ styles.bodyText }>Diameter: { minDiameter }–{ maxDiameter} ft.</Text>
            <Text style={ styles.bodyText }>Miss Distance: { missDistance } mi.</Text>
            <Text style={ styles.bodyText }>Speed: { speed } MPH</Text>
            {
                dangerous
                ?
                <Text style={ styles.bodyText }>This object is potentially dangerous.</Text>
                :
                <Text style={ styles.bodyText }>This object is not potentially dangerous.</Text>
            }
        </View>
    )
}

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
    },
    bodyText: {
        fontFamily: 'source-sans-pro-regular',
    },
    headerText: {
        fontFamily: 'source-sans-pro-semibold',
    }
})
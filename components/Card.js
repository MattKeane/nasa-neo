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
            <Text>{ name }</Text>
            <Text>Diameter: { minDiameter }–{ maxDiameter} ft.</Text>
            <Text>Miss Distance: { missDistance } mi.</Text>
            <Text>Speed: { speed } MPH</Text>
            {
                dangerous
                ?
                <Text>This object is potentially dangerous.</Text>
                :
                <Text>This object is not potentially dangerous.</Text>
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
    }
})
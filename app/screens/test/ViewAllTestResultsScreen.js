import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    TouchableOpacity
} from 'react-native';
var moment = require('moment');
import { getAllTestsOfAPatient } from '../../actions/testAction';

import { useSelector, useDispatch } from 'react-redux';

export const ViewAllTestResultsScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    // dont touch code below this
    // useSelector(state => console.log('STATE guru', JSON.stringify(state)));
    const { tests } = useSelector(state => state.test);

    const { patient } = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(getAllTestsOfAPatient(patient._id));
    }, []);

    //dont touch code above this.
     
    // local functional fragment isolated to refactor the code.
    function ItemFragment(test) {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    navigation.push('viewATestResultScreen', { testId: test.item._id });
                }}>
                <Text style={styles.itemTitle}>{test.item.risk}</Text>
                <Text style={styles.itemDate}>{moment(test.item.createdAt).format('MMM-DD-YYYY')}</Text>
            </TouchableOpacity>
        );
    }
    function AlternateFragment() {
        return (
            <>
                <Text style={styles.item}>No Tests Found</Text>
                <View style={styles.inputBox}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('addATestResultScreen', { patientId: route.params.patientId })}>
                        <Text style={styles.button}>Add a test result</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
    return (
        <View style={styles.body}>
            {tests && tests.length > 0 ?
                <FlatList
                    // contentContainerStyle
                    data={tests}
                    renderItem={({ item }) => (
                        item ? <ItemFragment item={item} /> : ''
                    )}
                />
                : (
                    <AlternateFragment />
                )}
            {/* <MyTabs /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#2a2a2a02',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: 25,
    },
    item: {
        margin: 5,
        autoCapitalize: true,
        backgroundColor: '#00000012',
        padding: 12,
    },
    itemDate: {
        fontSize: 12,
        textAlign: 'left',
    },
    itemTitle: {
        fontSize: 16,
        color: 'green',
        textAlign: 'left',
    },
    button: {
        marginTop: 190,
        padding: 10,
        fontSize: 24,
        backgroundColor: 'grey',
        color: 'white',
        textAlign: 'center',
    },
});


export default ViewAllTestResultsScreen;

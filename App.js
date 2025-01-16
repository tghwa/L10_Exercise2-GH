import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

let originalData = [];

const App = () => {
    const [myData, setMyData] = useState([]);

    // Fetch data
    useEffect(() => {
        fetch("https://mysafeinfo.com/api/data?list=countries&format=json&case=default")
            .then((response) => response.json())
            .then((myJson) => {
                if (originalData.length < 1) {
                    setMyData(myJson);
                    originalData = myJson;
                }
            });
    }, []);

    // Filter function
    const FilterData = (text) => {
        if (text !== '') {
            const searchText = text.toLowerCase();
            const myFilteredData = originalData.filter((item) =>
                item.CountryName.toLowerCase().includes(searchText) ||
                item.CountryAlpha2.toLowerCase().includes(searchText) ||
                item.CountryAlpha3.toLowerCase().includes(searchText) ||
                item.CurrencyCode.toLowerCase().includes(searchText) ||
                item.PhoneCode.toLowerCase().includes(searchText)
            );
            setMyData(myFilteredData);
        } else {
            setMyData(originalData);
        }
    };

    // Render each country as a card
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.countryName}>{item.CountryName}</Text>
            <View style={styles.row}>
                <Text style={styles.info}>Alpha-2 Code: {item.CountryAlpha2}</Text>
                <Text style={styles.info}>Alpha-3 Code: {item.CountryAlpha3}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.info}>Currency Code: {item.CurrencyCode}</Text>
                <Text style={styles.info}>Phone Code: {item.PhoneCode}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.title}>Search for Countries:</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Type to filter..."
                onChangeText={(text) => FilterData(text)}
            />
            <FlatList data={myData} renderItem={renderItem} keyExtractor={(item) => item.CountryAlpha2} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: 'darkblue',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: 'white',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        borderLeftWidth: 5,
        borderLeftColor: 'blue',
    },
    countryName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'darkblue',
        marginBottom: 8,
    },
    info: {
        fontSize: 14,
        color: 'grey',
        marginBottom: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
});

export default App;

import React from 'react';
import styles from './CountryList.module.css'
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

function CountryList() {
    const {isLoading, cities} = useCities();
    if (isLoading) return <Spinner/>
    if (cities.length === 0) return <Message message={'Add your first contry by clicking on it on the map '}/>
    const countries = cities.reduce((arr, city) => {
        if(!arr.map(el => el.city).includes(city.country)) return [...arr, {country:city.country, emoji: city.emoji}]
        else return arr;
    }, [])
    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CountryItem key={country.id} country={country}/>)}
        </ul>
    );


}

export default CountryList;
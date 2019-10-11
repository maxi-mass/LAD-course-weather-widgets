import React from 'react';
import styles from "./Widget.module.css";
import {useEffect, useState} from "react";
import * as axios from "axios";

const Widget = props => {
    const[temp, setTemp] = useState(props.data.main.temp);
    const[humidity, setHumidity] = useState(props.data.main.humidity);
    const[windSpeed, setWindSpeed] = useState(props.data.wind.speed);
    const[intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        let intervalId = setInterval(() => {
            let apiUrl = props.getApiUrl(props.data.name);
            axios.get(apiUrl).then(response => {
                let data = response.data;
                setTemp(data.main.temp);
                setHumidity(data.main.humidity);
                setWindSpeed(data.wind.speed);
            });
        }, 5000);
        setIntervalId(intervalId);
    }, [props.data]);

    return (
        <div className={styles.widgetWrapper}>
            <p><span>Город: </span>{props.data.name}</p>
            <p><span>Температура: </span>{temp}</p>
            <p><span>Влажность: </span>{humidity}</p>
            <p><span>Скорость ветра(м/c): </span>{windSpeed}</p>

            <div
                onClick={() => {
                    clearInterval(intervalId);
                    props.closeWidget(props.data.name)
                }}
                className={styles.deleteWidget}>Закрыть
            </div>
        </div>
    );
};

export default Widget;
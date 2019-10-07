import React from 'react';
import * as axios from "axios";
import Widget from "./Widget";
import {useState, useEffect} from "react";
import "./App.css";

const App = () => {
    const[widgets, setWidgets] = useState([]);
    const serCityRef = React.createRef();

    const closeWidget = cityId => {
        let filteredWidgets = widgets.filter(wData => wData.name !== cityId);
        setWidgets(filteredWidgets);
    };

    const getData = (event) => {
        let requestCity = serCityRef.current.value;
        serCityRef.current.value = "";

        let apiUrl = 'http://openweathermap.org/data/2.5/weather?q=' + requestCity + '&appid=b6907d289e10d714a6e88b30761fae22';

        axios.get(apiUrl).then(response => {
            if (widgets && !widgets.some(wData => wData.name === response.data.name)) {
                let updatedWidgets = [...widgets];
                updatedWidgets.push(response.data);
                setWidgets(updatedWidgets);
            }
        });
    };

    return (
        <div className={'wrapper'}>
            <p><input ref={serCityRef} type="text"/><button onClick={getData}>+</button></p>
            {widgets.map(data => <Widget
                key={data.name}
                setWidgets={setWidgets}
                cityId={data.name}
                data={data}
                closeWidget={closeWidget}
            />)}
        </div>
    );
};

export default App;

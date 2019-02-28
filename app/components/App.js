import React from 'react';
import Paper from 'material-ui/Paper';
import Grafica from './Grafica';
import DropDown from './DropDown';
import YearSlider from './YearSlider';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import CustomToolTip from './CustomToolTip';
import MunicipioCheckList from './MunicipioCheckList';
import Municipios from './municipios';
import css from '../styles.css';
import StopButton from './StopButton';
import { isNumber } from 'util';
import PlayArrow from 'material-ui/svg-icons/AV/play-arrow';
import Pause from 'material-ui/svg-icons/AV/pause';
import SvgIcon from 'material-ui/SvgIcon';
import { blue500 } from 'material-ui/styles/colors';
import TimeSlider from './TimeSlider';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerToggle: true,
            "data": {
                records: [],
                fields: []
            },
            "selectedX": "Mediana de ingreso",
            "selectedY": "Población",
            "selectedZ": 1960,
            "selectedMunicipios": Municipios.map(val => { return { id: val, color: '', checked: true } }),
            "timer": 3000
        };
        this.handleChangeX = this.handleChangeX.bind(this);
        this.handleChangeY = this.handleChangeY.bind(this);
        this.handleChangeZ = this.handleChangeZ.bind(this);
        this.handleMunicipios = this.handleMunicipios.bind(this);
        this.filterDataYear = this.filterDataYear.bind(this);
        this.filterDataMunicipio = this.filterDataMunicipio.bind(this);
        this.tick = this.tick.bind(this);
        this.generateRandomColor = this.generateRandomColor.bind(this);
        this.handleStopButton = this.handleStopButton.bind(this);
        this.handleTime = this.handleTime.bind(this);
    }

    componentDidMount() {
        fetch('https://datos.estadisticas.pr/api/action/datastore_search?resource_id=5c2c6c25-d916-4daa-a6ee-b1b390d4d471&limit=1000')
            .then(result => {
                return result.json();
            }).then(data => {
                // console.log(data);
                for (var i = 0; i < data.result.fields.length; i++) {
                    if (data.result.fields[i].type == 'numeric') {
                        var list = data.result.records.map(row => row[data.result.fields[i].id]).filter(val => val != null);
                        let max = Math.max.apply(Math, list)
                        data.result.fields[i].max = parseInt(max);
                    }
                }
                this.state.selectedMunicipios.forEach(element => {
                    let randomColor = this.generateRandomColor();
                    element.color = randomColor;
                    data.result.records.forEach(row => {
                        if (row.Municipio == element.id)
                            row.Color = randomColor;
                    });
                });
                this.setState({ data: data.result });
                this.timerID = setInterval(
                    () => this.tick(),
                    this.state.timer
                );
            })
    }

    componentWillMount() {
        clearInterval(this.timerID);
    }

    generateRandomColor() {
        var letters = '123456789ABCD';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 13)];
        }
        return color;
    }

    tick() {
        // Ver si el timer cambio. Si cambio, clearInterval. 
        // Then register new interval
        if (this.state.selectedZ == 2000) {
            this.setState({ selectedZ: 1960 })
        }
        else {
            this.setState({ selectedZ: this.state.selectedZ += 10 });
        }
    }

    handleChangeX(event, index, value) {
        // console.log(index);
        this.setState({ selectedX: value });
    }

    handleChangeY(event, index, value) {
        // console.log(value);
        this.setState({ selectedY: value });
    }

    handleChangeZ(event, value) {
        this.setState({ selectedZ: value });
    }

    handleTime(event, value) {
        this.state.timer
        clearInterval(this.timerID);
        this.timerID = setInterval(
            () => this.tick(),
            this.state.timer
        );
        this.setState({ timer: value * 1000 });
    }

    handleStopButton() {
        if (this.state.timerToggle)
            clearInterval(this.timerID);
        else {
            this.timerID = setInterval(
                () => this.tick(),
                this.state.timer
            );
        }
        this.setState({ timerToggle: !this.state.timerToggle });
    }

    handleMunicipios(value, index) { // Arreglo de municipios seleccionados
        // console.log(value);
        let newMuns = this.state.selectedMunicipios;
        newMuns[index].checked = value;
        this.setState({ selectedMunicipios: newMuns });
    }

    filterDataYear() {
        return this.state.data.records.filter(record => record["Año"] == this.state.selectedZ);
    }

    filterDataMunicipio(municipioRecords) {
        municipioRecords.forEach(record => {
            var val = this.state.selectedMunicipios.find(val => val.id == record["Municipio"])
            record.checked = (val == null ? false : val.checked)
        });
        return this.filterEmptyData(municipioRecords);
    }

    filterEmptyData(data) {
        //Filtro data
        for (var i = 0; i < data.length; i++) {
            if (data[i][this.state.selectedX] == null) {
                data[i][this.state.selectedX] = 0
            }
            if (data[i][this.state.selectedY] == null) {
                data[i][this.state.selectedY] = 0
            }
        }
        return data;
    }



    render() {
        // console.log(this.state.data.records);
        let iconStyles = {
            height: '30px',
            width: '30px'
        };
        let icon = !this.state.timerToggle ?
            (<PlayArrow onClick={this.handleStopButton} hoverColor={blue500} style={iconStyles} />) :
            (<Pause onClick={this.handleStopButton} hoverColor={blue500} style={iconStyles} />);
        return (
            <Paper zDepth={1}>
                <div className={"flex-container"}>
                    <div className={"drop-down"}>
                        <DropDown
                            className={"drop-down"}
                            fields={this.state.data.fields}
                            onChange={this.handleChangeX}
                            selected={this.state.selectedX}
                        />
                    </div>
                    <div className={"drop-down"}>
                        <DropDown
                            fields={this.state.data.fields}
                            onChange={this.handleChangeY}
                            selected={this.state.selectedY}
                        />
                    </div>
                </div>

                <div className={"flex-container"}>
                    <div className={"graph-container"}>
                        <Grafica
                            data={this.filterDataMunicipio(this.filterDataYear())}
                            fields={this.state.data.fields}
                            selectedX={this.state.selectedX}
                            selectedY={this.state.selectedY}
                            selectedZ={this.state.selectedZ}
                            time={this.state.timer}
                        />
                    </div>
                    <div className={"right-container"}>
                        <div className={"checklist-container"}>
                            <MunicipioCheckList className={""}
                                municipios={this.state.selectedMunicipios}
                                onChange={this.handleMunicipios}
                            />
                        </div>
                        <div className={"play-container"}>
                            <div className={"button-container"}>
                                {icon}
                            </div>
                            <div className={"year-slider"}>
                                <YearSlider
                                    value={this.state.selectedZ}
                                    handleFirst={this.handleChangeZ}
                                />
                            </div>
                        </div>
                        <div className={'time-container'}>
                            <TimeSlider
                                value={this.state.timer}
                                onChange={this.handleTime}
                            />
                        </div>
                    </div>
                </div>
            </Paper>
        )
    }
}

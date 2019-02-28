import React from 'react';
import { Label, ScatterChart, ResponsiveContainer, XAxis, YAxis, ZAxis, CartesianGrid, Scatter, Tooltip, Legend, Cell } from 'recharts';
import FlatButton from 'material-ui/FlatButton';
import {blue100, grey700} from 'material-ui/styles/colors';
import CustomToolTip from './CustomToolTip';

export default class Grafica extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.fields)
    // console.log(this.props.data);
    let X_Max = this.props.data.length > 0 ? this.props.fields.find(val => val.id == this.props.selectedX).max : 0; 
    let Y_Max = this.props.data.length > 0 ? this.props.fields.find( val => val.id == this.props.selectedY).max : 0;
    return (
      <ResponsiveContainer width={'100%'} height="100%">
        <ScatterChart width={100} height={250}
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey={this.props.selectedX}
            domain={[0, parseInt(X_Max * 1.1)]}>
            <Label dy={15} dx={0} value={this.props.selectedX} />
          </XAxis>
          <YAxis
              dataKey={this.props.selectedY} 
              domain={[0, parseInt(Y_Max * 1.1)]}
              label={{ value: this.props.selectedY, angle: -90, position: 'insideLeft' }} 
              dy={100}
            >
            {/* <Label dy={-305} dx={30} value={this.props.selectedY} position='left'/> */}
          </YAxis>
          <ZAxis
            dataKey={this.props.selectedZ}
            range={[64, 144]}
          />
          <Tooltip 
            wrapperStyle={{background: '#21212155', padding: '5px'}}
            cursor={{ strokeDasharray: '3 3' }}
            content={<CustomToolTip
                    año={this.props.selectedZ}
            />}
          />
          <Legend verticalAlign="top" height={36}/>
          <Scatter animationDuration={this.props.time-500} animationEasing={'linear'} 
            name="Municipio, Año y Variable Seleccionada"
            data={this.props.data}
            fill="#8884d8" >
            {
              this.props.data.map((entry, index) => {
                return <Cell key={`cell-${index}`} className={!entry.checked ? 'hide': '' } fill={entry.Color}  />
              })
            }
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    )
  }
}

import React, { Component } from 'react';
import Slider from 'material-ui/Slider';

export default class YearSlider extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{display:'flex', flexDirection:'row'}} >
                <Slider style={{width: '150px', margin:'5px'}} sliderStyle={{margin: 'auto'}}
                    value={this.props.value} 
                    min={1960}
                    max={2000}
                    step={10}
                    onChange={this.props.handleFirst} />
                    
                    <div style={{alignSelf:'center'}}>{this.props.value}</div>
            </div>
        );
    }
}
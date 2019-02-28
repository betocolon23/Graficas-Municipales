import React from 'react';
import Slider from 'material-ui/Slider';

export default class TimeSlider extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{display:'flex', flexDirection:'row'}} >
                <Slider style={{width: '200px', margin:'5px'}} sliderStyle={{margin: 'auto'}}
                    value={this.props.value/1000} 
                    min={1} max={5} step={.25}
                    onChange={this.props.onChange}
                    />
                    
                    <div style={{alignSelf:'center'}}>{this.props.value/1000}</div>
            </div>
        );
    }
}

// {this.props.value}
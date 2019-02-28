import React from 'react';
import Checkbox from 'material-ui/Checkbox';

export default class MunicipiosComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, isInputChecked) {
        this.props.onChange(isInputChecked, this.props.index)
    }

    render() {
        return (
            <Checkbox 
                label={this.props.municipio.id} 
                onCheck={this.handleChange} 
                name={this.props.municipio.id} 
                labelPosition="right"
                checked={this.props.municipio.checked} 
                iconStyle={{fill: this.props.municipio.color}}
                inputStyle={{color: this.props.municipio.color}}
            />
        )
    }
}
import React from 'react';
import PropTypes from 'prop-types';

class CustomToolTip extends React.Component {
    constructor(props, context) {
        super(props);
    }

    render() {
        //console.log("Payload:");
        //console.log(this.props.payload[0].payload['Municipio']);
        let municipio = '';
        if (this.props.payload[0] !== undefined) {
            municipio = this.props.payload[0].payload['Municipio'];

            return (
                <div>
                    <p>Municipio: {municipio}</p>
                    <p>Año: {this.props.año}</p>
                    <p>{this.props.payload[0].name}: {this.props.payload[0].value}</p>
                    <p>{this.props.payload[1].name}: {this.props.payload[1].value}</p>
                </div>
            )
            
        } else return (<div/>)
    }
}

export default CustomToolTip;
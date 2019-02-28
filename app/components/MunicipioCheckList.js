import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import MunicipiosComp from './MunicipiosComp';

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

export default class MunicipioCheckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // inicializado con todos los municipios
            municipios: this.props.municipios
        };
        this.getMunicipios = this.getMunicipios.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getMunicipios() {
        return this.props.municipios.map((municipio, index) => (
            <MunicipiosComp
                municipio={municipio}
                key={index}
                index={index}
                onChange={this.handleChange}
            />
        ));
    }

    handleChange(value, index) {
        this.props.onChange(value, index);
    }

    render() {
        return (
            <div style={styles.block}>
                {this.getMunicipios()}
            </div>
        );
    }
}


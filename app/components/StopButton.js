import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import {red500, yellow500, blue500, greenA200} from 'material-ui/styles/colors';
import PlayArrow from 'material-ui/svg-icons/AV/play-arrow';
import Pause from 'material-ui/svg-icons/AV/pause';
import Toggle from 'material-ui/Toggle';

const iconStyles = {
    marginRight: 24,
  };
  
  const styles = {
    block: {
      maxWidth: 250,
    },
    toggle: {
      marginBottom: 16,
    }
  };

export default class StopButton extends React.Component {
    constructor(props) {
        super(props);
        this.stopTimerFunction = this.stopTimerFunction.bind(this);
    }
    
    stopTimerFunction() {
        this.props.handleStop()
    }

    render() {
        return (
            <div className={"material-icon"}>
                <PlayArrow 
                    style={styles.toggle}
                    onClick={this.stopTimerFunction}
                />
            </div>    
        )
    }
}
import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
    this.menuItems = this.menuItems.bind(this);
  }

  menuItems(fields) {
    return fields.map((field) => (
      <MenuItem key={field.id} value={field.id} primaryText={field.id} />
    ));
  }


  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="Select Field"
          onChange={this.props.onChange}
          value={this.props.selected}
        >
        {this.menuItems(this.props.fields)}
        </SelectField>
      </div>
    );
  }
}

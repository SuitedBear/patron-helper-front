import React from 'react';
import { DropDownField, BoolField, TextField, NumberField }
  from './formFieldTypes';

const statuses = ['done', 'for shipment', 'in progress', 'new'];
const typesFallback = new Map([
  ['user', TextField],
  ['active', BoolField],
  ['value', NumberField],
  ['status', DropDownField]
]);

class EditRow extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      formData: { ...props.dataPoint }
    };
    this.types = (props.types || typesFallback);

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler (e) {
    console.log(`id:${e.target.id} val:${e.target.value}`);
    const newFormData = this.state.formData;
    newFormData[e.target.id] = e.target.value;
    this.setState({ formData: newFormData });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.onHandleEdit(this.state.formData);
  }

  render () {
    const formFields = Object.entries(this.state.formData).map(entry => {
      const Ele = this.types.get(entry[0]);
      if (Ele) {
        return (
          <Ele
            key={entry[0]}
            entry={entry}
            optionList={this.props.options || statuses}
            handleChange={this.changeHandler}
          />
        );
      } else {
        return (
          <div
            className='data-cell'
            key={entry[0]}
          >
            {entry[1]}
          </div>
        );
      }
    });

    return (
      <form onSubmit={(e) => this.handleSubmit(e)} className='data-row'>
        {formFields}
        <input type='submit' value='Save' className='data-cell' />
      </form>
    );
  }
}

export { EditRow };

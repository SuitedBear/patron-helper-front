import React from 'react';
import { DropDownField, BoolField, TextField, NumberField, getValue }
  from './formFieldTypes';

const statuses = [
  { id: 0, name: 'done' },
  { id: 1, name: 'for shipment' },
  { id: 2, name: 'in progress' },
  { id: 3, name: 'new' }
];
const optionsFallback = {
  status: statuses
};
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
      formData: props.dataPoint
    };
    this.types = (props.types || typesFallback);

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler (e) {
    const newFormData = this.state.formData;
    newFormData[e.target.id] = getValue(e.target, this.types.get(e.target.id));
    this.setState({ formData: newFormData });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.onHandleEdit(this.state.formData);
  }

  render () {
    const formFields = this.props.keys.map(key => {
      const entry = this.state.formData[key];
      const optionList = this.props.options || optionsFallback;
      const Ele = this.types.get(key);
      if (Ele) {
        return (
          <Ele
            key={key}
            entry={[key, entry]}
            optionList={optionList[key] || statuses}
            handleChange={this.changeHandler}
          />
        );
      } else {
        return (
          <div
            className='data-cell'
            key={key}
          >
            {`${entry}`}
          </div>
        );
      }
    });

    return (
      <form
        onSubmit={(e) => this.handleSubmit(e)}
        className='data-row'
        onBlur={(e) => {
          if (e.relatedTarget === null) this.handleSubmit(e);
        }}
      >
        {formFields}
        {/* <input type='submit' value='Save' className='data-cell' /> */}
      </form>
    );
  }
}

export { EditRow };

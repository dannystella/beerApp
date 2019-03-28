import React from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'
import axios from 'axios';
import { Field, reduxForm, reset } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect, dispatch } from 'react-redux';
import { createBeer } from '../modules/beers/actions';

class BeerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        beerName: '',
        brewery: '',
        type: '',
        abv: '',
        rank: '',
        description: '',

      }
    }
    this.renderField = this.renderField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-danger">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createBeer(values);

  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
        <Field
          label="Beer Name"
          name="beername"
          component={this.renderField}
        />
        <Field
          label="Brewery Name"
          name="breweryname"
          component={this.renderField}
        />
        <Field
          label="Type"
          name="type"
          component={this.renderField}
        />
        <Field
          label="ABV"
          name="abv"
          component={this.renderField}
        />
        <Field
          label="Rank"
          name="rank"
          component={this.renderField}
        />
        <Field
          label="ImageUrl"
          name="imageUrl"
          component={this.renderField}
        />
        <Field
          label="Description"
          name="description"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/Beers" className="btn btn-secondary">Go Back</Link>
      </form>
    )
  }

}


function validate(values) {
  const errors = {};

  if (!values.beername) {
    errors.beername = "Enter a Beer name"
  }
  if (!values.breweryname) {
    errors.breweryname = "Enter a brewery name"
  }
  if (!values.type) {
    errors.type = "Enter a type"
  }
  if (!values.abv) {
    errors.abv = "Enter an abv"
  }
  if (!values.rank) {
    errors.rank = "Enter a rank"
  }
  if (!values.description) {
    errors.description = "Enter a Description"
  }
  return errors;
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('newBeerForm'));

export default reduxForm({
  validate,
  form: 'newBeerForm',
  enableReinitialize: true,
  onSubmitSuccess: afterSubmit,
})(
  connect(null, { createBeer })(BeerForm)
);
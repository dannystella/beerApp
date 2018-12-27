import React from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'
import axios from  'axios';
import { Field, reduxForm, reset } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect, dispatch } from 'react-redux';
import { addUserBeer } from '../modules/users/actions/userActivities_actions';
import authMiddleware from './authMiddleware.jsx';
import RatingStar from './rating.jsx';
import * as utils from '../utils/utils.js';

const ratingState = React.createContext(0);

class UserBeerForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        rerender: false,
        initialvalue: '',
        rating: 0,
        edit: false,
        position: {}
      }
      this.renderField = this.renderField.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.handleRating = this.handleRating.bind(this);
      this._locateUser = this._locateUser.bind(this);
  }

  componentDidMount() {
  } 

  handleRating(rating) {
    this.setState({
      rating
    })
  }
  
  _locateUser() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(position.coords);
      });
    })
  }

  renderField(field) {
    const { meta: {touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className = {className}>
      <label>{field.label}</label>
        <input
          className= "form-control"
          type = "text"
          value = "value"
          {...field.input}
        />
        <div className = "text-danger">
        {touched ? error : ''}
        </div>
      </div>
    )
  } 

  async onSubmit(values) {
    let result = await this._locateUser();
    let userBeerValues = values;
    let latitude = result.latitude;
    let longitude = result.longitude;
    userBeerValues.position = {};
    userBeerValues.position.latitude = latitude;
    userBeerValues.position.longitude = longitude;
    userBeerValues.beerId = this.props.id;
    userBeerValues.rating = this.state.rating;
    console.log("values here", userBeerValues);
    let userInfo = utils.stringChecker(this.props.state.userAuth.userinfo);
    this.props.addUserBeer(values, userInfo, this.navigateAway);
  }

   render() {
     let userInfo = this.props.userInfo;
     const { handleSubmit } = this.props;
       return (  
         <div>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
            <h3>{userInfo.username}</h3>
            <p>Rating: {this.state.rating} </p>
            <RatingStar handleRating = {this.handleRating} />
            <Field
              label= "Review Title"
              name = "review title"
              value="review title"
              component={this.renderField}
            />
            <Field
              label= "Review"
              name = "review"
              value="review"
              component={this.renderField}
            />
            <Field
              label= "Image"
              name = "image"
              value="image"
              component={this.renderField}
            />          
            <button type = "submit" className = "btn btn-primary">Drink Beer</button>
          </form>
        </div>
    )
   } 
}

function validate(values) {
  const errors = {};
  if(!values.comment) {
    errors.comment = "Enter a comment"
  }
  return errors;
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('UserBeerForm'));

const mapStateToProps = (state, ownProps) => {
  return {
    state,
  }
}

UserBeerForm = reduxForm({
  validate,
  form: 'UserBeerForm',
  enableReinitialize: true,
  onSubmitSuccess: afterSubmit,
})(UserBeerForm);

export default connect(mapStateToProps,
 {
   addUserBeer
 })(UserBeerForm);
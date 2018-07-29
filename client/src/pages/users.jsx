import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isArray } from 'util';
import LoaderIcon from '../components/loader.jsx';
import { fetchUsers } from '../modules/users/actions/general_actions';

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.renderUsers = this.renderUsers.bind(this);
    }

    
    componentDidMount() {
      this.props.fetchUsers();

    }

   renderUsers() {
    if(this.props.allUsers) {
      return this.props.allUsers.map((user, i) => {
            //   console.log(user)
            return (
                <div key = {user._id + "div"}>
                <Grid.Row container = 'true' key = {user._id + i} columns = {1}>
                <h5 key ={user._id}><Link to = {{ pathname: `/profile/${user._id}`, state: {currentUser: user}}}>{user.username}</Link></h5>
                </Grid.Row>
                </div>
            )
          })

    } else {
        return (<div>yo</div>)
    }
   }



    render() {
        return (
            <div >   
                <Grid stackable celled container >
                <Grid.Column width={1}>
                {this.renderUsers()}
                </Grid.Column>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
  console.log(state);
  let allUsers = null;
  if(state.generalActions.allUsers) {
    allUsers = state.generalActions.allUsers.data;
  }

    return {
        // state
        allUsers
    }
  }
  
  export default connect(mapStateToProps, {
    fetchUsers   
  
  })(Users);


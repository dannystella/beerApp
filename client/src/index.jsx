import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'materialize-css';
import AppBar from 'material-ui/AppBar';
import Navigation from './navBar.jsx';
import Main from './body.jsx';
import FooterBottom from './footer.jsx';


class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {

  	}
  }

  render () {
  	return (<div>  
      <div >
        <header>
        <Navigation/>
          </header>
        <main>
        <Main/>
        <footer>
        <FooterBottom/>
          </footer>
        </main>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
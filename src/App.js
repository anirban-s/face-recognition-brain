import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import Signin from './component/Signin/Signin';
import Register from './component/Register/Register';
import Rank from './component/Rank/Rank';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles : {
    number : {
      value : 30,
      density : {
          enabled : true,
          value_area : 800
      }
    }
  }
}

const app = new Clarifai.App({
 apiKey: '496072ef859148188eb41c5faefdd9e8'
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box : box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn : false});
    }
    else if(route === 'home'){
      this.setState({isSignedIn : true});
    }

    this.setState({route : route});
  }

  render(){
      const { isSignedIn, imageUrl, box, route } = this.state;
      return (
        <div className="App">
          <Particles className='particles' params={ particlesOptions }/>
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
          { route === 'home'
              ?    <div>
                      <Logo />
                      <Rank />
                      <ImageLinkForm
                          onInputChange={this.onInputChange}
                          onButtonSubmit={this.onButtonSubmit } />
                      <FaceRecognition imageUrl={imageUrl} box={box}/>
                    </div>
              : (
                route === 'signin'
                  ? <Signin onRouteChange={this.onRouteChange}/>
                  : <Register onRouteChange={this.onRouteChange}/>
              )
          }
        </div>
      );
    }
}

export default App;

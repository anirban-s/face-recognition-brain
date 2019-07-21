import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
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
      box: {}
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

  render(){
      return (
        <div className="App">
          <Particles className='particles' params={ particlesOptions }/>
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit } />
          <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
        </div>
      );
    }
}

export default App;

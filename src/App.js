import React from 'react';
import './App.css';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import Rank from './component/Rank/Rank';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
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

function App() {
  return (
    <div className="App">
      <Particles className='particles' params={ particlesOptions }/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
            {/*<FaceRecognition /> */}
    </div>
  );
}

export default App;

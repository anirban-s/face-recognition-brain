import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f3'>
        {'This magic brain will detect faces in your picture'}
      </p>
      <div className="center form shadow-3">
        <input type='text' className='f4 pa2 w-70 center' onChange={ onInputChange }/>
        <button className='w-30 grow f4 link ph3 pv dib white bg-light-purple' onClick={ onButtonSubmit }>Detect</button>
      </div>
    </div>
  );
}

export default ImageLinkForm;

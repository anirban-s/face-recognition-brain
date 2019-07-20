import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = () => {
  return (
    <div>
      <p className='f3'>
        {'This magic brain will detect faces in your picture'}
      </p>
      <div className="center form shadow-3">
        <input type='text' className='f4 pa2 w-70 center'/>
        <button className='w-30 grow f4 link ph3 pv dib white bg-light-purple'>Detect</button>
      </div>
    </div>
  );
}

export default ImageLinkForm;

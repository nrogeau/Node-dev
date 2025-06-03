import React from 'react';
import '../App.css'; // Make sure the CSS is imported
import ThreeScene from '../Components/ThreeScene';
import FractalTreeViewer from '../Components/FractalTree';

  export default function Experiments() {
  
    /*
      return (
        <main className="p-4">
          <h1 className="text-2xl font-bold mb-4">Experiments</h1>
          <p className="mb-4">This is a space for interactive 3D geometry demos.</p>

          <div className="rounded-container">
            <ThreeScene />
          </div>
        </main>
      );
    }
    */
    return (
      <div className="rounded-container">
        <h2>Fractal Tree</h2>
        <FractalTreeViewer />
      </div>
    );
}
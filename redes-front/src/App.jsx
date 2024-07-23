import React, { useState } from 'react';
import { PhotoUploadForm } from './instagram/Upload';
import { UltimaPublicacion } from './instagram/UltimaPublicacion';
import fondoSVG from './fondo.svg';
function App() {
  const [activeComponent, setActiveComponent] = useState('upload');
  const [showMenu, setShowMenu] = useState(true);

  const handleMenuItemClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="App">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossOrigin="anonymous"></link>

      <div className="container-fluid d-flex" style={{ height: '100vh', backgroundImage: `url(${fondoSVG})` }}>
        {/* Menú a la izquierda */}
        <div className={`col-2 bg-light border-end rounded-3 d-flex flex-column justify-content-between py-4 ${showMenu ? '' : 'd-none'}`} style={{ height: '100%' }}>
          {/* Espacio para el logotipo */}
          <div className="d-flex justify-content-center mb-4">
            <img src="logo.png" alt="Logo" style={{ maxWidth: '100px' }} />
            <button className="btn btn-link text-decoration-none fw-semibold" onClick={toggleMenu}>
              {showMenu ? '▲' : '▼'}
            </button>
          </div>

          <ul className="list-group list-group-flush flex-grow-1">

            <li className={`list-group-item rounded-3 py-3 px-4 ${activeComponent === 'home' ? 'bg-secondary text-white' : ''}`}>
              <button className="btn btn-link text-decoration-none fw-semibold" onClick={() => handleMenuItemClick('home')}>Home</button>
            </li>
            <li className={`list-group-item rounded-3 py-3 px-4 ${activeComponent === 'upload' ? 'bg-secondary text-white' : ''}`}>
              <button className="btn btn-link text-decoration-none fw-semibold" onClick={() => handleMenuItemClick('upload')}>Publicar</button>
            </li>

            {/* <li className={`list-group-item rounded-3 py-3 px-4 ${activeComponent === 'lastPost' ? 'bg-secondary text-white' : ''}`}>
              <button className="btn btn-link text-decoration-none fw-semibold" onClick={() => handleMenuItemClick('lastPost')}>Última publicación</button>
            </li> */}
            {/* Agrega más opciones de menú aquí */}
          </ul>

          <div className="text-center">
            <p>&copy; 2024 - Photo Upload Tool</p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="col-8 my-5 mx-5" >
          <div className="rounded-pill bg-success text-white py-2 px-3 d-flex justify-content-center mb-4">
            <h1 className="m-0 fw-semibold">Gestor de publicaciones</h1>
          </div>
          {activeComponent === 'upload' && <PhotoUploadForm />}
          {activeComponent === 'home' && <div className="card rounded-3 p-4">
            <div className="text-center">
              <h2 className="fw-semibold">Bienvenido</h2>
            </div>
          </div>}
          {/* {activeComponent === 'lastPost' && <UltimaPublicacion />} */}
          {/* Agrega más componentes aquí */}
        </div>
      </div>
    </div>
  );
}

export default App;
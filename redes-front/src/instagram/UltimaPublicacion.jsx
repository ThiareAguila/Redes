import React, { useState, useEffect } from 'react';

export const UltimaPublicacion = () => {
  const [username, setUsername] = useState('');
  const [mediaId, setMediaId] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', username);

      const response = await fetch('http://127.0.0.1:5000/lasts_post', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMediaId(data.media_id);
      } else {
        const error = await response.json();
        console.error('Error:', error.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="card rounded-3 p-4">
        <div className="text-center">
          <h2 className="fw-semibold">Últimas publicaciones</h2>
          {mediaId && <p className="mt-2">Media ID: {mediaId}</p>}
        </div>
      </div>

      <br />
      <div className="card rounded-3 p-4">
        <div className="text-center">
          <h2 className="fw-semibold">Contenido</h2>
          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nombre de usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
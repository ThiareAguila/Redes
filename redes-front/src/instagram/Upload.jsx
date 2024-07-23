import React, { useState } from 'react';


export const PhotoUploadForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [caption, setCaption] = useState('');
  const [person, setPerson] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('image_path', image);
      formData.append('caption', caption);
      formData.append('linkedin', linkedin);
      formData.append('person', person);


      const response = await fetch('http://127.0.0.1:5000/upload_photo', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setShowSuccessAlert(true);
        console.log('Media ID:', data.media_id);
      } else {
        const error = await response.json();
        console.error('Error:', error.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // Establecer el estado de carga a false
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div>

      <div className="card rounded-3 p-4">
        <div className="text-center">
          <h2 className="fw-semibold">Nueva publicación</h2>
        </div>
      </div>
      <br />
      <div className="card rounded-3 p-4">


        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="username" className="form-label">Username instagram:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col">
              <label htmlFor="password" className="form-label">Password instagram:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="token" className="form-label">Token linkedin:</label>
              <input
                type="password"
                id="linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col">
              <label htmlFor="person" className="form-label">Person linkedin:</label>
              <input
                type="password"
                id="person"
                value={person}
                onChange={(e) => setPerson(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="image" className="form-label">Image:</label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="caption" className="form-label">Caption:</label>
              <textarea
                type="text"
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="form-control"
              />
            </div>

          </div>


          <div className="text-center">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Cargando...' : 'Enviar'}
            </button>
          </div>

          {showSuccessAlert && (
            <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
              ¡La imagen se subió correctamente!
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setShowSuccessAlert(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>

  );
}

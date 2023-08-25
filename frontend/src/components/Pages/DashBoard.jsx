import React from 'react';
import { useState } from 'react';

const DashBoard = () => {
  const [titleNote, setTitleNote] = useState('');
  const [contentNote, setContentNote] = useState('');

  const handleAddNoteForm = (e) => {
    e.preventDefault();
    document.getElementById('add-note-form').classList.toggle('active');
    document.getElementById('notes-container').classList.toggle('active');
  };

  const createNote = (e) => {
    e.preventDefault();
    console.log('Create note function called');

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const data = {
      titleNote: titleNote,
      contentNote: contentNote,
      user: userId,
    };

    fetch(`http://localhost:4200/notes/${userId}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Note créer');
          alert('Note créer');
          setTitleNote('');
          setContentNote('');
          document.getElementById('add-note-form').classList.toggle('active');
          document.getElementById('notes-container').classList.toggle('active');
        } else {
          console.log('Erreur lors de la création de la note');
          alert('Erreur lors de la création de la note');
        }
      })
      .catch((error) => {
        console.log('Erreur lors de la création de la note', error);
        alert('Erreur lors de la création de la note');
      });
  };

  return (
    <div className="dashboard-page">
      <div id="notes-container" className="active">
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1>
                  Add a note{' '}
                  <div className="btn-round" onClick={handleAddNoteForm}>
                    <i className="fa-solid fa-plus"></i>
                  </div>
                </h1>
                <form id="addNote-form">
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title" name="title" />
                  <label htmlFor="content">Content</label>
                  <textarea
                    name="content"
                    id="content"
                    cols="30"
                    rows="6"
                  ></textarea>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="current-notes section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Current notes</h2>
                <div className="current-notes-container notes-container"></div>
              </div>
            </div>
          </div>
        </section>
        <section className="deleted-notes section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Deleted notes</h2>
                <div className="deleted-notes-container notes-container"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div id="add-note-form">
        <form className="form-container">
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            name="title"
            id="name"
            value={titleNote}
            onChange={(e) => setTitleNote(e.target.value)}
          />
          <label htmlFor="content">Content :</label>
          <input
            type="textarea"
            name="content"
            id="content"
            value={contentNote}
            onChange={(e) => setContentNote(e.target.value)}
          />
          <button onClick={createNote}>Ok</button>
          <button onClick={handleAddNoteForm}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default DashBoard;

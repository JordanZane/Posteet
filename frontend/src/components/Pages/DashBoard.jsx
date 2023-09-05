import React, { useEffect, useState, useRef } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const DashBoard = () => {
  const [titleNote, setTitleNote] = useState('');
  const [contentNote, setContentNote] = useState('');
  const [importanceNote, setImportanceNote] = useState('');
  const [userNotes, setUserNotes] = useState([]);
  const [selectedSort, setSelectedSort] = useState('asc');
  const [fieldsEnabled, setFieldsEnabled] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteNoteConfirm, setDeleteNoteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const titleRefs = useRef([]);

  const handleAddNoteForm = (e) => {
    e.preventDefault();
    document.getElementById('add-note-form').classList.toggle('active');
    document.getElementById('notes-container').classList.toggle('active');
  };

  const handleTitleChange = (index, newTitle) => {
    const updatedNotes = [...userNotes];
    updatedNotes[index].titleNote = newTitle;
    setUserNotes(updatedNotes);
  };

  const handleContentChange = (index, newContent) => {
    const updatedNotes = [...userNotes];
    updatedNotes[index].contentNote = newContent;
    setUserNotes(updatedNotes);
  };

  const handleImportanceChange = (index, newImportance) => {
    const updatedNotes = [...userNotes];
    updatedNotes[index].importanceNote = newImportance;
    setUserNotes(updatedNotes);
  };

  const handleEditButtonClick = (index) => {
    if (fieldsEnabled && editIndex === index) {
      saveNoteChanges(index);
      setFieldsEnabled(false);
      setEditIndex(null);
    } else {
      setFieldsEnabled(true);
      setTimeout(() => {
        if (titleRefs.current[index]) {
          titleRefs.current[index].focus();
        }
      }, 0);
      setEditIndex(index);
      setImportanceNote(userNotes[index].importance);
    }
  };

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSort(selectedValue);
    sortNotes(selectedValue);
  };

  const getUserNotes = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    fetch(`http://localhost:4200/notes/${userId}`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erreur lors de la récupération de l'utilisateur");
        }
      })
      .then((data) => {
        const userNotes = data.notes;
        setUserNotes(userNotes);
        setLoading(false);
      })
      .catch((error) => {
        console.log(
          "Erreur lors de la récupération de l'utilisateur : ",
          error
        );
      });
  };

  const createNote = (e) => {
    e.preventDefault();
    console.log('Create note function called');

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!titleNote || !contentNote || !importanceNote) {
      alert('Le titre et le contenu de la note sont requis');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const data = {
      titleNote: titleNote,
      contentNote: contentNote,
      user: userId,
      importanceNote: importanceNote,
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
          setImportanceNote('normale');

          document.getElementById('add-note-form').classList.toggle('active');
          document.getElementById('notes-container').classList.toggle('active');

          getUserNotes();
        } else {
          console.log('Erreur lors de la création de la note');
          alert('Erreur lors de la création de la note');
        }
      })
      .catch((error) => {
        console.log('Erreur lors de la création de la note', error);
        alert('Erreur lors de la création de la note');
      });
    getUserNotes();
  };

  const saveNoteChanges = (index) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const updatedNote = userNotes[index];

    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    if (
      !updatedNote.titleNote ||
      !updatedNote.contentNote ||
      !updatedNote.importanceNote
    ) {
      alert('Tout les champs doivent être remplis');
      return;
    }

    fetch(`http://localhost:4200/notes/${userId}/${updatedNote._id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        titleNote: updatedNote.titleNote,
        contentNote: updatedNote.contentNote,
        importanceNote: updatedNote.importanceNote,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Note updated successfully');
          getUserNotes();
        } else {
          console.log('Erreur de la modification de la note');
        }
      })
      .catch((error) => {
        console.log('Erreur lors de la modification de la note : ', error);
      });
  };

  const handleDeleteConfirmNote = (index) => {
    setDeleteNoteConfirm(true);
    setDeleteIndex(index);
  };

  const deleteUserNote = (index) => {
    console.log('Delete user Note function called');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const deletedNote = userNotes[index];
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    fetch(`http://localhost:4200/notes/${userId}/${deletedNote._id}`, {
      method: 'DELETE',
      headers: headers,
    })
      .then((response) => {
        if (response.ok) {
          console.log('Deleted Note confirmed');
          getUserNotes();
        }
      })
      .catch((error) => {
        console.log('Erreur lors de la suppression de la note : ', error);
      });
    setDeleteIndex(null);
    setDeleteNoteConfirm(false);
  };

  const sortNotes = (sort) => {
    const sortedNote = [...userNotes].sort((a, b) => {
      if (sort === 'desc') {
        return new Date(b.creationDate) - new Date(a.creationDate);
      } else {
        return new Date(a.creationDate) - new Date(b.creationDate);
      }
    });
    setUserNotes(sortedNote);
  };

  useEffect(() => {
    getUserNotes();
  }, []);

  return (
    <div className="dashboard-page" id="dashboard-page">
      {loading ? <LoadingScreen /> : null}
      <div id="notes-container" className="active">
        <section className="header-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1>
                  Create your note{' '}
                  <div className="btn-round" onClick={handleAddNoteForm}>
                    <i className="fa-solid fa-plus"></i>
                  </div>
                </h1>
                <div className="sort-btns-container">
                  <label htmlFor="sortSelect">Sort by :</label>
                  <select
                    id="sortSelect"
                    value={selectedSort}
                    onChange={handleSortChange}
                  >
                    <option value="asc">Oldest</option>
                    <option value="desc">Newest</option>
                  </select>
                </div>

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
        <section className="current-notes">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Current notes</h2>
                <div className="current-notes-container notes-container">
                  {userNotes.map((note, index) => (
                    <div key={index} className="note-container">
                      <div className="note-content">
                        <input
                          type="text"
                          value={note.titleNote}
                          onChange={(e) =>
                            handleTitleChange(index, e.target.value)
                          }
                          disabled={!fieldsEnabled}
                          id={`title-${index}`}
                          ref={(el) => (titleRefs.current[index] = el)}
                        />
                        <textarea
                          value={note.contentNote}
                          onChange={(e) =>
                            handleContentChange(index, e.target.value)
                          }
                          disabled={!fieldsEnabled}
                          id={`content-${index}`}
                        ></textarea>
                        <select
                          id="importance"
                          name="importance"
                          value={note.importanceNote}
                          onChange={(e) =>
                            handleImportanceChange(index, e.target.value)
                          }
                          disabled={!fieldsEnabled}
                        >
                          <option value="basse">Basse</option>
                          <option value="normale">Normale</option>
                          <option value="haute">Haute</option>
                        </select>
                        <div className="options-container">
                          <button onClick={() => handleEditButtonClick(index)}>
                            {fieldsEnabled && editIndex === index
                              ? 'Save'
                              : 'Edit'}
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteConfirmNote(index)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {deleteNoteConfirm && deleteIndex === index && (
                        <div className="overlay-popup">
                          <div className="delete-note-popup">
                            <h3>Are you sure you want to delete this note ?</h3>
                            <button
                              className="btn btn-green"
                              onClick={() => deleteUserNote(deleteIndex)}
                            >
                              Confirm
                            </button>
                            <button
                              className="btn btn-red"
                              onClick={() => setDeleteNoteConfirm(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div id="add-note-form">
        <form className="form-container">
          <h2>Add your note</h2>
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            name="title"
            id="name"
            value={titleNote}
            onChange={(e) => setTitleNote(e.target.value)}
          />
          <label htmlFor="content">Content :</label>
          <textarea
            name="content"
            id="content"
            cols="25"
            rows="5"
            value={contentNote}
            onChange={(e) => setContentNote(e.target.value)}
          ></textarea>
          <label htmlFor="importance">Importance:</label>
          <select
            id="importance"
            name="importance"
            value={importanceNote}
            onChange={(e) => setImportanceNote(e.target.value)}
          >
            <option value="basse">Basse</option>
            <option value="normale">Normale</option>
            <option value="haute">Haute</option>
          </select>
          <div className="btns-container">
            <button className="btn btn-green" onClick={createNote}>
              Ok
            </button>
            <button className="btn btn-red" onClick={handleAddNoteForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashBoard;

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
  const URLDev = process.env.REACT_APP_URL;

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
      setEditIndex(index);
      setImportanceNote(userNotes[index].importance);
      setTimeout(() => {
        if (titleRefs.current[index]) {
          titleRefs.current[index].focus();
        }
      }, 0);
    }
  };

  const sortNotes = (sort) => {
    const sortedNotes = [...userNotes];

    if (sort === 'desc') {
      sortedNotes.sort((a, b) => {
        return new Date(b.creationDate) - new Date(a.creationDate);
      });
    } else if (sort === 'asc') {
      sortedNotes.sort((a, b) => {
        return new Date(a.creationDate) - new Date(b.creationDate);
      });
    } else if (sort === 'importance') {
      sortedNotes.sort((a, b) => {
        const importanceOrder = {
          basse: 3,
          normale: 2,
          haute: 1,
        };

        return (
          importanceOrder[a.importanceNote] - importanceOrder[b.importanceNote]
        );
      });
    }
    setUserNotes(sortedNotes);
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
    fetch(`${URLDev}/notes/${userId}`, {
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

    if (!titleNote || !contentNote) {
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

    fetch(`${URLDev}/notes/${userId}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
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

    fetch(`${URLDev}/notes/${userId}/${updatedNote._id}`, {
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
          sortNotes(selectedSort);
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

    fetch(`${URLDev}/notes/${userId}/${deletedNote._id}`, {
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
                  Créer votre note{' '}
                  <div className="btn-round" onClick={handleAddNoteForm}>
                    <i className="fa-solid fa-plus"></i>
                  </div>
                </h1>
                <div className="sort-btns-container">
                  <label htmlFor="sortSelect">Trier par :</label>
                  <select
                    id="sortSelect"
                    value={selectedSort}
                    onChange={handleSortChange}
                  >
                    <option value="asc">Plus vieux</option>
                    <option value="desc">Plus récent</option>
                    <option value="importance">Importance</option>
                  </select>
                </div>

                <form id="addNote-form">
                  <label htmlFor="title">Titre</label>
                  <input type="text" id="title" name="title" />
                  <label htmlFor="content">Contenu</label>
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
                <h2>Notes actuelles</h2>
                <div className="current-notes-container notes-container">
                  {userNotes.map((note, index) => (
                    <div
                      key={index}
                      className="note-container col-xl-3 col-md-6 col-xs-12"
                    >
                      <div className="note-header">
                        <input
                          type="text"
                          value={note.titleNote}
                          onChange={(e) =>
                            handleTitleChange(index, e.target.value)
                          }
                          disabled={!fieldsEnabled || editIndex !== index}
                          id={`title-${index}`}
                          ref={(el) => (titleRefs.current[index] = el)}
                        />
                        <div className="btns-container">
                          <button onClick={() => handleEditButtonClick(index)}>
                            {fieldsEnabled && editIndex === index ? (
                              <i className="fa-solid fa-floppy-disk"></i>
                            ) : (
                              <i className="fa-solid fa-pen" title="Edit"></i>
                            )}
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteConfirmNote(index)}
                          >
                            <i className="fa-solid fa-trash" title="Delete"></i>
                          </button>
                        </div>
                      </div>
                      <div className="note-content">
                        <textarea
                          value={note.contentNote}
                          onChange={(e) =>
                            handleContentChange(index, e.target.value)
                          }
                          disabled={!fieldsEnabled || editIndex !== index}
                          id={`content-${index}`}
                        ></textarea>

                        <div className="options-container">
                          Importance :
                          <select
                            id={`importance-${index}`}
                            name="importance"
                            value={note.importanceNote}
                            onChange={(e) =>
                              handleImportanceChange(index, e.target.value)
                            }
                            disabled={!fieldsEnabled || editIndex !== index}
                          >
                            <option value="basse">basse</option>
                            <option value="normale">normale</option>
                            <option value="haute">haute</option>
                          </select>
                        </div>
                      </div>

                      {deleteNoteConfirm && deleteIndex === index && (
                        <div className="overlay-popup">
                          <div className="delete-note-popup">
                            <h3>
                              Êtes vous sûr de vouloir supprimmer cette note ?
                            </h3>
                            <button
                              className="btn btn-green"
                              onClick={() => deleteUserNote(deleteIndex)}
                            >
                              Confirmer
                            </button>
                            <button
                              className="btn btn-red"
                              onClick={() => setDeleteNoteConfirm(false)}
                            >
                              Annuler
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
          <h2>Créer votre note</h2>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            name="title"
            id="name"
            value={titleNote}
            onChange={(e) => setTitleNote(e.target.value)}
          />
          <label htmlFor="content">Contenu :</label>
          <textarea
            name="content"
            id="content"
            cols="25"
            rows="5"
            value={contentNote}
            onChange={(e) => setContentNote(e.target.value)}
          ></textarea>
          <div className="select-importance-container">
            <label htmlFor="importance">Importance :</label>
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
          </div>

          <div className="btns-container">
            <button className="btn btn-green" onClick={createNote}>
              Ok
            </button>
            <button className="btn btn-red" onClick={handleAddNoteForm}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashBoard;

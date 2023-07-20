import React from 'react';

const DashBoard = () => {
  return (
    <div className="dashboard-page">
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>
                Add a note{' '}
                <div className="btn-round">
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
  );
};

export default DashBoard;

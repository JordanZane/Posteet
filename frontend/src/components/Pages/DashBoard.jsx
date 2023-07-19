import React from 'react';

const DashBoard = () => {
  return (
    <div className="dashboard-page">
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <form>
                <label htmlFor="addnote">Add a note +</label>
                <input type="text" id="addnote" name="addnote" />
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="current-notes section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>- Current notes</h2>
              <div className="current-notes-container notes-container"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="deleted-notes section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>- Deleted notes</h2>
              <div className="deleted-notes-container notes-container"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoard;

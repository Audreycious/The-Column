import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        The Column
      </header>
      <main>
        <section className='Account-signup-page'>
          <div className='Main-container'>
            <form action="#" className="Signup-form">
              <fieldset>
                <legend>Signup for The Column</legend>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" />
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" />
              </fieldset>
              <p>Disclaimer</p>
              <button type="submit">Join</button>
            </form>
          </div>
        </section>


        {/* <section className="Landing-page">
          <div className='Sidebar-link-container'>
            <a href="#">Login</a>
            <a href="#">Signup</a>
          </div>
          <div className="Description-container">
            Website Description
          </div>
        </section> */}
      </main>
    </div>
  );
}

export default App;

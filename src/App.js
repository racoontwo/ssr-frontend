// import logo from './logo.svg';
// import './App.css';
import './css/style.css';
import React, { useState } from 'react';

import ShowDocs from './components/ShowDocs.js';
import ShowOne from './components/ShowOne.js';
import AddDocs from './components/AddDocs.js';
import Home from './components/Home.js';

function App() {
    const [page, setPage] = useState('home');
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div className="App">
            <header className="App-header">
                <a href="/~olrs23/editor/">
                    <h1>SSR Editor</h1>
                </a>
                <nav>
                    {/* Set buttons to update the "page" state */}
                    <button onClick={() => setPage('home')}>Home</button>
                    <button onClick={() => setPage('addocs')}>New document</button>
                    <button onClick={() => setPage('all')}>Saved documents</button>
                    <button onClick={() => setPage('showone')}>Show One Doc</button>
                </nav>
            </header>
            <div class="main">
                <section>
                    {/* Conditionally render content based on the value of the "page" state */}
                    {page === 'home' && <Home />}
                    {page === 'all' && (
                        <ShowDocs setPage={setPage} setSelectedItem={setSelectedItem} />
                    )}
                    {page === 'addocs' && <AddDocs />}
                    {page === 'showone' && <ShowOne item={selectedItem} />}
                </section>
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
            </div>
            <footer>
                <p class="copyright">&copy; Oliver Roosvall & Pontus Karlsson</p>
            </footer>
        </div>
    );
}

export default App;

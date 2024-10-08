// import logo from './logo.svg';
// import './App.css';
import './css/style.css';
import React, { useState, useEffect } from 'react';

import ShowDocs from './components/ShowDocs.js';
import ShowOne from './components/ShowOne.js';
import AddDocs from './components/AddDocs.js';
import Home from './components/Home.js';

//possible own component
import io from "socket.io-client";

let socket;
//socket above

function App() {
    const [page, setPage] = useState('home');
    const [selectedItem, setSelectedItem] = useState(null);
    //useState = Shared? (lägga till en knapp i DOM där man klickar "Shared"
    //som gör att man ändrar useState till 'shared' och då kopplar man upp sig
    //mot socket och gör att man kan skriva samtidigt)

    useEffect(() => {
        socket = io("http://localhost:1337");

        socket.on('connect', () => {
            console.log(`You connected with id: ${socket.id}`);
            if (selectedItem) {
                socket.emit("selectedItem", selectedItem);
                socket.emit("create", selectedItem["_id"]);
            }
        });

        socket.on("doc", (data) => {
            setSelectedItem(data.content, false);
            if (selectedItem) {
                socket.emit("doc", data);
            }
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socket.disconnect();
        };
    }, [selectedItem]);

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
                    {/* <button onClick={() => setPage('showone')}>Show One Doc</button> */}
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

import React from 'react';

export default function AddDoc() {
    return <>    
    <h2>Nytt dokument</h2>
    <form method="POST" action="/" class="new-doc">
        <label for="title">Titel</label>
        <input type="text" name="title"/>

        <input type="submit" value="Skapa" />
    </form>
</>
}
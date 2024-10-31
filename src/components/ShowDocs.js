import React, { useState, useEffect } from 'react';

export default function ShowDocs({ setPage, setSelectedItem }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const changeParentState = (item) => {
        setSelectedItem(item);
        setPage('showone');
    };

    useEffect(() => {
        async function fetchData() {
            try {
                // const response = await fetch(
                //     'http://localhost:1337/graphql',
                //     {
                //         method: 'POST',
                //         headers: {
                //             'Content-Type': 'application/json',
                //         },
                //         body: JSON.stringify({ query: "{ documents { _id, title, content } }" }),
                //     },);
                const response = await fetch(
                    'https://jsramverk-editor-olrs23-g3bthketdnh3bag4.'
                    +'northeurope-01.azurewebsites.net/graphql',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ query: "{ documents { _id, title, content } }" }),
                    },);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();

                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleClick = (item) => {
        changeParentState(item);
    };

    return (
        <div className="DocumentList">
            <h1>Sparade dokument</h1>
            <ul>
                {data.data.documents.map((item, index) => (
                    <li key={index}>
                        <a onClick={() => handleClick(item)}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

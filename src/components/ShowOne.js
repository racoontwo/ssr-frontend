import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from "socket.io-client";

let socket;
// const SERVER_URL = `http://localhost:${port}`;
const SERVER_URL = 'https://jsramverk-editor-olrs23-g3bthketdnh3bag4.northeurope-01.'
                +'azurewebsites.net';

export default function ShowOne({ item }) {
    //manage the data in the document
    const [formData, setFormData] = useState({
        _id: item._id,
        title: item.title,
        content: item.content,
    });

    //Initialize a websocket connection to the server
    useEffect(() => {
        // socket = io("http://localhost:1337");
        socket = io(SERVER_URL);
        // socket = io('https://jsramverk-editor-olrs23-g3bthketdnh3bag4.northeurope-01.'
        //         +'azurewebsites.net');
        // Join the room using the document's _id
        socket.emit('selectedItem', { _id: item._id });

        // Listen for real-time updates of the document from all clients in the room
        socket.on('doc', (data) => {
            if (data._id === item._id) {
                setFormData(data);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [item._id]);

    //Handles any change of the the title or content for all connected clients.
    const handleChange = (e) => {
        const updatedData = {
            ...formData,
            [e.target.name]: e.target.value,
        };

        setFormData(updatedData);
        socket.emit('doc', updatedData);
    };

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    //Handle any submits and sends the data to the server for further handling.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await fetch("http://localhost:3001/posts/update_docs", {
            const response = await fetch(
                'https://jsramverk-editor-olrs23-g3bthketdnh3bag4.northeurope-01.'
                +'azurewebsites.net/posts/update_docs',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                },
            );
            const data = await response.json();

            toast.success('Document updated successfully!');

            console.log('Response from backend:', data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this document?")) {
            try {
                const response = await fetch(
                    'https://jsramverk-editor-olrs23-g3bthketdnh3bag4.northeurope-01.'
                    +'azurewebsites.net/posts/delete-one-doc',
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData), // Send the document ID
                    }
                );

                // const response = await fetch(
                //     'http://localhost:1337/posts/delete-one-doc',
                //     {
                //         method: 'DELETE',
                //         headers: {
                //             'Content-Type': 'application/json',
                //         },
                //         body: JSON.stringify(formData), // Send the document ID
                //     }
                // );

                if (response.ok) {
                    toast.success('Document deleted successfully!');
                    // Optionally, you might want to reset formData or redirect the user
                } else {
                    const data = await response.json();

                    toast.error(`Error: ${data.error}`);
                }
            } catch (error) {
                console.error('Error deleting document:', error);
                toast.error('Failed to delete document.');
            }
        }
    };

    if (!item) {
        return <div>No value</div>;
    }

    return (
        <div class="singleDocument">
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <textarea
                        type="text"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}>
                    </textarea>
                </div>
                <button type="submit">Save document</button>
                <button type="button" onClick={handleDelete}>Delete document</button>
                <ToastContainer />
            </form>
        </div>
    );
}

import { useState, useEffect, useRef } from 'react';
import { io } from 'socket'

const port = process.env.PORT || 1337;
// const SERVER_URL = `http://localhost:${port}`;
const SERVER_URL = `https://jsramverk-editor-olrs23-g3bthketdnh3bag4.northeurope-01.'
                +'azurewebsites.net`;

export default function TextEditor( item ) {
    const [_id, setId] = useState({_id: item._id});
    const [title, setTitle] = useState({title: item.title,});
    const [content, setContent] = useState({content: item.content});

    //ett sätt att köra när vi öppnar eller saker ändras
    //det sättet vi ändrar på värdet är useRef-variabel
    const socket = useRef(null);

    useEffect(() => {
        socket.current = io(SERVER_URL);

        socket.current.on("content", (data) => {
            setContent(data);
        });

        return () => {
            socket.current.disconnect();
        }
    }, []);

    function clear(e) {
        e.preventDefault();
        setTitle("");
        setContent("");
    }

    function handleContentChange(e) {
        const value = e.target.value;

        socket.current.emit("content", value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await fetch("http://localhost:3001/posts/update_docs", {
            const response = await fetch(
                `${SERVER_URL}/posts/update_docs`,
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
                        onChange={handleContentChange}
                    />
                </div>
                <div>
                    <textarea
                        type="text"
                        name="content"
                        value={formData.content}
                        onChange={handleContentChange}>
                    </textarea>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );

}

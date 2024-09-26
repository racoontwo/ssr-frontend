import React, { useState, useEffect } from 'react';

export default function ShowOne({ item }) {
    const [formData, setFormData] = useState({
        _id: item._id,
        title: item.title,
        content: item.content
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch("http://localhost:1337/posts/update_docs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Response from backend:", data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    if (!item) {
        return <div>No value</div>;
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </label>
            <label>
                Content:
                <input type="text" name="content" value={formData.content} onChange={handleChange} />
            </label>
            <button type="submit">Update</button>
        </form>
        </div>
    );
}

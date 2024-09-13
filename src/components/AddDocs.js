import React, { useState, useEffect } from 'react';


export default function AddDocs() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh

        console.log(formData.title);
        console.log(formData.content);

        try {
            const response = await fetch("http://localhost:3001/add_docs", {
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

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </label>
            <label>
                Content:
                <input type="text" name="content" value={formData.content} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );

}
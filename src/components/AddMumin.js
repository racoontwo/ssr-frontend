import React, { useState, useEffect } from 'react';


export default function AddMumin() {
    const [formData, setFormData] = useState({
        namn: '',
        bor: '',
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
  
        console.log(formData.namn);
        console.log(formData.bor);
  
        try {
            const response = await fetch("http://localhost:3001/add_mumin", {
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
                Namn:
                <input type="text" name="namn" value={formData.namn} onChange={handleChange} />
            </label>
            <label>
                Bor:
                <input type="text" name="bor" value={formData.bor} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );

}
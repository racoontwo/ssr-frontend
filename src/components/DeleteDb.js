const deleteDatabase = async () => {
    if (window.confirm("Är du säker på att du vill radera hela databasen?")) {
        try {
            const response = await fetch(
                'https://jsramverk-editor-olrs23-g3bthketdnh3bag4.northeurope-01.'
                +'azurewebsites.net/posts/delete-all-docs', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                });
            const data = await response.json();

            alert(data.message);
        } catch (error) {
            console.error("Error deleting database:", error);
            alert("Failed to delete database.");
        }
    }
};

export default deleteDatabase;
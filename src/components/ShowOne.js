export default function ShowOne({ item }) {
    if (!item) {
        return <div>No value</div>;
    }
    return (
        <div>
            <h2>Details for {item.title}</h2>
            <p>Content: {item.content}</p>
            <p>ID: {item._id}</p>
        </div>
    );
}

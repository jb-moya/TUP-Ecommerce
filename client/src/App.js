import React, { useEffect, useState } from "react";
// asleep at the wheel here, forgot to import useState and useEffect from react to use them in the App component to fetch data from the backend API and display it in the frontend UI. I'll fix that now.
function App() {
    const [backendData, setBackendData] = useState({});

    useEffect(() => {
        fetch("/api")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setBackendData(data))
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);


    return (
        <div>
            {typeof backendData.users === "undefined"
                ? "Loading..."
                : backendData.users.map((user, i) => <p key={i}>{user}</p>)}
        </div>
    );
}

export default App;

import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3600/").then((response) => {
      setListOfUsers(response.data.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("http://localhost:3600/", {
      name,
      age,
      username: userName,
    }).then((response) => {
      alert("User created successfully!");
      const newUser = response.data;
      setListOfUsers((prevList) => [...prevList, newUser]);
    });
  };

  return (
    <div className="App">
      {/* Display the list of users */}
      <div className="display">
        {listOfUsers.map((user) => (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <h1>Username: {user.username}</h1>
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="User Name..."
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <button onClick={createUser}>Create User</button>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { db, collection, getDocs, addDoc } from "./firebase"; // Import Firestore setup
import "./App.css";

function App() {
  const [dogs, setDogs] = useState([]); // State to store fetched dogs data
  const [loading, setLoading] = useState(true); // Loading state

  // States for the new dog form
  const [newDog, setNewDog] = useState({
    name: "",
    breed: "",
    age: "",
  });

  // Function to fetch dogs data from Firestore
  const fetchDogsData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "dogs"));
      const dogsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.name,
          breed: data.breed,
          age: data.age,
        };
      });
      setDogs(dogsData); // Set the state with the mapped data
    } catch (error) {
      console.error("Error fetching dogs data:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  // Fetch dogs data when the component mounts
  useEffect(() => {
    fetchDogsData();
  }, []);

  // Function to handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newDog.name && newDog.breed && newDog.age) {
      try {
        // Add the new dog data to Firestore
        await addDoc(collection(db, "dogs"), {
          name: newDog.name,
          breed: newDog.breed,
          age: parseInt(newDog.age), // Ensure age is a number
        });

        // Reset form fields
        setNewDog({
          name: "",
          breed: "",
          age: "",
        });

        // Fetch the updated dogs list
        fetchDogsData();
      } catch (error) {
        console.error("Error adding new dog:", error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <>
      {/* Displaying dogs data */}
      <h2>Dogs List:</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {dogs.map((dog, index) => (
            <li key={index}>
              {dog.name} - {dog.breed} - {dog.age} years old
            </li>
          ))}
        </ul>
      )}

      {/* Add New Dog Form */}
      <h2>Add a New Dog:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newDog.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Breed:
            <input
              type="text"
              name="breed"
              value={newDog.breed}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={newDog.age}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <button type="submit">Add Dog</button>
      </form>
    </>
  );
}

export default App;

import './AddMushroom.css'

import { useState } from "react";


const AddMushroom = ({ addMushroom }) => {

  const [newMushroom, setNewMushroom] = useState({
    "id": crypto.randomUUID(),
    "name": '',
    "image": '',
    "edible": '',
    "found": false
  });

  const handleInputs = (e) => {
    const value = 
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setNewMushroom({
      ...newMushroom,
      [e.target.name]: value
    })
  }

  const handleForm = (e) => {
    e.preventDefault();

    addMushroom(newMushroom);
    setNewMushroom({
      "id": crypto.randomUUID(),
      "name": '',
      "image": '',
      "edible": '',
      "found": false
    })
  }

  return ( 
    <div className="addMushroomWrapper">
      <h1>Grybų pridėjėjas</h1>
      <form onSubmit={handleForm} action="">
        <label htmlFor="">
          Pavadinimas
          <input type="text" name="name" id="" value={newMushroom.name}
            onChange={handleInputs}
          />
        </label>

        <label htmlFor="">
          Nuotrauka
          <input type="url" name="image" id="" value={newMushroom.image}
            onChange={handleInputs}
          />
        </label>

        
        <label htmlFor="">
          Ar yra valgomas?
            <input type="checkbox" id="" value={newMushroom.edible}
              name="edible"
              onChange={handleInputs}
            />
        </label>
        <button>Pridėti Grybą</button>
      </form>
    </div>
  );
}
 
export default AddMushroom;
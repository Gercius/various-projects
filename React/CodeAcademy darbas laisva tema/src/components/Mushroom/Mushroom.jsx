import './Mushroom.css'


const Mushroom = (props) => {

  const markFoundMushroom = (e) => {
    e.target.checked === true ? props.setFoundMushrooms(props.foundMushrooms+1) : props.setFoundMushrooms(props.foundMushrooms-1);
  }

  const promptChange = (e) => {
    const div = document.createElement('div');
    const input = document.createElement('input');
    const changeButton = document.createElement('button');
    const closeButton = document.createElement('button');

    changeButton.innerHTML = 'Keisti';
    closeButton.innerHTML = 'Uždaryti';

    div.append(input, changeButton, closeButton);
    e.target.nextSibling.append(div)

    changeButton.addEventListener('click', (e) => {
      let lastName = e.target.parentNode.parentNode.previousSibling;
      lastName.innerHTML = e.target.previousSibling.value;
    })

    closeButton.addEventListener('click', (e) => {
      e.target.parentNode.remove()
    })
  }

  return ( 
    <>
      {props.mushrooms.map(mushroom => (
        <li className="mushroomCard" key={mushroom.id}>
          <img src={mushroom.image} alt="" />

          <div className='shroomName'>
            <h3 onDoubleClick={promptChange}>{mushroom.name}</h3>
          <div className="changeName"></div>
          </div>
        
          <div className='edible'>  
            <p onDoubleClick={promptChange}>{mushroom.edible ? "Valgomas" : "Nevalgomas"}</p>
            <div className="changeEdible"></div>
          </div>
        
          <div className='found'>  
            <label htmlFor="">
              Esu radęs&#40;-usi&#41; šį grybą
              <input onClick={markFoundMushroom} type="checkbox" name="" id="" />
            </label>
          </div>
        
          <div className='removeShroomBtn'>
            <button onClick={() => props.deleteMushroom(mushroom.id)}>Pašalinti grybą</button>
          </div>
        </li>
      ))}
    </>
   );
}
 
export default Mushroom;
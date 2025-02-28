import React, {useState} from 'react';

const RecipeList = ({ recipes, onSelectRecipe, onDeleteRecipe, onOrderChange }) => {
  //const [personName, setPersonName] = useState('');

  //Funktion zum Speichern des Namens der bestellten Person
  const handleNameChange = (e, recipeId) => {
    const name = e.target.value;
    onOrderChange(recipeId, 0, name); //Bestellstatus aktualisieren
  }
  return (
    <div>
      <h2>Rezeptliste</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <button onClick={() => onSelectRecipe(recipe.id)}>
              {recipe.name}
            </button>
            <input 
              type="text"
              value={recipe.orderPerson || ""}
              onChange={(e) => handleNameChange(e, recipe.id)}
              placeholder={recipe.orderPerson ? "" : "Trage hier dein Name ein"}
            />  
            <button onClick={() => onDeleteRecipe(recipe.id)}>Löschen</button>
            <div className="order-buttons-container">
              <button onClick={() => onOrderChange(recipe.id, 1)}>Bestellung hinzufügen</button>
              <button onClick={() => onOrderChange(recipe.id, -1)}>Bestellung reduzieren</button>
            </div>
            <p>Bestellungen: {recipe.orderCount} ({recipe.orderPerson || "Unbekannt"})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;

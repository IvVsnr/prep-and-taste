import React, { useState } from 'react';

const RecipeDetail = ({ recipe, onBack, onUpdateRecipe, onOrderChange }) => {
  // Zustand für Bestellmenge, markierte Zutaten und bearbeitete Zutaten/Anleitungen
  const [orderCount, setOrderCount] = useState(0);
  const [markedIngredients, setMarkedIngredients] = useState(new Array(recipe.ingredients.length).fill(false));
  const [editedIngredients, setEditedIngredients] = useState(recipe.ingredients);
  const [editedInstructions, setEditedInstructions] = useState(recipe.instructions);
  const [newIngredient, setNewIngredient] = useState('');
  const [newInstruction, setNewInstruction] = useState('');

  // Funktion zur Änderung der Bestellmenge
  const handleOrderChange = (change) => {
    onOrderChange(recipe.id, change);
  };

  // Funktion zum Markieren von Zutaten
  const handleMarkIngredient = (index) => {
    const newMarkedIngredients = [...markedIngredients];
    newMarkedIngredients[index] = !newMarkedIngredients[index];
    setMarkedIngredients(newMarkedIngredients);
  };

  // Funktion zum Hinzufügen einer neuen Zutat
  const handleAddIngredient = () => {
    if (newIngredient) {
        setEditedIngredients([...editedIngredients, newIngredient]);
        setNewIngredient('');
    }
  };

  // Funktion zum Entfernen einer Zutat
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...editedIngredients];
    updatedIngredients.splice(index, 1);
    setEditedIngredients(updatedIngredients);
  };

  // Funktion zum Aktualisieren der Zubereitungsschritte
  const handleUpdateInstructions = (index, newText) => {
    const updatedInstructions = [...editedInstructions];
    updatedInstructions[index] = newText;
    setEditedInstructions(updatedInstructions);
  };

  // Funktion zum Speichern der Änderungen am Rezept
  const handleSave = () => {
    onUpdateRecipe({
        ...recipe,
        ingredients: editedIngredients,
        instructions: editedInstructions
    });
  };

  return (
    <div>
      <button onClick={onBack}>Zurück zur Rezeptliste</button>
      <h2>{recipe.name}</h2>
      <h3>Zutaten</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
            <li key={index}
            onClick={() => handleMarkIngredient(index)}
            style={{
                color: markedIngredients[index] ? 'green' : 'red',
                cursor: 'pointer'
            }}
            >
                {ingredient}
                <button onClick={() => handleRemoveIngredient(index)}>Löschen</button>
            </li>
        ))}
      </ul>
      <input
        type="text"
        value={newIngredient}
        onChange={(e) => setNewIngredient(e.target.value)}
        placeholder='Neue Zutat hinzufügen'
      />
      <button onClick={handleAddIngredient}>Hinzufügen</button>

      <h3>Zubereitung</h3>
      <ol>
        {editedInstructions.map((step, index) => (
          <li key={index}>
            <input
                type="text"
                value={step}
                onChange={(e) => handleUpdateInstructions(index, e.target.value)}
            /> 
          </li>
        ))}
      </ol>
      <div>
        <button onClick={() => handleOrderChange(1)}>Bestellung hinzufügen</button>
        <button onClick={() => handleOrderChange(-1)}>Bestellung reduzieren</button>
      </div>
      <p>Bestellungen: {orderCount}</p>

      <button onClick={handleSave}>Rezept speichern</button>
    </div>
  );
};

export default RecipeDetail;

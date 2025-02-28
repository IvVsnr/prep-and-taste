import './App.css';
import React, { useEffect, useState } from 'react';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';


const App = () => {
  // Zustand für alle Rezepte
  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Pina Colada', 
      ingredients: ['4 cl weißer Rum', '2 cl Kokosnusscreme', '6 cl Ananassaft', 'Eiswürfel'], 
      instructions: ['1. Alle Zutaten in einem Mixer mit Eiswürfeln gut mixen, bis eine cremige Konsistenz erreicht ist.', '2. In ein hohes Glas abseihen und mit einer Ananasscheibe garnieren.'],
      orderCount: 0,
      orderPerson:""
    },
    { id: 2, name: 'Mojito', 
      ingredients: ['4-5 frische Minzblätter', '2 cl Limettensaft', '2 Teelöffel Zucker', '4 cl wießer Rum', 'Sodawasser', 'Eiswürfel'], 
      instructions: ['1. Minzblätter, Zucker und Limettensaft in einem Glas leicht andrücken', '2. Rum hinzufügen und das Glas mit Eiswürfeln füllen.', '3. Mit Sodawasser auffüllen und gut umrühren.', '4. Mit einem Minzzweig garnieren und servieren.'],
      orderCount: 0,
      orderPerson:""
    },
    { id: 3, name: 'Tequila Sunrise', 
      ingredients: ['4cl Tequila', '8 cl Orangensaft', '2cl Grenadine', 'Eiswürfel'], 
      instructions: ['1. Tequila und Orangensaft in ein Glas mit Eiswürfeln gießen und umrühren.',  '2. Grenadine langsam in das Glas fließen lassen, damit sie sich absetzt und den „Sunrise“-Effekt erzeugt.', '3. Nicht umrühren. Mit einer Orangenscheibe garnieren.'],
      orderCount: 0,
      orderPerson:""
    } 
  ]);

  

  // Zustand für das ausgewählte Rezept
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  // Zustand für das Hinzufügen eines neuen Rezepts
  const [newRecipeName, setNewRecipeName] = useState('');
  const [newRecipeIngredients, setNewRecipeIngredients] = useState('');
  const [newRecipeInstructions, setNewRecipeInstuctions] = useState('');

  // Funktion zur Auswahl eines Rezepts
  const handleSelectRecipe = (id) => {
    const recipe = recipes.find(r => r.id === id);
    setSelectedRecipe(recipe);
  };

  // Funktion um zur Rezeptliste zurückzukehren
  const handleBackToList = () => {
    setSelectedRecipe(null);
  };

  // Funktion zum Aktualisieren eines Rezepts
  const handleUpdateRecipe = (updatedRecipe) => {
    const updatedRecipes = recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    setRecipes(updatedRecipes);
    setSelectedRecipe(updatedRecipe); //Aktualisiert das angezeigte Rezept
  };

  // useEffect(
  //   () => {
  //     handleUpdateRecipe()
  //   },[]
  // );

  // Funktion zum Hinzufügen eines neuen Rezepts
  const handleAddRecipe = () => {
    const newRecipe = {
      id: recipes.length + 1,
      name: newRecipeName,
      ingredients: newRecipeIngredients.split(',').map(item => item.trim()),
      instructions: newRecipeInstructions.split(',').map(item => item.trim())
    };
    setRecipes([...recipes, newRecipe]);
    setNewRecipeName('');
    setNewRecipeIngredients('');
    setNewRecipeInstuctions('');
  };

  // Funktion zum Löschen eines Rezepts
  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  // Funktion zur Änderung der Bestellmenge
  const handleOrderChange = (id, change, name = null) => {
    setRecipes(recipes.map(recipe => {
      if (recipe.id === id) {
        return {
          ...recipe,
          orderCount: Math.max(0, recipe.orderCount + change), //Bestellmenge anpassen
          orderPerson: name !== null ? name : recipe.orderPerson // Bestellname aktualisieren, falls ein Name übergeben wurde
        };
      }
      return recipe;
    }));
  };

  //Funktion zur Anzeige der Bestellübersicht
  const handleViewOrders = () => {
    return recipes
      .filter(recipe => recipe.orderCount > 0) //Nur Rezepte mit Bestellungen anzeigen
      .map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.name}</h3>
          <p>Bestellmenge: {recipe.orderCount}</p>
          <p>Bestellt von: {recipe.orderPerson || "Unbekannt"}</p>
        </div>
      ));
  }; 

  return (
    <div>
      <h1>Rezeptverwaltung</h1>
      {/* Formular zum Hinzufügen eines neuen Rezepts*/}
      <div>
        <h3>Neues Rezept hinzufügen</h3>
        <input
          type="text"
          value={newRecipeName}
          onChange={(e) => setNewRecipeName(e.target.value)}
          placeholder='Rezeptname'
        />
        <input
          type="text"
          value={newRecipeIngredients}
          onChange={(e) => setNewRecipeIngredients(e.target.value)}
          placeholder='Zutaten'
        />
        <input
          type="text"
          value={newRecipeInstructions}
          onChange={(e) => setNewRecipeInstuctions(e.target.value)}
          placeholder='Zubereitung'
        />
        <button onClick={handleAddRecipe}>Rezept hinzufügen</button>
      </div>

      {/* Rezeptliste oder Rezeptdetails anzeigen */}
      {!selectedRecipe ? (
        <RecipeList 
          recipes={recipes} 
          onSelectRecipe={handleSelectRecipe}
          onDeleteRecipe={handleDeleteRecipe}
          onOrderChange={handleOrderChange} 
        />
      ) : (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onBack={handleBackToList} 
          onUpdateRecipe={handleUpdateRecipe}
          onOrderChange={handleOrderChange} 
        />
      )}
      <h2>Bestellübersicht</h2>
      {handleViewOrders()}
    </div>
  );
};

export default App;

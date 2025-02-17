import React from 'react';

const RecipeList = ({ recipes, onSelectRecipe, onDeleteRecipe }) => {
  return (
    <div>
      <h2>Rezeptliste</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <button onClick={() => onSelectRecipe(recipe.id)}>
              {recipe.name}
            </button>
            <button onClick={() => onDeleteRecipe(recipe.id)}>Löschen</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;

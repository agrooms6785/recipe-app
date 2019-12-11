//this is my local js file
'use strict'

//  this is the test key for both APIs while in production stage
// let apiKey = '1'
// let mealURL =

//this function will allow the user to manually add items to shopping list
function manualAdd() {}

//this function will allow user to toggle through shopping list items to delete them
function deleteItems() {}

//this function will handle adding items to the shopping list
function addItems() {}

//this function will display additional search results when the button is clicked
function loadMore() {}

//this function will populate the shopping list based on ingredients selected
function displayShoppingList() {}

//this function will get full recipe info including inredients
function getDetails(responseJson) {
  console.log(`'getDetails' ran`)
  $('.details-button').on('click', function(event) {
    event.preventDefault()
    console.log(`button works!`)
    // $('button[name="details-button"]').addClass('hidden')
    $(this).next().removeClass('recipe-details-hidden')
  })
}

// this function will display the receipe search results in the DOM
function displayCocktailResults(responseJson) {
  console.log(`'displayCocktailResults' ran`)
  console.log(responseJson)
  $('.results').empty()
  $('.js-error-msg').empty()
  for (let i=0; i <responseJson.drinks.length; i++) {
    if (responseJson.drinks.length === 0) {
      $('.results').append(`No cocktails found by that name. Try again.`)
    } else {
      $('.results').append(`<h3>${responseJson.drinks[i].strDrink}</h3>
        <img class="results-thumbnail" src="${responseJson.drinks[i].strDrinkThumb}" alt="a thumbnail image of ${responseJson.drinks[i].strDrinkThumb}"><br>
        <button class="details-button" type="button" name="details-button">click for recipe details</button>
        <div class="recipe-details recipe-details-hidden">
          <p>Instructions: ${responseJson.drinks[i].strInstructions}</p><br>
        <ul class="ingredients-list">
          <li><input type="checkbox" name="ingredient">${responseJson.drinks[i].strIngredient1}, ${responseJson.drinks[i].strMeasure1}</li>
          <li><input type="checkbox" name="ingredient">${responseJson.drinks[i].strIngredient2}, ${responseJson.drinks[i].strMeasure2}</li>
          <li><input type="checkbox" name="ingredient">${responseJson.drinks[i].strIngredient3}, ${responseJson.drinks[i].strMeasure3}</li>
        </ul>
        </div>`)
    }
  }
  getDetails(responseJson)
}


//this function will display the receipe search results in the DOM
function displayRecipeResults(responseJson) {
  console.log(`'displayRecipeResults' ran`)
  console.log(responseJson)
  $('.results').empty()
  $('.js-error-msg').empty()
  for (let i=0; i <responseJson.meals.length; i++) {
    if (responseJson.meals.length === 0) {
      $('.results').append(`No recipes found by that name. Try again.`)
    } else {
      $('.results').append(`<h3>${responseJson.meals[i].strMeal}</h3>
        <img class="results-thumbnail" src="${responseJson.meals[i].strMealThumb}" alt="a thumbnail image of ${responseJson.meals[i].strMealThumb}"><br>
        <button class="details-button" type="button" name="details-button">click for recipe details</button>
        <div class="recipe-details recipe-details-hidden">
          <p>Instructions: ${responseJson.meals[i].strInstructions}</p><br>
        <ul class="ingredients-list">
          <li><input type="checkbox" name="ingredient">${responseJson.meals[i].strIngredient1}, ${responseJson.meals[i].strMeasure1}</li>
          <li><input type="checkbox" name="ingredient">${responseJson.meals[i].strIngredient2}, ${responseJson.meals[i].strMeasure2}</li>
          <li><input type="checkbox" name="ingredient">${responseJson.meals[i].strIngredient3}, ${responseJson.meals[i].strMeasure3}</li>
        </ul>
        </div>`)
    }
  }
  getDetails(responseJson)
}

// this function will fetch cocktail recipes from the CocktailDB API
function getCocktailRecipes(searchInput, responseJson) {
  console.log(`'getCocktailRecipes' has run`)
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(response.statusText)
    })
    .then(responseJson =>
      displayCocktailResults(responseJson))
    .catch(err => {
      $('.js-err-msg').append(`Something went wrong: ${err.message}`)
    })
}

//this function will fetch the recipes from the MealDB API
function getMealRecipes(searchInput) {
  console.log(`'getMealRecipes' has run`)
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(response.statusText)
    })
    .then(responseJson => {
      if (responseJson.meals === 0) {
         getCocktailRecipes(searchInput)
       } else {
        displayRecipeResults(responseJson)
      }
    })
    .catch(err => {
      $('.js-err-msg').append(`Something went wrong: ${err.message}`)
    })
}

//this function will handle the search submit
function handleSearch() {
  $('.js-submit').on('click', function(event) {
    console.log(`'handleSearch' has run`)
    event.preventDefault()
    let searchInput = $('input[name="search"]').val().toLowerCase()
    getMealRecipes(searchInput)
    $('#search-form')[0].reset()
  })
}

$(function() {
  console.log( "your app has loaded!" )
  handleSearch()
})

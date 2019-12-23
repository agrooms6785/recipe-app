//this is my local js file
'use strict'

// this function will display or hide the shopping list on smaller screens
function toggleShoppingList() {
  console.log(`'toggleShoppingList' ran`)
  $('.list-h2').on('click', function(event) {
    $('.list-open').toggleClass('list-closed')
  })
}

//this function will allow user to toggle through shopping list items to delete them
function deleteItems() {
  console.log(`'deleteItems' ran`)
}

//this function will allow the user to manually add items to shopping list
function manualAdd(newItem) {
  console.log(`'manualAdd' ran`)
  $('#shop-form').on('submit', function(event) {
    event.preventDefault()
    console.log(`'manualAdd' button works!`)
    const newItem = $('#shopping-list-manual-entry').val()
    $('.shop-list').append(`<li><input type="checkbox" name="list-ingredient" value="${newItem}" unchecked><label for="list-ingredient" class="strikeThis">${newItem}</label></li>`)
    $('#shop-form')[0].reset()
  })
}

// this function will handle adding items to the shopping list
function addItems(responseJson) {
  console.log(`'addItems' ran`)
  $('.add-to-list').on('click', function(event) {
    event.preventDefault()
    console.log(`'addItems' button works!`)
    $('.shopping-list-div').addClass('show-list')
    let checked = []
    $('input[name="ingredient"]:checked').map(function() {
      checked.push($(this).val())
    })
    for (let j=0; j<checked.length; j++) {
      $('.shop-list').append(`<li><input type="checkbox" name="list-ingredient" value="${checked[j]}" unchecked><label for="list-ingredient" class="strikeThis">${checked[j]}</label></li>`)
  }
    manualAdd()
    deleteItems()
  })
}

//this function will get full recipe info including inredients
function getDetails(responseJson) {
  console.log(`'getDetails' ran`)
  $('.details-button').on('click', function(event) {
    event.preventDefault()
    console.log(`'getDetails' button works!`)
    $(this).next().toggleClass('recipe-details-hidden')
  })
  addItems()
}

// this function will display the receipe search results in the DOM
function displayCocktailResults(responseJson) {
  console.log(`'displayCocktailResults' ran`)
  console.log(responseJson)
  for (let i=0; i <responseJson.drinks.length; i++) {
    if (responseJson.drinks.length === 0) {
      $('.results').append(`No cocktails found by that name. Try again.`)
    } else {
      $('.results').append(`<div id="recipe:${i}">
      <h3>${responseJson.drinks[i].strDrink}</h3>
      <img class="results-thumbnail" src="${responseJson.drinks[i].strDrinkThumb}" alt="a thumbnail image of ${responseJson.drinks[i].strDrinkThumb}"><br>
      <button class="details-button" type="button" name="details-button">click for recipe details</button>
      <div class="recipe-details recipe-details-hidden">
      <p>Instructions: ${responseJson.drinks[i].strInstructions}</p><br>
      <ul class="ingredients-list">
      <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.drinks[i].strIngredient1}">${responseJson.drinks[i].strIngredient1}, ${responseJson.drinks[i].strMeasure1}</li>
      <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.drinks[i].strIngredient2}">${responseJson.drinks[i].strIngredient2}, ${responseJson.drinks[i].strMeasure2}</li>
      <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.drinks[i].strIngredient3}">${responseJson.drinks[i].strIngredient3}, ${responseJson.drinks[i].strMeasure3}</li>
      </ul>
      <button class="add-to-list" type="button" name="add-to-list">add to shopping list</button>
      </div>
      </div>`)
    }
  }
  getDetails(responseJson)
}

//this function will display the receipe search results in the DOM
function displayRecipeResults(responseJson) {
  console.log(`'displayRecipeResults' ran`)
  console.log(responseJson)
  for (let i=0; i <responseJson.meals.length; i++) {
    if (responseJson.meals.length === 0) {
      $('.results').append(`No recipes found by that name. Try again.`)
    } else {
      $('.results').append(`<div id="recipe:${i}">
      <h3>${responseJson.meals[i].strMeal}</h3>
      <img class="results-thumbnail" src="${responseJson.meals[i].strMealThumb}" alt="a thumbnail image of ${responseJson.meals[i].strMealThumb}"><br>
      <button class="details-button" type="button" name="details-button">click for recipe details</button>
      <div class="recipe-details recipe-details-hidden">
      <p>Instructions: ${responseJson.meals[i].strInstructions}</p><br>
      <ul class="ingredients-list">
      <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.meals[i].strIngredient1}">${responseJson.meals[i].strIngredient1}, ${responseJson.meals[i].strMeasure1}</li>
      <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.meals[i].strIngredient2}">${responseJson.meals[i].strIngredient2}, ${responseJson.meals[i].strMeasure2}</li>
      <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.meals[i].strIngredient3}">${responseJson.meals[i].strIngredient3}, ${responseJson.meals[i].strMeasure3}</li>
      <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.meals[i].strIngredient4}">${responseJson.meals[i].strIngredient4}, ${responseJson.meals[i].strMeasure4}</li>
      <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.meals[i].strIngredient5}">${responseJson.meals[i].strIngredient5}, ${responseJson.meals[i].strMeasure5}</li>
      <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.meals[i].strIngredient6}">${responseJson.meals[i].strIngredient6}, ${responseJson.meals[i].strMeasure6}</li>
      <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.meals[i].strIngredient7}">${responseJson.meals[i].strIngredient7}, ${responseJson.meals[i].strMeasure7}</li>
      <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.meals[i].strIngredient8}">${responseJson.meals[i].strIngredient8}, ${responseJson.meals[i].strMeasure8}</li>
      <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.meals[i].strIngredient9}">${responseJson.meals[i].strIngredient9}, ${responseJson.meals[i].strMeasure9}</li>
      <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.meals[i].strIngredient10}">${responseJson.meals[i].strIngredient10}, ${responseJson.meals[i].strMeasure10}</li>
      </ul>
      <button class="add-to-list" type="button" name="add-to-list">add to shopping list</button>
      </div>
      </div>`)
    }
  }
  getDetails(responseJson)
}


// this function will fetch cocktail recipes from the CocktailDB API
function getCocktailRecipes(searchInput, responseJson) {
  console.log(`'getCocktailRecipes' has run`)
  fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${searchInput}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(response.statusText)
    })
    .then(responseJson => {
      if (responseJson.drinks === null) {
        $('.js-err-msg').append(`No results found. Try a new search.`)
      } else {
      displayCocktailResults(responseJson)
    }
  })
      .catch(err => {
        $('.js-err-msg').append(`Something went wrong: ${err.message}`)
      })
      $('.results').empty()
      $('.js-err-msg').empty()
    }

//this function will fetch the recipes from the MealDB API
function getMealRecipes(searchInput, responseJson) {
      console.log(`'getMealRecipes' has run`)
      fetch(`https://www.themealdb.com/api/json/v2/9973533/search.php?s=${searchInput}`)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error(response.statusText)
        })
        .then(responseJson => {
          if (responseJson.meals === null) {
            getCocktailRecipes(searchInput)
          } else {
            displayRecipeResults(responseJson)
          }
        })
        .catch(err => {
          $('.js-err-msg').append(`Something went wrong: ${err.message}`)
        })
        $('.results').empty()
        $('.js-err-msg').empty()
      }

//this function will handle the search submit
function handleSearch() {
  $('.js-submit').on('click', function(event) {
  console.log(`'handleSearch' has run`)
  event.preventDefault()
  if (!$('input[name="search"]').val()) {
    alert('Search term required')
  } else {
  let searchInput = $('input[name="search"]').val().toLowerCase()
  getMealRecipes(searchInput)
}
  $('#search-form')[0].reset()
  })
}

$(function() {
  console.log( "your app has loaded!" )
  handleSearch()
  toggleShoppingList()
})

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

//this function will display the receipe search results in the DOM
function displayResults(responseJson, searchInput) {
  console.log(`'displayResults' ran`)
  console.log(responseJson.message)
}

//this function will fetch cocktail recipes from the CocktailDB API
// function getCocktailRecipes(searchInput) {
//   console.log(`'getCocktailRecipes' has run`)
// }

//this function will fetch the recipes from the MealDB API
function getMealRecipes(searchInput) {
  console.log(`'getMealRecipes' has run`)
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response => {
      if (response.ok) {
        console.log(response.json())
        return response.json()
      }
      throw new Error(response.statusText)
    })
    .then(responseJson =>
      // console.log(responseJson))
      displayResults(responseJson, searchInput))
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
    // getCocktailRecipes(searchInput)
    $('#search-form')[0].reset()
  })
}

$(function() {
  console.log( "your app has loaded!" )
  handleSearch()
})

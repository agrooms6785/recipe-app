//this is my local js file
'use strict'

// this function will display or hide the shopping list on smaller screens
function toggleShoppingList() {
  console.log(`'toggleShoppingList' ran`)
  $('.list-h2').on('click', function(event) {
    $('.list-open').toggleClass('list-closed')
  })
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
  })
}

//this function will get full recipe info including inredients
function getDetails(responseJson) {
  console.log(`'getDetails' ran`)
  $('.details-button').on('click', function(event) {
    event.preventDefault()
    console.log(`'getDetails' button works!`)
    $('div.recipe-details').toggleClass('recipe-details-hidden')
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
      $('.results').append(`<h3>${responseJson.drinks[i].strDrink}</h3>
      <img class="results-thumbnail" src="${responseJson.drinks[i].strDrinkThumb}" alt="a thumbnail image of ${responseJson.drinks[i].strDrinkThumb}"><br>
      <button class="details-button" type="button" name="details-button">click for cocktail recipe details</button>
      <div class="recipe-details recipe-details-hidden">
      <p>Instructions: ${responseJson.drinks[i].strInstructions}</p><br>
      <button class="add-to-list" type="button" name="add-to-list">add to shopping list</button>
      </div>`)

      for (let a=1; a<16; a++) {
        if (responseJson.drinks[i]["strIngredient" + a] !== null && responseJson.drinks[i]["strIngredient" + a] !== "") {
          $('.results').append(`<div class="recipe-details recipe-details-hidden">
            <ul class="ingredients-list">
            <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.drinks[i]["strIngredient" + a]}">${responseJson.drinks[i]["strIngredient" + a]}, ${responseJson.drinks[i]["strMeasure" + a]}</li>
            </ul>
            </div>`)
          }
        }
      }
    }
  getDetails(responseJson)
}

//this function will create the DOM elements to be added in the display function
function createDomElements(newDataArr) {
  console.log(`'createDomElements' ran`)
	// for (let i = 0; i < newDataArray.length; i++) {
	// 	$('.results').append(TK)
	// }
}

//this function adds the ingredients and measurements into new arrays
function addIngredients(newDataArr) {
  console.log(`'addIngredients' ran`)
	return new Promise(function (fulfill, reject) {
    for (let i = 0; i < responseJson.meals.length; i++) {
      for (let a = 0; a < 20; a++) {
        if (responseJson.meals[i]["strIngredient" + a] !== null && responseJson.meals[i]["strIngredient" + a] !== "") {
          newDataArr[i].ingredients.push(responseJson.meals[i]["strIngredient" + a])
          newDataArr[i].measurements.push(responseJson.meals[i]["strMeasure" + a])
        }
      }
    }
		setTimeout(() => {
			fulfill(newDataArr)
      // console.log('final data', newDataArray)
		}, 800)
    console.log('final data', newDataArr)
	})
}

// this function creates a new array with the recipe portions I'm using
function sortObj(rawObj) {
  console.log(`'sortObj' ran`)
  let newDataArr = []
	return new Promise(function (fulfill, reject) {
		for (let i = 0; i < rawObj.meals.length; i++) {
			newDataArr.push({
				meal: rawObj.meals[i].strMeal,
				instructions: rawObj.meals[i].strInstructions,
				thumb: rawObj.meals[i].strMealThumb,
				ingredients: [],
				measurements: []
			})
		}
		if (newDataArr.length !== rawObj.meals.length) {
			setTimeout(() => {
				fulfill(newDataArr)
				console.log('setTimeout new data', newDataArr)
			}, 300)
		} else {
			fulfill(newDataArr)
      console.log('new data', newDataArr)
		}
	})
}

//this function will display the receipe search results in the DOM
function displayRecipeResults(responseJson) {
  console.log(`'displayRecipeResults' ran`)
  console.log(responseJson)
  for (let i=0; i <responseJson.meals.length; i++) {
	if (responseJson.meals.length !== 0) {
		sortObj(responseJson).then(resultingObject => {
      console.log(resultingObject)
			// example:
			// resultingObject = [{
			// 		meal: obj.meals[i].strMeal,
			// 		instructions: obj.meals[i].strInstructions,
			// 		thumb: obj.meals[i].strMealThumb,
			// 		ingredients: [],
			// 		measurements: []
			// }, {}, {}]
			addIngredients(resultingObject).then(finalResult => {
				createDomElements(finalResult)
			})
		})
	} else {
		// message user
		$('.results').append(`No recipes found by that name. Try again.`)
	}
}
  getDetails(responseJson)
}

// function displayRecipeResults(responseJson) {
  // console.log(`'displayRecipeResults' ran`)
  // console.log(responseJson)
//   sortObj(responseJson)
//   createRecipeList(data)
  // for (let i=0; i <responseJson.meals.length; i++) {
  //   if (responseJson.meals.length === 0) {
  //     $('.results').append(`No recipes found by that name. Try again.`)
  //   } else {
  //     $('.results').append(`<div id="recipe_${i}"><h3>${responseJson.meals[i].strMeal}</h3>
  //     <img class="results-thumbnail" src="${responseJson.meals[i].strMealThumb}" alt="a thumbnail image of ${responseJson.meals[i].strMealThumb}"><br>
  //     <button class="details-button" type="button" name="details-button">click for recipe details</button>
  //     <div class="recipe-details recipe-details-hidden">
  //     <p>Instructions: ${responseJson.meals[i].strInstructions}</p><br>
  //     <button class="add-to-list" type="button" name="add-to-list">add to shopping list</button>
  //     <ul class="ingredients-list">
  //     </div>`)
  //
  //     let listItem = ''
  //       for (let a=1; a<21; a++) {
  //         if (responseJson.meals[i]["strIngredient" + a] !== null && responseJson.meals[i]["strIngredient" + a] !== "") {
  //           listItem += '<li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.meals[i]["strIngredient" + a]}">${responseJson.meals[i]["strIngredient" + a]}, ${responseJson.meals[i]["strMeasure" + a]}</li>'
  //         }
  //     }
  //           $('.ingredients-list').append(listItem)
  //             // $('.results').append(`<div class="recipe-details recipe-details-hidden">
  //             // <li><input type="checkbox" class="cb-class" name="ingredient" value="${responseJson.meals[i]["strIngredient" + a]}">${responseJson.meals[i]["strIngredient" + a]}, ${responseJson.meals[i]["strMeasure" + a]}</li>
  //             $('.results').append(`</ul>
  //             </div>
  //             </div>`)
  //
  //   }
  // }
//   getDetails(responseJson)
// }

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

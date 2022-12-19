const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.mealDetailsContent');
const IngredientCloseBtn = document.getElementById('closeButton');
let random = document.querySelector('.randomImage');333

// event listeners
searchBtn.addEventListener('click', GetMealList);
mealList.addEventListener('click', getFoodIngredient);
IngredientCloseBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.classList.remove('showIngredient');
});


// Getting meal list on search with category
function GetMealList() {
  function changeColor(color) {
    document.body.style.background = color;
  }
  changeColor('black');
  let searchInputTxt = document.getElementById('search-input').value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = '';
      if (data.meals) {
        document.getElementById('result').innerText = `Your Search Results :`;
        data.meals.forEach((meal) => {
          html += `
                <div class = "mealItem" data-id = "${meal.idMeal}">
                <div class = "mealImage">
                <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "mealName">
                <h3>${meal.strMeal}</h3>
                <a href = "#" class = "IngredientButton">Get Ingredients</a>
                </div>
                </div>
                `;
        });
        mealList.classList.remove('notFound');
      } else {
        document.getElementById('result').innerText = ``;
        html = "Sorry, we coudn't find what you are looking for!";
        mealList.classList.add('notFound');
      }
      mealList.innerHTML = html;
    });
}

// Gettting ingredients for the meal from the API
function getFoodIngredient(a) {
  a.preventDefault();
  if (a.target.classList.contains('IngredientButton')) {
    let mealItem = a.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealIngredientModal(data.meals));
  }
}

//Creating a modal
function mealIngredientModal(meal) {
  meal = meal[0];

  let html = `
        <h1 class = "IngredientTitle">${meal.strMeal}</h1> 
        <p class = "IngredientCategory">${meal.strCategory}</p>
        <div class = "Ingredients">
            <h3>Everything you need for <h3 class="justColorChange">${meal.strMeal}</h3></h3><br>`;
  for (let i = 1; i <= 20; i++) {
    let ingredient = 'strIngredient' + i;
    if (meal[ingredient] != '')
      html += `<p style="font-size: 25px";>${meal[ingredient]}</p>`;
  }
  html += `
        </div>
        <div class = "IngredientMealImage">
            <a href = "${meal.strYoutube}" target = "_blank"><img src = "${meal.strMealThumb}" alt = ""></a>
            <p style="font-size: 15px";>*Click on the image to watch tutorial</p>
        </div>
    `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showIngredient');
}

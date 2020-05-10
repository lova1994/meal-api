const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');


// Search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();

    // Clear sngle meal

    single_mealEl.innerHTML = '';

    // Get search term
    const term = search.value;
    console.log(term)


    // Check for empty

    if(term.trim()) {
        
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            resultHeading.innerHTML = `<h2> Search results for '${term}'`;

            if(data.meals === null){


                resultHeading.innerHTML = `<p> There are no search results. Try again </p>`
            } else {

               
                
                mealsEl.innerHTML = data.meals.map(meal => `
                
                <div class="meal">
                <img src="${meal.strMealThumb}"  alt=${meal.strMeal}>
                <div class="meal-info" data-mealid="${meal.idMeal}"> 
                <h3>${meal.strMeal}</h3>
                </div>
                </div>
                `)
                .join('');
                
            }
        })

    } else {

        alert("ERRROOOORRR!!!")

    }
}



// Event listeners
    
submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false
        }
        
    });

   if(mealInfo) {
       const mealID = mealInfo.getAttribute('data-mealid')
       console.log(mealID)

   }
});

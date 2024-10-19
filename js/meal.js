$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const idMeal = urlParams.get('meal-id');
    
    $.getJSON(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`, function(data) {
        const meal = data.meals[0];

        const ingredients = processIngredients(meal)

        const youtubeId = meal.strYoutube.split('v=')[1] // take video id from youtube url
        const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}`
        const rating = meal.strMeal.length % 5 + 1

        $('.title').text(meal.strMeal);
        $('#category').text(meal.strCategory);
        $('#crumbs-category').text(meal.strCategory);
        $('#crumbs-category').attr('href', `/category.html?category=${meal.strCategory}`);
        $('#area').text(meal.strArea);
        $('#instruction').text(meal.strInstructions);
        $('#rating').text(`${rating.toPrecision(2)}`);
        $('iframe').attr('src', youtubeUrl)
        $('#thumbnail').attr('src', meal.strMealThumb)

        ingredients.forEach( ingredient => {
            $('#ingredients').append(`<li>${ingredient}</li>`)
        })
    });

});

function processIngredients(meal) {
    const ingredients = [];
    
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }
    
    return ingredients;
}
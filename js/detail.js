$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('category');
    
    $('#category-title').text(`${categoryName} meals`);
    $('#crumbs-category').text(`${categoryName}`);
    
    $.getJSON(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`, function(data) {
        const meals = data.meals;
    
        meals.forEach(function(meal) {
            const rating = meal.strMeal.length % 5 + 1
            $('#meal-list').append(`
                <div onclick="redirectToMeal('${meal.idMeal}')"
                class="menu-card hover:-translate-y-1 duration-300 bg-white hover:cursor-pointer w-full">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-3/5 md:h-auto">
                    <div class="p-4 flex flex-col gap-2">
                        <p class="text-xl font-semibold">${meal.strMeal}</p>
                        <span class="text-yellow-400 items-center flex gap-1">
                        <i class="material-icons">star</i> ${rating.toPrecision(2)}
                        </span>
                    </div>
                </div>
            `);
        });
    });

});

function redirectToMeal(idMeal) {
    window.location.href = `/meal.html?meal-id=${idMeal}`;
}
$(document).ready(function() {
    $.getJSON("https://www.themealdb.com/api/json/v1/1/categories.php", function(data) {
        const categories = data.categories;

        categories.forEach(function(category) {
            const card = `
            <div onclick="redirectToCategory('${category.strCategory}')"
            class="card hover:cursor-pointer hover:-translate-y-1 duration-300 relative rounded-xl min-h-28 overflow-hidden flex items-center justify-center">
                <img src="${category.strCategoryThumb}" alt="card"
                class="absolute w-full z-0 duration-500">
                <div class="absolute top-0 w-full h-full bg-black/50 z-20 flex items-center justify-center">
                    <p class="z-20 text-xl text-white font-semibold text-center">${category.strCategory}</p>
                <div/>
            </div>`

            $("#categories-list").append(card);
        });
    });
});

function redirectToCategory(categoryName) {
    window.location.href = `/category.html?category=${categoryName}`;
}

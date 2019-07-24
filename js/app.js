'use strict';

var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'usb', 'water-can', 'wine-glass'];
var productImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var allProducts = [];
var totalClicks = 0;
var randomProducts = [];

function Product() {
    this.name = name;
    this.imageUrl = 'img/';
    this.clicks = 0;
    this.views = 0;
    allProducts.push(this);
};

function createProducts() {
    for (var i = 0; i < productNames.length; i++) {
        new Product(productNames[i]);
        allProducts[i].name = productNames[i];
        allProducts[i].imageUrl += productImages[i];
    }
}

function randomImage() {
    return Math.floor(Math.random() * allProducts.length);
}

function createRandomImages() {
    var product1 = allProducts[randomImage()];
    var product2 = allProducts[randomImage()];
    while (product1 === product2) {
        product2 = allProducts[randomImage()];
    }
    var product3 = allProducts[randomImage()];
    while (product2 === product3 || product3 === product1) {
        product3 = allProducts[randomImage()];
    }
    randomProducts = [];
    randomProducts.push(product1);
    randomProducts.push(product2);
    randomProducts.push(product3);
    product1.views++;
    product2.views++;
    product3.views++;
}

function render() {
    var productSection = document.getElementById('products');
    productSection.innerHTML = '';
    createRandomImages();
    for (var i = 0; i < 3; i++) {
        var imageHolder = document.createElement('img');
        imageHolder.setAttribute('src', randomProducts[i].imageUrl);
        imageHolder.setAttribute('data-name', randomProducts[i].name);
        imageHolder.addEventListener('click', handleVote);
        imageHolder.setAttribute('width', '325px');
        imageHolder.setAttribute('height', '325px');
        
        productSection.appendChild(imageHolder);
    }
}

function handleVote(event) {
    var selectedProduct = event.target.dataset.name;
    for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name === selectedProduct) {
            allProducts[i].clicks++;
            totalClicks++;
            render();
        }
    }
    if (totalClicks === 25) {
        var imgs = document.getElementsByTagName('img');
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].removeEventListener('click', handleVote);
        }
        getResults();
        showChartResults();
    } 
    // console.table(allProducts);
	// console.log('Total Clicks', totalClicks);
}

function getResults() {
    var resultsLocation = document.getElementById('results');
    var resultsList = document.createElement('ul');
    for (var i = 0; i < allProducts.length; i++) {
        // console.log (i);

        var productResults = document.createElement('li');

        productResults.textContent = allProducts[i].name + ' has ' + allProducts[i].clicks + ' votes.';
        resultsList.appendChild(productResults);
    }
    resultsLocation.appendChild(resultsList);
} 

function showChartResults(){
    var canvas = document.getElementById ('productChart')

    canvas.style.display = 'block';

    var voteCounts = [];

    for (var i = 0; i < allProducts.length; i++){  
        voteCounts.push(allProducts[i].clicks);
    } 
    var ctx = canvas.getContext('2d');
    new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: productNames,
            datasets: [{
                label: 'Product',
                data: voteCounts,
                backgroundColor:
                'rgb(29,56,77)',
                borderColor: 'rgb(255, 99, 132)',
                
            }]
        },
        // Configuration options go here
        options: {
            responsive: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        }
                    }
                ]
            },
            title:{
                display: true,
                text: 'Voting Results For Products',
            }
        }
});
}

createProducts();
render();
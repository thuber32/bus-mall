'use strict';
window.addEventListener("load", checkSaved);



var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'usb', 'water-can', 'wine-glass'];
var productImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var productDescription = ['R2D2 Bag', 'Banana Slicer','Bathroom Stand', 'Toeless Boots', 'All-n-1 Breakfast', 'Meatball Gum', 'Chair', 'Cthulhu', 'Dog Muzzle', 'Dragon Meat', 'Pen Utensil', 'Pet Costume', 'Pizza Scissors', 'Shark Sleeping Bag', 'Baby Costume', 'Tauntaun nap mat', 'USB Stick', 'Water Can', 'Wine Glass'];
var allProducts = [];
var totalClicks = 0;
var randomProducts = [];


function Product() {
    this.name = name;
    this.imageUrl = 'img/';
    this.description = '';
    this.clicks = 0;
    this.views = 0;
    allProducts.push(this);
};

// creating the products
function createProducts() {
    for (var i = 0; i < productNames.length; i++) {
        new Product(productNames[i]);
        allProducts[i].name = productNames[i];
        allProducts[i].imageUrl += productImages[i];
        allProducts[i].description = productDescription[i];
        // console.log(allProducts[i]);
    }
}

function randomProduct() {
    return Math.floor(Math.random() * allProducts.length);
}

function render() {
    var productSection = document.getElementById('products');
    productSection.innerHTML = '';
 
    var randomProducts = [];

    for (var i = 0; i < displayNumber; i++) {
        var product = randomProduct();
        while (randomProducts.includes(product) || lastShown.includes(product)) {
            product = randomProduct();
        }
        randomProducts.push(product);
    }
        
    lastShown = randomProducts;    
       
    for (var i = 0; i < displayNumber ; i++) {
        allProducts[randomProducts[i]].views++;
        var imageHolder = document.createElement('div');
        imageHolder.setAttribute('class', 'image ' + allProducts[randomProducts[i]].name);
        imageHolder.setAttribute('data-name', allProducts[randomProducts[i]].name);
        imageHolder.addEventListener('click', handleVote);
        productSection.appendChild(imageHolder);
    } 
}
//
function handleVote(event) {
    var selectedProduct = event.target.dataset.name;
    for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name === selectedProduct) {
            allProducts[i].clicks++;
            localStorage.setItem
            totalClicks++;
            render();
        }
    }
    if (totalClicks === 25) {
        var imgs = document.getElementsByClassName('image');
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].removeEventListener('click', handleVote);
        }
        getResults(allProducts);
        showChartResults(allProducts);
        saveResults();
    } 
    // console.table(allProducts);
	// console.log('Total Clicks', totalClicks);
}

function getResults() {
    var resultsLocation = document.getElementById('results');
    var resultsList = document.createElement('ul');
    for (var i = 0; i < allProducts.length; i++) {
        console.log (i);

        var productResults = document.createElement('li');
        productResults.textContent = allProducts[i].name + ' has ' + allProducts[i].clicks + ' votes.';
        resultsList.appendChild(productResults);
    }
    resultsLocation.appendChild(resultsList);
    
} 

function showChartResults(productArray){           
    var canvas = document.getElementById ('productChart')

    canvas.style.display = 'block';

    var voteCounts = [];

    for (var i = 0; i < productArray.length; i++){  
        voteCounts.push(productArray[i].clicks);
    } 
    
    var ctx = canvas.getContext('2d');
    new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: productNames,
            datasets: [{
                label: 'votes',
                data: voteCounts,
                backgroundColor:
                'rgb(29,56,77)',
                borderColor: 
                'rgb(255, 99, 132)',
            }]
        },
        // Configuration options go here
        options: {
            responsive: true,
            layout: {
                padding: {
                  left: 25,
                  right: 50,
                  top: 100,
                  bottom: 0
                }
            },
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


function saveResults (){
    localStorage.setItem ('results', JSON.stringify(allProducts)); 
}

function checkSaved(){                                                          //checking to see if results are saved in local storage
    var storedResults = JSON.parse(localStorage.getItem('results'))
    if (storedResults && storedResults.length) { // If storedResults is not empty
        // post the results and show the chart
        getResults(storedResults);
        showChartResults(storedResults); 
    }
    else { // otherwise, create the products and render
        createProducts();
        render();
    }
}


var reStart = document.querySelector('button[type="button"]');
reStart.addEventListener('click', function resetButton(event){
    localStorage.clear();
    
});


'use strict';

var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'usb', 'water-can', 'wine-glass'];
var allProducts = [];
var totalClicks = 0;
var randomProducts = [];

function Product(name) {
    this.name = name;
    this.imageUrl = '/img/' + name + '.jpg';
    this.clicks = 0;
    this.views = 0;
    allProducts.push(this);
};

function createProducts() {
    for (var i = 0; i < productNames.length; i++) {
        new Product(productNames[i]);
    }
};

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
};

function render() {

    var productSection = document.getElementById('products');
    productSection.innerHTML = '';
    createRandomImages();
    for (var i = 0; i < 3; i++) {
        var img = document.createElement('img');
        img.setAttribute('src', randomProducts[i].imageUrl);
        img.setAttribute('data-name', randomProducts[i].name);
        img.addEventListener('click', handleVote);
        productSection.appendChild(img);
    }
};

function handleVote(event) {
    var productName = event.target.dataset.name;
    for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name === productName) {
            allProducts[i].clicks++;
            totalClicks++;
        }
    }
    if (totalClicks === 25) {
        //    var img = getElementById('img');
        //    img.removeEventListener('click',handleVote);
        // }
        // render();
        console.table(allProducts);
    }
}
    function getResults() {
        var results = document.getElementById('results');
        var ul = document.createElement(ul);
        for (var i = 0; i < allProducts.length; i++) {
            var product = allProducts[i];
            var li = getElementById('li');
            li.contentText = product.name + ' has ' + product.clicks + 'votes.';
            ul.appendChild(li);
        }
    }
    createProducts();
    render();
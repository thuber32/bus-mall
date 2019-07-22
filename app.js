'use strict';

var productName = ['bag','banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'usb', 'water-can', 'wine-glass'];
var allProducts= [];
var totalClicks = 0;

function Product(productName, imageUrl, clicks, views) {
    this.productName = productName;
    this.imageUrl = 'bus-mall/img/' + name + '.jpg';
    this.clicks = 0;
    this.views = 0;
    allProducts.push(this);
};

function randomImage (){
    return Math.floor(Math.random() * allProducts.length);
}

function createRandomImages(){
    var product1 = randomImage();
    var product2 = randomImage();
      while(product1 === product2) {
          product2 = randomImage();
      }
      var product3 = randomImage();
      while(product2 === product3 || product3 === product1) {
          product3 = randomImage();
      }
}

function render(){
  var productSection = document.getElementsById('products');
  productSection.innerText= '';
  createRandomImages();
  for (var i=0; i < 3; i++){
      var img = document.createElementById('img');
      img.setAttribute('src=',allProducts[i].imageUrl);
      img.setAttribute('data-name',allProducts[i].name);
      img.addEventListener('clicks',handleVote);
      productSection.appendChild(img);
  }  
};

function handleVote(event) {
    var productName = event.target.dataset.name;
    for (var i = 0; i < allProducts.length; i++){
        if (allProducts[i].name === productName){
            allProducts [i].clicks++;
            totalClicks ++;
        }
    }
};
 if (totalClicks === 25) {
     var img = document.getElementById ('img');
     for (var i = 0; i < img.length; i++){
         img[i].removeEventListener('clicks', handleVote);
     }
 }  getResults();

 function getResults() {
    var results = getElementById('clicks');
    var ul = createElement (ul);
    for (var i = 0; i < allProducts.length; i++){
        var product = allProducts[i];
        var li = getElementById('li');
        li.contentText = product.name + ' has ' + product.clicks + 'votes.';
        ul.appendChild(li);
    } 
    results.appendChild(ul);
 }


handleVote();
render();

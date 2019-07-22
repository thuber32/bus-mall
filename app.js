'use strict';

var productName = ['bag','banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'usb', 'water-can', 'wine-glass'];
var allProducts= [];

function Product(name) {
    this.name = 'name';
    this.imageUrl = '../img/' + name + '.jpg';
    this.clicks = 0;
    this.views = 0;
    allProducts.push(push);
}

//create prototypes to for methods of product
Product.prototype.render()= 

function render(){
  var productSection = document.getElementsByClassName('products');
  for (var i=0; i < allProducts.length; i++){
      var img = document.createElementById(img);
      img.setAttribute(src,allProducts[i].imageUrl)
      img.setAttribute('data-name',allProducts[i].name)
      img.addEventListener('click',handleVote)
      productsSection.appendChild(img);
  }  
};
console.table(productSection);

function handleVote(event) {
    var productName = event.target.dataset.name;
    for (var i = 0; i < allProducts.length; i++){
        if (allProducts[i].name === productName){
            allProducts [i].clicks ++
            totalClicks ++
        }
    }
};
handleVote();
render();

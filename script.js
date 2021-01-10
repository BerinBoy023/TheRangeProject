//GET HTML ELEMENTS
const productContainer = document.getElementById('product-container');
const sortName = document.getElementById('sortName');
const sortPrice = document.getElementById('sortPrice');
const sortReview = document.getElementById('sortReview');
const sortSaving = document.getElementById('sortSaving');
//
let newArr = [];
let clickedName = false;
let clickedPrice = false;
let clickedReview = false;
let clickedSaving = false;
// FETCH THE DATA
const loadData = async()=>{
        clickedName = false;
        clickedPrice = false;
        clickedReview = false;
    try{
        const res = await fetch('./data/product.json')
        const data = await res.json()
        newArr = data.product_arr
        initialize(newArr)
    }
    catch (err){
        console.log(err);
        
    }
} 
//SORT THE ARRAY BY PRICE
sortPrice.addEventListener('click',()=>{
    clickedPrice = !clickedPrice
    clickedName = false;
    clickedReview = false;
    clickedSaving = false;
   if(clickedPrice){ 
       // CHANGE THE COLOR OF BUTTONS FOR EASIER MANAGING
       document.getElementById('sortPrice').style.backgroundColor = 'orange'
       document.getElementById('sortName').style.backgroundColor = 'transparent'
       document.getElementById('sortReview').style.backgroundColor = 'transparent'
       document.getElementById('sortSaving').style.backgroundColor = 'transparent'
       let sortPrice = newArr.sort((a, b)=>{
          return a.price - b.price
       })
       initialize(sortPrice)
   }
   if(!clickedPrice){
       document.getElementById('sortPrice').style.backgroundColor = 'transparent'

        loadData();   
   }
})
//SORT THE ARRAY BY REVIEW
sortReview.addEventListener('click',()=>{
    clickedReview = !clickedReview;
    clickedPrice = false;
    clickedName = false;
    clickedSaving = false;
    if(clickedReview){
       // CHANGE THE COLOR OF BUTTONS FOR EASIER MANAGING
        document.getElementById('sortPrice').style.backgroundColor = 'transparent'
       document.getElementById('sortName').style.backgroundColor = 'transparent'
       document.getElementById('sortReview').style.backgroundColor = 'orange'
       document.getElementById('sortSaving').style.backgroundColor = 'transparent'
       let sortReview = newArr.sort((a, b)=>{
          return b.reviews - a.reviews
       })
       initialize(sortReview)
    }
    if(!clickedReview){
       document.getElementById('sortReview').style.backgroundColor = 'transparent'

        loadData();
       }
})
//SORT THE ARRAY BY NAME
sortName.addEventListener('click',()=>{
    clickedName = !clickedName;
    clickedPrice = false;
    clickedSaving = false;
    clickedReview = false;
   if(clickedName){
       // CHANGE THE COLOR OF BUTTONS FOR EASIER MANAGING
         document.getElementById('sortPrice').style.backgroundColor = 'transparent'
       document.getElementById('sortName').style.backgroundColor = 'orange'
       document.getElementById('sortReview').style.backgroundColor = 'transparent'
       document.getElementById('sortSaving').style.backgroundColor = 'transparent'
       let sortName = newArr.sort((a, b)=>{
           if(a.name < b.name) { return -1; }
           if(a.name > b.name) { return 1; }
           return 0;
       })
       initialize(sortName)
   }
   if(!clickedName){
       document.getElementById('sortName').style.backgroundColor = 'transparent'

       loadData();
    }
})
//SORT THE ARRAY BY SAVING
sortSaving.addEventListener('click',async()=>{
    await loadData();
    clickedSaving = !clickedSaving;
    clickedName = false;
    clickedPrice = false;
    clickedReview = false;
   if(clickedSaving){
       // CHANGE THE COLOR OF BUTTONS FOR EASIER MANAGING
       document.getElementById('sortPrice').style.backgroundColor = 'transparent'
       document.getElementById('sortName').style.backgroundColor = 'transparent'
       document.getElementById('sortReview').style.backgroundColor = 'transparent'
       document.getElementById('sortSaving').style.backgroundColor = 'orange'
    let sortSaving = newArr.sort((a, b)=>{
        return a.was_price - b.price
        })
        initialize(sortSaving.reverse())
   }
   if(!clickedSaving){
       document.getElementById('sortSaving').style.backgroundColor = 'transparent'

        loadData();
    }
})
//ADD DATA TO APP
const initialize=(newArr)=>{
    const htmlString = newArr.map((item)=> {
        return `
            <li class='product-card'>
                <img src='./img/${item.img}.jpg' alt='${item.name}'></img>
                <h3 class='product-name'>${item.name}</h3>
                <p class='product-price'>£${(item.price/100).toFixed(2)}</p>
                ${item.was_price ? (`<p class='was-price'>Was <span>£${(item.was_price/100).toFixed(2)}</span></p>`) : '<p class="invisible">Was £</p>'}
                ${item.reviews ? (`<p class='product-reviews'>${item.reviews}% Review Score</p>`) : '<p class="invisible">% Review Score</p>'}
                <button class="product-button">Add To Basket</button>
            </li>`  
    }).join('')
    productContainer.innerHTML = htmlString;
    return;
}
loadData();
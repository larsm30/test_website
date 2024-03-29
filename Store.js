
updateCartTotal()

var deleteButtons = document.getElementsByClassName('deleteButton')
for (var i = 0 ; i < deleteButtons.length ; i++){
    var Button = deleteButtons[i]
    Button.addEventListener('click', removeItemFromCart)
}


var quantityInputs = document.getElementsByClassName('Quantity')
for (var i = 0 ; i < quantityInputs.length ; i++){
    var input = quantityInputs[i]
    input.addEventListener('change',QuantityChanged)
}

var AddToCartButtons = document.getElementsByClassName('AddButton')
for (var i = 0 ; i < AddToCartButtons.length ; i++){
    var AddButton = AddToCartButtons[i]
    AddButton.addEventListener('click', AddToCart)
}





function AddToCart(event){
    var addButton = event.target
    var addedItem = addButton.parentElement
    var Title = addedItem.getElementsByClassName("itemTitle")[0].innerText
    var Price = addedItem.getElementsByClassName("itemPrice")[0].innerText
    var Imgsrc = addedItem.getElementsByClassName("itemPicture")[0].src
    console.log(Title,Price,Imgsrc)
    AddItemToCart(Title,Price,Imgsrc)
    updateCartTotal()
}

function AddItemToCart(title,price,imgsrc){
    var newCartRow = document.createElement('div')
    newCartRow.classList.add("cartRow")
    var cartRowContainers = document.getElementsByClassName('cartRowContainer')[0]
    cartItemNames = cartRowContainers.getElementsByClassName("itemTitleCart")
    for(var i = 0; i < cartItemNames.length;i++){
        if(cartItemNames[i].innerText == title){
            alert("dit item zit al in je winkelmandje")
            return
        }   
    }
    var cartRowContents = 
        `<img src="${imgsrc}" class="itemPictureCart">
            <div  class="itemTitleCart"> ${title}</div>
            <div class="itemPriceCart"> ${price}</div>
            <input type="number" value="1" class="Quantity">
            <button class="deleteButton">verwijder</button>`
    newCartRow.innerHTML = cartRowContents
    cartRowContainers.append(newCartRow)
    newCartRow.getElementsByClassName("deleteButton")[0].addEventListener('click',removeItemFromCart)
    newCartRow.getElementsByClassName("Quantity")[0].addEventListener('change',QuantityChanged)
}


function QuantityChanged(event){
    var input = event.target
    if(input.value <= 0 || isNaN(input.value) ){
        input.value = 1
        return
    }
    updateCartTotal()
}


function removeItemFromCart(event){
    var ButtonClicked = event.target
    ButtonClicked.parentElement.remove()
    updateCartTotal()

}

function updateCartTotal(){
    var CartRowContainer = document.getElementsByClassName('cartRowContainer')[0]
    var CartRows = CartRowContainer.getElementsByClassName('cartRow')
    total = 0
    for(var i = 0; i < CartRows.length;i++){
        var cartRow = CartRows[i]
        var priceElement = cartRow.getElementsByClassName("itemPriceCart")[0]
        var QuantityElement = cartRow.getElementsByClassName("Quantity")[0]
        var price = parseFloat(priceElement.innerText.replace('€',''))
        var quantity = QuantityElement.value
        total = total + price * quantity
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("totalPrice")[0].innerText = 'totaal :' + total + '€'
}
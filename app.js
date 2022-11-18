const form = document.querySelector('#generator');
const imgInput = document.querySelector("#img-input");
const topText = document.querySelector("#top");
const bottomText = document.querySelector("#bottom");
const submitBtn = document.querySelector("button");
const meme = document.getElementById("meme");
const color = document.querySelector("#text-color");


form.addEventListener("submit", function(e) {
    e.preventDefault()
    
  // function to call later in the code that targets all elements in the ".meme" class, then removes the EventListener from the remove button, and then deletes the "item" which is the memeDiv. 
  function handleRemove(e) {
    const item = memeDiv;
    
    item.querySelector(".button-style").removeEventListener("click", handleRemove);

    item.parentElement.removeChild(item);
    
  };              
 
  
  
    // image
    let image = document.createElement("img");
    image.classList.add('img');
    image.setAttribute('src', imgInput.value);  

    // text div's
    let topTextVal = topText.value;
    let bottomTextVal = bottomText.value;
    let topDiv = document.createElement("div")
    let bottomDiv = document.createElement("div")
    topDiv.append(topTextVal);
    bottomDiv.append(bottomTextVal);
        topDiv.style.color = color.value;
        bottomDiv.style.color = color.value;   
    
    topDiv.classList.add("toptext");
    bottomDiv.classList.add("bottomtext");

    const remove = document.createElement("button");
    remove.innerText = "Remove Meme";
    remove.classList.add("button-style");
    


// appending all. I added my remove button into its own div and then appended that div to the larger div containg the img and text. This was done because if I simply appneded the button alone it would disrupt my CSS by trying to fit the button in with everything else. 
    

    let memeDiv = document.createElement("div");    
    memeDiv.append(image, topDiv, bottomDiv);

    let rmvDiv = document.createElement('div');
    rmvDiv.append(remove);
    memeDiv.append(rmvDiv);

    memeDiv.classList.add('meme')    

    document.body.append(memeDiv);

   


remove.addEventListener("click", handleRemove);


// clear inputs after submit 
    form.reset();

})









$(async ()=>{
    let count=0
    let buttonClick = {}
    let buttonId = {}
    await $.get("/products",(data)=>{
        for(d of data){
            count++;
            buttonClick[d.id] = 0
            $("#main").append(`
        <div class="card-margin card col-xl-4 col-md-6 col-12" style="width: 18rem;display: inline-block;">
            <img src="../download.jpg" class="image-margin card-img-top">
            <div class="card-body">
              <h5 class="card-title">${d.name}</h5>
              <p class="card-text">${d.price}</p>
              <button id="${d.id}" type="button" class="btn btn-outline-dark button-margin">  + Add to Cart  </button>
            </div>
        </div>`)
        }
    })
    for(let i=0;i<count;i++){
        $(`#${i}`).click(()=>{
            buttonClick[i]++
            console.log(buttonClick[i])
            if(buttonClick[i]==1){
                $.post("/cartitems",{
                    productId:i,
                    userId:1,
                    quantity: buttonClick[i]
                },(data)=>{
                    console.log("Added to cart")
                })
            }
            else{
                $.post("/cartitems/update",{
                    productId:i,
                    quantity: buttonClick[i]
                },(data)=>{
                    console.log("Added to cart")
                })
            }
        })
    }
})
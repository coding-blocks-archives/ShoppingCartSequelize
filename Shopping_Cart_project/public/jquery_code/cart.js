$(async()=>{
    let totalCost=0
    await $.get("/cartitems",(data)=>{
        for(d of data){
            totalCost+= d.product.price* d.quantity
            $('#list').append(`<li class="list-group-item">
            <div class="row">
                <div class="col">Name:&nbsp&nbsp${d.product.name}</div>
                <div class="col">Rs&nbsp&nbsp${d.product.price}</div>
                <div class="col">Quantity:&nbsp&nbsp${d.quantity}</div>
            </div>
        </li>`)
        }
    })
    $('#price').append(`<p>Total Price &nbsp&nbsp&nbsp&nbsp Rs&nbsp&nbsp ${totalCost}</p>`)
    $('#clear').click(()=>{
        $.post("/cartitems/deleteAll",(data)=>{
        })
    })
})
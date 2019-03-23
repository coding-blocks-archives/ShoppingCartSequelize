

$(()=>{
    
    $.get('/products',
(data)=>{
    
    data.forEach((object)=>{
        $('#mbody').append(
            $('<div>').attr('class','card').attr('style','width: 18rem; display: inline-block;margin: 5px').append(
                $('<img>').attr('class','card-img-top').attr('src','https://via.placeholder.com/200/09f/fff.png%20C/O%20https://placeholder.com/').attr('alt','card image cap')
            ).append(
                $('<div>').attr('class','card-body').append(
                    $('<h5>').attr('class','card-title').text(object.name)
                ).append(
                    $('<p>').attr('class','card-text').text(object.price)
                ).append(
                    $('<a>').attr('href','#').attr('class','btn btn-primary').text("Add to Cart")
                )
            )

        )
        
        
        
    })
})
    

 

})

// $('#cbody').append(
//     $('<h5>').attr('class','card-title').text(object.name)
// ).append(
//     $('<p>').attr('class','card-text').text(object.price)
// ).append(
//     $('<a>').attr('href','#').attr('class','btn btn-primary').text("Add to Cart")
// )






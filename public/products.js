$(()=>{
    $('#addv').click(()=>{
        
        $.post('/products',
        {name:$('#val').val(),
         price:$('#price').val(),
        quantity:$('#qua').val(),
        vendorId:$('#list').val()
        },
        (object)=>{
            $('#tbody').append(
                $('<tr>').append(
                    $('<th>').attr('scope','col').text(object.id)
                ).append(
                    $('<td>').text(object.name)
                ).append(
                    $('<td>').text(object.price)
                ).append(
                    $('<td>').text(object.quantity)
                ).append(
                    $('<td>').text($("#list option:selected").text())
                )
            )

        }
        )
    })

})

$.get('/products',
(data)=>{
    $('#tbody').empty();
    data.forEach((object)=>{
        $('#tbody').append(
            $('<tr>').append(
                $('<th>').attr('scope','col').text(object.id)
            ).append(
                $('<td>').text(object.name)
            ).append(
                $('<td>').text(object.price)
            ).append(
                $('<td>').text(object.quantity)
            ).append(
                $('<td>').text(object.vendor.name)
            )
        )
    })

})

$.get('/vendors',
(data)=>{
    data.forEach((object)=>{
        $('#list').append(
            $('<option>').attr('value',object.id).text(object.name)
        )
    })
})

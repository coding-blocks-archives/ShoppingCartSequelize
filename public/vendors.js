$(()=>{
    $('#addv').click(()=>{

        $.post('/vendors',
        {name:$('#val').val()},
        (data)=>{
            $('#tbody').append(
                $('<tr>').append(
                    $('<th>').attr('scope','col').text(data.id)
                ).append(
                    $('<td>').text(data.name)
                )
            )

        })
      
    })
})

$.get('/vendors',(data)=>{
   refreshlist(data)
})
function refreshlist(data)
{
    $('#tbody').empty();
    data.forEach((object)=>{
        $('#tbody').append(
            $('<tr>').append(
                $('<th>').attr('scope','col').text(object.id)
            ).append(
                $('<td>').text(object.name)
            )
        )
    })
    
}





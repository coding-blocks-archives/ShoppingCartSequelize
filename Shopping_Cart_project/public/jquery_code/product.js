$(async ()=>{
    let count1 = 0
    let count2=0
    let add=$('#add')
    add.click(()=>{
        if(count1==0){
             $('#container').append(`<form id='form'>
        <div class="form-group">
            <label for="exampleFormControlTextarea6">VendorId</label>
            <textarea class="form-control" id="exampleFormControlTextarea6" rows="1"></textarea>
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea2">Name</label>
            <textarea class="form-control" id="exampleFormControlTextarea2" rows="1"></textarea>
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea3">Manufacturer</label>
            <textarea class="form-control" id="exampleFormControlTextarea3" rows="1"></textarea>
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea7">Price</label>
            <textarea class="form-control" id="exampleFormControlTextarea7" rows="1"></textarea>
        </div>
        <button id ="submit2" type="button" class="btn btn-success">Submit</button>
    </form>`)
    count1++
    add.text('Close')
        }   
        else{
            $('#form').remove()
            add.text('Add Products')
            count1--
        } 
        $('#submit2').click(()=>{
            $.post('/products',{
                vendorId:$('#exampleFormControlTextarea6').val(),
                name:$('#exampleFormControlTextarea2').val(),
                manufacturer:$('#exampleFormControlTextarea3').val(),
                price:$('#exampleFormControlTextarea7').val(),
            },(data)=>{
                $('#exampleFormControlTextarea2').val("")
                $('#exampleFormControlTextarea3').val("")
                $('#exampleFormControlTextarea6').val("")
                $('#exampleFormControlTextarea7').val("")
            })
        })
    })
    $('#add1').click(()=>{
        if(count2==0){
             $('#container').append(`<form id='form1'>
        <div class="form-group">
            <label for="exampleFormControlTextarea4">Name</label>
            <textarea class="form-control" id="exampleFormControlTextarea4" rows="1"></textarea>
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea5">VendorId</label>
            <textarea class="form-control" id="exampleFormControlTextarea5" rows="1"></textarea>
        </div>
        <button id ="submit3" type="button" class="btn btn-success">Submit</button>
    </form>`)
    count2++
    $('#add1').text('Close')
        }   
        else{
            $('#form1').remove()
            $('#add1').text('Delete Vendors')
            count2--
        } 
        $('#submit3').click(()=>{
            $.post('/products/delete',{
                name:$('#exampleFormControlTextarea4').val(),
                vendorId:$('#exampleFormControlTextarea5').val(),
            },(data)=>{
                $('#exampleFormControlTextarea4').val("")
                $('#exampleFormControlTextarea5').val("")
            })
        })
    })
    $('#details').click(()=>{
        $('#list').empty()
        $.get('/products/all',{
            name:$('#input').val()
        },(data)=>{
            $('#input').val("")
            if(data.length!=0){
            for(d of data){
                $('#list').append(`
                <li class="list-group-item">
                    <div class="row">
                        <div class="col">Name:&nbsp&nbsp${d.name}</div>
                        <div class="col">Rs&nbsp&nbsp${d.price}</div>
                        <div class="col">Manufaturer:&nbsp&nbsp${d.manufacturer}</div>
                        <div class="col">Vendor:&nbsp&nbsp${d.vendor.name}</div>
                    </div>
                </li>`)
            }
            }
            else{
                $('#list').append(`<div class="col">Results Not Found &nbsp&nbsp</div>`)
            }
        })
    })

})
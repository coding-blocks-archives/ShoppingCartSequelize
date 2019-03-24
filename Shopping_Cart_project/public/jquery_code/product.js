$(async ()=>{
    let count1 = 0
    let count2=0
    let add=$('#add')
    $.get('/products/allProd',(data)=>{
        for(d of data){
            $('#select').append(`<option value="${d.id}">${d.name}</option>`)
        }
    })
    add.click(async ()=>{
        if(count1==0){
            await $.get('/vendors',(data)=>{
                $('#container').append(`<form id='form'>
                Vendor<br>
            <select id="select1" style = "margin:1rem" class="custom-select">
            </select>
            </form>`)
                for(d of data){
                    $('#select1').append(`<option value="${d.id}">${d.name}</option>`)
                }
            })
            $('#form').append(`
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
        <button id ="submit2" type="button" class="btn btn-success">Submit</button>`)
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
                vendorId:$('#select1').val(),
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
    $('#add1').click(async ()=>{
        if(count2==0){
            await $.get('/products/allProd',(data)=>{
                $('#container1').append(`<form id='form2'>
                    Product Name <br>
                <select id="select2" style = "margin:1rem" class="custom-select">
                </select>
                </form>`)
                    for(d of data){
                        $('#select2').append(`<option value="${d.id}">${d.name}</option>`)
                    }
                
                }
            )
            await $.get('/vendors',(data)=>{
                $('#form2').append(`
                Vendor<br>
            <select id="select3" style = "margin:1rem" class="custom-select">
            </select>`)
                for(d of data){
                    $('#select3').append(`<option value="${d.id}">${d.name}</option>`)
                }
            $('#form2').append(`<button id ="submit3" type="button" class="btn btn-success">Submit</button>`)
            })
    count2++
    $('#add1').text('Close')
        }   
        else{
            $('#form2').remove()
            $('#add1').text('Delete Products')
            count2--
        } 
        $('#submit3').click(()=>{
            $.post('/products/delete',{
                id:$('#select2').val(),
                vendorId:$('#select3').val(),
            },(data)=>{
            })
        })
    })
    $('#details').click(()=>{
        $('#list').empty()
        $.get('/products/all',{
            id:$('#select').val()
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
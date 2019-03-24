$(async ()=>{
    let count1 = 0
    let count2=0
    let add=$('#add')
    $.get('/vendors',(data)=>{
        for(d of data){
            $('#select').append(`<option value="${d.id}">${d.name}</option>`)
        }
    })
    add.click(()=>{
        if(count1==0){
             $('#container').append(`<form id='form'>
        <div class="form-group">
            <label for="exampleFormControlTextarea2">Name</label>
            <textarea class="form-control" id="exampleFormControlTextarea2" rows="1"></textarea>
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea3">Password</label>
            <textarea class="form-control" id="exampleFormControlTextarea3" rows="1"></textarea>
        </div>
        <button id ="submit2" type="button" class="btn btn-success">Submit</button>
    </form>`)
    count1++
    add.text('Close')
        }   
        else{
            $('#form').remove()
            add.text('Add Vendors')
            count1--
        } 
        $('#submit2').click(()=>{
            $.post('/vendors',{
                name:$('#exampleFormControlTextarea2').val(),
                password:$('#exampleFormControlTextarea3').val(),
            },(data)=>{
                $('#exampleFormControlTextarea2').val("")
                $('#exampleFormControlTextarea3').val("")
            })
        })
    })
    $('#add1').click(async ()=>{
        if(count2==0){
            await $.get('/vendors',(data)=>{
                $('#container1').append(`<form id='form1'>
            <div class="form-group">
            <select id="select3" class="custom-select">
            </select>
            <label for="exampleFormControlTextarea5">Password</label>
            <textarea class="form-control" id="exampleFormControlTextarea5" rows="1"></textarea>
            </div>
            <button id ="submit3" type="button" class="btn btn-success">Submit</button>
        </form>`)
                for(d of data){
                    $('#select3').append(`<option value="${d.id}">${d.name}</option>`)
                }
            })

    count2++
    $('#add1').text('Close')
        }   
        else{
            $('#form1').remove()
            $('#add1').text('Delete Vendors')
            count2--
        } 
        $('#submit3').click(()=>{
            $.post('/vendors/delete',{
                id:$('#select3').val(),
                password:$('#exampleFormControlTextarea5').val(),
            },(data)=>{
                $('#exampleFormControlTextarea5').val("")
            })
        })
    })
    $('#details').click(()=>{
        $('#list').empty()
        $.get('/products',{
            id:$('#select').val()
        },(data)=>{
            $('#input').val("")
            if(data.length!=0){
                $('#list').append(`<h3>${data[0].vendor.name}</h3>`)
            $('#list').append(`<h4>Password :${data[0].vendor.password}</h4>`)
            for(d of data){
                $('#list').append(`
                <li class="list-group-item">
                    <div class="row">
                        <div class="col">Name:&nbsp&nbsp${d.name}</div>
                        <div class="col">Name:&nbsp&nbsp${d.manufacturer}</div>
                        <div class="col">Rs&nbsp&nbsp${d.price}</div>
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
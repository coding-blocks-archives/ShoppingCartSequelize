$(() => {
    $.get(
        '/vendors',
        (vendorList) => {
            vendorList.forEach(vendor => {
                $('#vendorsList').append(`<li>${vendor.name}</li>`)
                $('#vendors').append(`<option value="${vendor.id}">${vendor.name}</option>`)                
            });
            console.log(vendorList);
        }
        )
        $('#submitVendor').click(() => {
            $.post(
                '/vendors',
                {name: $('#vendorName').val()},
                (newVendor) => {
                    $('#vendorsList').append(`<li>${newVendor.name}</li>`)
                    $('#vendors').append(`<option value="${newVendor.id}">${newVendor.name}</option>`)
                }
                )
            })
            $.get(
                '/cartitems',
                (cartitemsList) => {
                    cartitemsList.forEach(cartitem => {
                        $('#cartContainer').append(`
                        <div class="card">
                        <div class="card-body" id="cartid${cartitem.id}">
                        <h5 class="card-title">${cartitem.product.name}</h5>
                        <p class="card-text">price: ${cartitem.product.price}</p>
                        <p class="card-text quantity">quantity: ${cartitem.quantity}</p>
                        </div>
                        </div>`)
                    })
                })
                $.get(
                    '/products',
                    (productList) => {
                        productList.forEach(product => {
                            $('#productsList').append(`<li>Product name: ${product.name} Product price: ${product.price} Product quantity: ${product.quantity} Vendor Id: ${product.vendorId}</li>`)             
                            $('#catalogContainer').append(`
                            <div class="card">
                            <div class="card-body" id="${product.id}">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.price}</p>
                            <button class="addToCart">Add to Cart 🛒</button>
                            </div>
                            </div>`)
                        })
                        $('.addToCart').click((ev) => {
                            console.log('clicked!')
                            $.post(
                                '/cartitems',
                                { id: $(ev.target).closest('div.card-body').attr('id') },
                                (cartitemsTableArray) => {
                                    if($(`#cartid${cartitemsTableArray.id}`).text() == "") {
                                        $('#cartContainer').append(`
                                        <div class="card">
                                        <div class="card-body" id="cartid${cartitemsTableArray.id}">
                                        <h5 class="card-title">${cartitemsTableArray.product.name}</h5>
                                        <p class="card-text">price: ${cartitemsTableArray.product.price}</p>
                                        <p class="card-text quantity">quantity: ${cartitemsTableArray.quantity}</p>
                                        </div>
                                        </div>`)
                                    } else {
                                        $(`#cartid${cartitemsTableArray.id} .quantity`).text(`quantity: ${cartitemsTableArray.quantity}`)
                                        
                                    }
                                })
                            })
                        })
                        $('#submitProduct').click(() => {
                            $.post(
                                '/products',
                                {
                                    name: $('#productName').val(),
                                    price: $('#productPrice').val(),
                                    quantity: $('#productQuantity').val(),
                                    vendorId: $('#vendors').val()
                                },
                                (newProd) => {
                                    $('#productsList').append(`
                                    <li>Product name: ${newProd.name} Product price: ${newProd.price} Product quantity: ${newProd.quantity} Vendor Id: ${newProd.vendorId}</li>
                                    `)
                                    $('#catalogContainer').append(`
                                    <div class="card"
                                    <div class="card-body" id="${newProd.id}">
                                    <h5 class="card-title">${newProd.name}</h5>
                                    <p class="card-text">${newProd.price}</p>
                                    <button class="addToCart">Add to Cart 🛒</button>
                                    </div>
                                    </div>`)
                                })
                            })
                        })
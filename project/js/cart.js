const cart = () => {
    const buttonCart = document.getElementById('cart-button')
    const modalCart = document.querySelector('.modal-cart')
    const close = modalCart.querySelector('.close')
    const body = modalCart.querySelector('.modal-body')
    const buttonSend = modalCart.querySelector('.button-primary')
    const buttonClearCart = modalCart.querySelector('.clear-cart')

    const resetCart = () => {
        body.innerHTML = ''
        localStorage.removeItem('cart')
        modalCart.classList.remove('is-open')
    }

    const incrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((elem) => {
            if (elem.id == id) {
                elem.count++
            }

            return elem
        })

        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderElems(cartArray)
    }


    const decrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((elem) => {
            if (elem.id == id) {
                elem.count = elem.count > 0 ? elem.count - 1 : 0
            }

            return elem
        })

        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderElems(cartArray)
    }


    const renderElems = (data) => {
        body.innerHTML = ''

        data.forEach(({ name, price, id, count }) => {
            const cartDiv = document.createElement('div')
            cartDiv.classList.add('food-row')

            cartDiv.innerHTML = `
                <span class="food-name">${name}</span>
                <strong class="food-price">${price} ₽</strong>
                <div class="food-counter">
                    <button class="counter-button btn-dec" data-index="${id}">-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button btn-inc" data-index="${id}">+</button>
                </div>
            `

            body.append(cartDiv)
        });
    }

    body.addEventListener('click', (event) => {
        event.preventDefault()

        if (event.target.classList.contains('btn-inc')) {
            incrementCount(event.target.dataset.index)
        } else if (event.target.classList.contains('btn-dec')) {
            decrementCount(event.target.dataset.index)
        }
    })

    buttonSend.addEventListener('click', () => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cartArray
        })
            .then(response => {
                if (response.ok) {
                    resetCart()
                }
            })
            .catch(event => {
                console.error(event);
            })
    })

    buttonClearCart.addEventListener('click', () => {
        resetCart()
    })

    buttonCart.addEventListener('click', () => {
        if (localStorage.getItem('cart')) {
            renderElems(JSON.parse(localStorage.getItem('cart')))
        }

        modalCart.classList.add('is-open')
    })

    close.addEventListener('click', () => {
        modalCart.classList.remove('is-open')
    })
}

cart()
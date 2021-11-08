const restaurant = 'food-band'


const renderItems = (data) => {
    data.forEach((elem) => {
        console.log(elem);
    })
}


fetch(`db/${restaurant}.json`)
    .then((response) => response.json())
    .then((data) => {
        renderItems(data)
    })
    .catch((error) => {
        console.log(error)
    })
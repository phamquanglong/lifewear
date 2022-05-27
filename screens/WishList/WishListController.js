import axios from 'axios';


export var deleteWishlist = (id, token, setData) => {
    const options = {
      method: 'DELETE',
      url: `https://lifewear.mn07.xyz/api/user/wishlist/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    };

    axios.request(options)
    .then(response => {
      setData !== undefined ? setData(response.data) : console.log(response)
    })
    .catch(err => console.error(err))
  }

  export var addWishList = (id, token, setData) => {
    console.log({id, token})
    const options = {
      method: 'POST',
      url: 'https://lifewear.mn07.xyz/api/user/wishlist',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
      data: {
        product_id: id
      },
    }

    axios.request(options)
    .then(response => {
      setData !== undefined ? setData(response.data) : console.log(response)
    })
    .catch(err => console.log(err))
  }
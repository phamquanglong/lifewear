import axios from "axios"

var SERVER_NAME = 'randomuser.me'

var getUserDetails = async () => {
    try {
        var response = await axios.get(`https://${SERVER_NAME}/api/`)
        if (response.status != 200) {
            throw 'Failed request'
        }
        if (response.data.results.length > 0) {
            var responseUser = response.data.results[0]
            var user = {}
            user.dateOfBirth = new Date(responseUser.dob.date)
            user.email = responseUser.email
            user.gender = responseUser.gender == undefined ? 'male' : responseUser.gender
            user.userID = `${responseUser.id.name}${responseUser.id.value}`
            user.address = `${responseUser.location.state}, ${responseUser.location.street.name}`
            user.username = responseUser.login.username ?? ''
            user.picture = responseUser.picture.large ?? ''
            user.phone = responseUser.phone ?? ''
            user.registerDate = new Date(responseUser.registered.date)
            return user
        }
        throw "User not found"
    } catch (error) {
        throw error
    }
}

var signin = ({email, password}) => {

}

export default {getUserDetails, signin}
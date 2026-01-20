
import jwt from 'jsonwebtoken'

const serect = process.env.SECRET_KEY
function setuser(user) {

    return jwt.sign({
        _id:user._id,
        name:user.name,
        userName:user.userName,
        email:user.email
    }, serect,{expiresIn:'10h'})
}

function getUser(token) {
    
    
    try {
        if (!token) return null;
        return jwt.verify(token, serect)

    } catch (error) {
        console.log(error);
        console.log("token not found");

    }


}

export {
    setuser,
    getUser
}
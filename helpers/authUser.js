
import jwt from 'jsonwebtoken';
import rolePermissions from '../config/rolePermissions.js'

const authUser = (accessReq) => {
  console.log(accessReq)
  return (req, res, next) => {
    try {
      // If jwt.verify doesn't return tru then an error get thrown
      // and the function returns the response in the catch
      const decoded = jwt.verify(req.headers.bearer, process.env.TOKEN_SECRET);
      const userRole = rolePermissions[decoded.role]

      // TODO This condition is a bit long
      if (decoded.role == "admin" || (userRole[accessReq[0]] && userRole[accessReq[0]].includes(accessReq[1]))){
        // console.log("I am in :) ")
        next();
      }
      else{
        // console.log("I am not in. :( ")
        res.status(401).json({message: 'Not Authorized', error: err });
      }
      
   } catch(err) {
     res.status(403).json({message: 'Access Denied', error: err });
   }
 }
}

export { authUser }
//  export default authorizeUser
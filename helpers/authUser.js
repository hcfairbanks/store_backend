
import jwt from 'jsonwebtoken';
import rolePermissions from '../config/rolePermissions.js'

// Group these into an index somewhere
import { i18n } from '../helpers/setLanguage.js'
import returnLanguage from '../helpers/returnLanguage'
import { translateError } from '../helpers/sequelizeTranslate'

const authUser = (accessReq) => {
  return (req, res, next) => {
    i18n.setLocale(returnLanguage(req.headers))
    try {
      
      //console.log('*******************');
      // If I want to do permissions based on url or subdomain or something
      // In my etc/hosts file I have added the entry 'bigcats.cats'
      // This works in postman http://bigcats.cats:3000/categories
      var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      //console.log(fullUrl);
      //console.log("This output is being generated in git/store_backend/helpers/authUser.js");
      //console.log('*******************');

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
        res.status(401).json({message: i18n.__("authorization.denied"), error: err });
      }
   } catch(err) {
     res.status(403).json({message: i18n.__("authorization.denied"), error: err });
   }
 }
}

export { authUser }
//  export default authorizeUser
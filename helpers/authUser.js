import jwt from 'jsonwebtoken';
import i18n from './setLanguage';
import returnLanguage from './returnLanguage';
import rolePermissions from '../config/rolePermissions';

const authUser = (accessReq) => (req, res, next) => {
  i18n.setLocale(returnLanguage(req.headers));
  try {
    const decoded = jwt.verify(req.headers.bearer, process.env.TOKEN_SECRET);
    const userRole = rolePermissions[decoded.role];

    // TODO This condition is too long
    if (decoded.role === 'admin' || (userRole[accessReq[0]] && userRole[accessReq[0]].includes(accessReq[1]))) {
      next();
    } else {
      res.status(401).json({ message: i18n.__('authorization.denied') });
    }
  } catch (error) {
    res.status(403).json({ message: i18n.__('authorization.denied'), error });
  }
};

export default authUser;

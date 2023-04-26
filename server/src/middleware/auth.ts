import { Response, Request, NextFunction } from 'express';
import passport from 'passport';
import { Role } from '../types'
import { User, Iuser } from '../model/user';
import { User as UserTypes } from "../types/user";
export const protect = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        error: {
          message: 'Not Authorized',
          name: 'AUTHENTICATION_FAILURE',
        },
        success: false,
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};


export const authorize = (roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as UserTypes;
      const foundUser = await User.findById(user._id).populate("role");
      if (!foundUser || !foundUser.role || !roles.some(role=>roles.includes(role))) {
        return res.status(403).json({
          error: {
            name: "Unauthorized",
            message: "You are not authorized to perform this action",
          },
          success: false,
        });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: {
          name: "Server Error",
          message: "Something went wrong on the server",
        },
        success: false,
      });
    }
  };
};
// export const authorize = (roles: Role[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user as UserTypes; 
//     const foundUser = await User.findById(user._id).populate("role");
//     if (!foundUserrole. || !user.role.some(role => roles.includes(role))) {
//       return res.status(403).json({
//         error: {
//           name: 'Unauthorized',
//           message: 'You are not authorized to perform this action',
//         },
//         success: false,
//       });
//     }
//     next();
//   };
// };







import * as passport from "passport";
import * as request from "request";
import * as passportLocal from "passport-local";
import * as _ from "lodash";

// import { User, UserType } from '../models/User';
import { default as User } from "../models/User";
import { Request, Response, NextFunction } from "express";
/* LocalStrategy of Passport Session */
const LocalStrategy = passportLocal.Strategy;
/* Passport serialize user method */
passport.serializeUser<any, any>((user, done) => {
  done(undefined, user._id);
});
/* Passport deserialize user method */
passport.deserializeUser((id, done) => {
  User.findById(id).exec((err, user) => {
    done(err, user);
  });
});


/**
 * Sign in using email and password.
 */
passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
  User.findOne({ email: email }).populate('profile.picture').exec((err: any, user: any) => {
    if (err) { return done(err); }
    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }
    user.comparePassword(password, (err: Error, isMatch: boolean) => {
      if (err) { return done(err); }
      if (isMatch) {
        user.last_login = new Date();
        user.save();
        return done(undefined, user);
      }
      return done(undefined, false, { message: "Invalid email or password." });
    });
  });
}));

export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({});
};

export let isAdminAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user.user_role === 'admin') {
    return next();
  }
  res.status(401).send({});
};

export let isSuperAdminAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user.user_role === 'super-admin') {
    return next();
  }
  res.status(401).send({});
};
import * as express from "express";
import * as session from "express-session";
import * as dotenv from "dotenv";
import * as mongo from "connect-mongo";

const MongoStore = mongo(session);

/* Load environment variables from .env file, where  passwords and database url are configured */
dotenv.config({ path: ".env.example" });

/* Controllers (route handlers) */
import * as userController from "./controllers/user";
import * as sharesController from "./controllers/shares";
/* Passport configuration */
import * as passportConfig from "./config/passport";
/* Express router instance */
export const userRouter = express.Router();
export const sharesRouter = express.Router();
/* user auth api routes. */
userRouter.route("/login").get(passportConfig.isAuthenticated, userController.getLogin);
userRouter.route("/").get(passportConfig.isAuthenticated, userController.getUsers);
userRouter.route("/login").post(userController.postLogin);
userRouter.route("/logout").get(userController.logout);
userRouter.route("/signup").post(userController.postSignup);
userRouter.route("/").put(passportConfig.isAuthenticated, userController.updateUser);
userRouter.route("/password").put(passportConfig.isAuthenticated, userController.updatePassword);
userRouter.route("/delete/:id").delete(passportConfig.isAuthenticated, userController.deleteUser);
/* shares api routes. */
sharesRouter.route("/").get(passportConfig.isAuthenticated, sharesController.getShares);
sharesRouter.route("/").post(passportConfig.isAdminAuthenticated, sharesController.postShares);
sharesRouter.route("/:id").put(passportConfig.isAdminAuthenticated, sharesController.postUpdateShares);
sharesRouter.route("/:id").delete(passportConfig.isAdminAuthenticated, sharesController.postDeleteShares);
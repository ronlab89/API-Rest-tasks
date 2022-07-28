import {Router} from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/auth.controller.js";
import { validateAuth } from "../middlewares/ValidateResultExpress.js";

const router = Router();

router.post('/register',
    [
        body('email', 'Formato de email no valido')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', 'Minimo 6 caracteres')
            .trim()
            .isLength({min: 6}),
        body('password', 'Contraseña incorrecta')
            .custom((value, {req}) => {
                if(value !== req.body.repassword) {
                    throw new Error('No coinciden las contraseñas');
                }
                return value;
            })
    ],
    validateAuth,
    register);

    router.post('/login',
    [
        body('email', 'Formato de email no valido')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', 'Minimo 6 caracteres')
            .trim()
            .isLength({min: 6})
    ],
    validateAuth,
    login);


export default router;
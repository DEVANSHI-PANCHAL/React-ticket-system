import jwt from 'jsonwebtoken';
import { body, validationResult } from "express-validator";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}
//backend validations
export const validateUser = [

  body("email", "Enter a valid email").isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },

];

export const validateUserSignUp = [

  body("firstName", "Enter valid first name.").exists(),
  body("lastName", "Enter valid last name.").exists(),
  body("email", "Enter a valid email").exists().isEmail(),
  body("password", "Password is invalid.").exists().isLength({ min: 8, max: 16 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
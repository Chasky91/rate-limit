import express from 'express'
import {rateLimit} from 'express-rate-limit'

const app = express()
const  PUERTO = process.env.PORT || 3000

const  limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    limit: 10,
    //standardHeaders: 'draft-8',
    //legacyHeaders:false,
    //ipv6Subnet: 56
    message: 'Has  superado  el  limi  de  consultas  a la pagina'
})

const  authRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    limit: 5,
    standardHeaders: 'draft-8',
    //skipSuccessfulRequests:true,
    legacyHeaders:false,
    message: 'Has  superado  el  limite  acceso al  loguin'
})

app.use(limiter)


app.get('/', (req, res) => {
  res.send('Hello, World! 🚀');
})

app.get('/loguin',authRateLimiter , (req, res) => {
  res.send('Hola  Ususario');
})


app.listen(PUERTO, () => {
  console.log('Server running on http://localhost:3000');
});
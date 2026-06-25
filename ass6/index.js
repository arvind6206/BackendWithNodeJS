import express from 'express'
import jwt from 'jsonwebtoken'
import zod from 'zod'

const JWT_SECRET = "hu&gt%fy9*gg";
const app = express()

app.use(express.json())

const emailSchema = zod.string().email()
const passwordSchema = zod.string().min(6)

function signJwt(username, password){
    const usernameResponse = emailSchema.safeParse(username)
    const passwordResponse = passwordSchema.safeParse(password)

    if(!usernameResponse.success || !passwordResponse.success){
        return null
    }

    const signature = jwt.sign({
        username
    }, JWT_SECRET)
    return signature

}

const ans = signJwt("arvind", "gyihdthjjfbjkcbb")
console.log(ans)

app.listen(3000)

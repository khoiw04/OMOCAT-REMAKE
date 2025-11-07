import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { deleteAccount } from './stripe/delete'
import { createAccount } from './stripe/register'
import { updateInformation } from './stripe/update'
import { getInformation } from './stripe/get-information'
import { captureCheckout } from './stripe/capture_checkout-session'
import { createCheckoutSession } from './stripe/create-checkout-session'
import { cancelRefund, createFullRefundOrder } from './stripe/refund'

new Elysia()
    .use(cors({
        origin: [
            'https://omocat-remake.khoi-w04.workers.dev',
            'https://omocat-remake.khoiwn04.com',
            'http://localhost:4173',
            'http://localhost:3000'
        ],
        methods: ['GET', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }))
    .post('/create-account', (request: Request) => createAccount(request))
    .delete('/delete-account', (request: Request) => deleteAccount(request))
    .post('/get-information', (request: Request) => getInformation(request))
    .post('/refund-full-order', (request: Request) => createFullRefundOrder(request))
    .post('/refund-canceling', (request: Request) => cancelRefund(request))
    .post('/update-account', (request: Request) => updateInformation(request))
    .post('/create-checkout-session', (request: Request) => createCheckoutSession(request))
    .post('/capture-checkout-session', (request: Request) => captureCheckout(request))
    .listen(3001)

// CLOUDFLARE WORKER
// export default {
//     fetch: app.fetch
// }
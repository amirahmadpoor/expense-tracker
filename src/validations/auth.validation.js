import z, { regex } from 'zod';

const loginValidation = z.object({
    email: z.string('')
        .email('ایمیل نامعتبر است'),

    password: z.string()
        .min(6, 'رمزعبور باید حداقل 6 کارکتر باشد')
        .max(30, 'رمزعبور باید حداکثر 30 کارکتر باشد')
        .regex(/[A-Z]/, "حداقل یک حرف بزرگ لازم است")
        .regex(/[a-z]/, "حداقل یک حرف کوچک لازم است")
        .regex(/[0-9]/, "حداقل یک عدد لازم است")
})

const registerValidation = z.object({
    fullName: '',
    email: '',
    password: '',
    fullName: '',
})

export { loginValidation, registerValidation }
import z, { regex } from 'zod';

const emailValidation =
    z.string()
        .trim()
        .min(1, 'ایمیل الزامی است')
        .email('ایمیل نامعتبر است');


const passwordValidation =
    z.string()
        .trim()
        .min(1, 'رمزعبور الزامی است')
        .min(6, 'رمزعبور باید حداقل 6 کارکتر باشد')
        .max(30, 'رمزعبور باید حداکثر 30 کارکتر باشد')
        .regex(/[A-Z]/, 'حداقل یک حرف بزرگ برای رمزعبور لازم است')
        .regex(/[a-z]/, 'حداقل یک حرف کوچک برای رمزعبور لازم است')
        .regex(/[0-9]/, 'حداقل یک عدد برای رمزعبور لازم است');

const loginValidation = z.object({
    email: emailValidation,

    password: passwordValidation,
});

const registerValidation = z.object({
    fullName:
        z.string()
            .min(3, 'نام باید حداقل 3 کارکتر باشد'),

    email: emailValidation,

    password: passwordValidation,

    confirmPassword: passwordValidation,

})
    .refine((data) => data.password === data.confirmPassword, {
        message: 'رمز عبور یکسان نیست',
        path: ['confirmPassword']
    });

export { loginValidation, registerValidation }
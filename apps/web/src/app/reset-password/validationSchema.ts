import * as Yup from 'yup'

export const validationSchema = Yup.object({
    password: Yup.string().required('Please enter your password').min(8, 'Your password is too short'),
    confirmPassword: Yup.string().required('Please retype your password').oneOf([Yup.ref('password')], 'Your password do not match')
})


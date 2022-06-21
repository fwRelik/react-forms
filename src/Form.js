import { Field, Form, Formik, useField } from 'formik';
import * as Yup from 'yup';

const MyTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <Field {...props} {...field} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )
}

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <>
            <label className="checkbox">
                <Field type="checkbox" {...props} {...field} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )
}

const MySelect = ({ children, label, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'select' });
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <Field {...props} {...field} >
                {children}
            </Field>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )
}

const CustomForm = () => {

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema={
                Yup.object({
                    name: Yup.string()
                        .min(2, 'Минимум 2 символа!')
                        .required('Обязательное Поле!'),
                    email: Yup.string()
                        .email('Неправильный формат.')
                        .required('Обязательное Поле!'),
                    amount: Yup.number()
                        .min(5, 'Не менее 5')
                        .required('Обязательное Поле!'),
                    currency: Yup.string()
                        .required('Выберите валюту'),
                    text: Yup.string()
                        .min(10, 'Минимум 10 символв.'),
                    terms: Yup.boolean()
                        .required('Необходимо согласие.')
                        .oneOf([true], 'Необходимо согласие.')

                })}
            onSubmit={values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <MyTextField
                    label="Ваше имя"
                    id="name"
                    name="name"
                    type="text"
                />

                <MyTextField
                    label="Ваша почта"
                    id="email"
                    name="email"
                    type="email"
                />

                <MyTextField
                    label="Количество"
                    id="amount"
                    name="amount"
                    type="number"
                />

                <MySelect
                    label="Валюта"
                    id="currency"
                    name="currency"
                    as="select"
                >
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">RUB</option>
                    <option value="RUB">TRY</option>
                </MySelect>

                <MyTextField
                    label="Ваше сообщение"
                    id="text"
                    name="text"
                    as="textarea"
                />

                <MyCheckbox
                    name="terms"
                >
                    Соглашаетесь с политикой конфиденциальности?
                </MyCheckbox>

                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

const Input = ({ label, errors, aType = 'input', register, required, ...props }) => {

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            {
                aType === 'input' ? <input {...register(props.name, { required })} {...props} /> :
                    aType === 'textarea' ? <textarea {...register(props.name, { required })} {...props} /> : null
            }
            <div className="error">{errors[props.name]?.message}</div>
        </>
    )
};

const Select = ({ children, errors, label, register, required, ...props }) => (
    <>
        <label htmlFor={props.name}>{label}</label>
        <select {...register(props.name, { required })} {...props} >
            {children}
        </select>
        <div className="error">{errors[props.name]?.message}</div>
    </>
);

const Checkbox = ({ children, errors, label, register, required, ...props }) => (
    <>
        <label className={props.type}>
            <input type="checkbox" {...register(props.name, { required })} {...props} />
            {children}
        </label>
        <div className="error">{errors[props.name]?.message}</div>
    </>
);

const CustomForm = () => {
    const schema = Yup.object({
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

    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'all',
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(JSON.stringify(data, null, 2));
    };

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Отправить пожертвование</h2>

            <Input
                label="Ваше имя"
                register={register}
                required
                id="name"
                name="name"
                type="text"
                aType="input"
                errors={errors}
            />

            <Input
                label="Ваша почта"
                register={register}
                required
                id="email"
                name="email"
                type="email"
                aType="input"
                errors={errors}
            />

            <Input
                label="Количество"
                register={register}
                required
                id="amount"
                name="amount"
                type="number"
                aType="input"
                errors={errors}
            />

            <Select
                label="Валюта"
                register={register}
                required
                id="currency"
                name="currency"
                errors={errors}
            >
                <option value="">Выберите валюту</option>
                <option value="USD">USD</option>
                <option value="UAH">UAH</option>
                <option value="RUB">RUB</option>
            </Select>

            <Input
                label="Ваше сообщение"
                register={register}
                id="text"
                name="text"
                aType="textarea"
                errors={errors}
            />

            <Checkbox
                register={register}
                required
                name="terms"
                type="checkbox"
                errors={errors}
            >
                Соглашаетесь с политикой конфиденциальности?
            </Checkbox>

            <button type="submit">Отправить</button>
        </form>
    );
};


export default CustomForm;
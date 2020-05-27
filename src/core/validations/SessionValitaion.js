import * as Yup from 'yup';

const sessionValidation = async function (req, res, next) {
    try {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });

        await schema.validate(req.body, { abortEarly: false });

        return next();
    } catch (error) {
        return res
            .status(400)
            .json({ error: 'Validation fails', messages: error.inner });
    }
};

export default sessionValidation;

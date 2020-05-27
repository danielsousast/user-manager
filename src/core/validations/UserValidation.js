import * as Yup from 'yup';

const storeValidation = async function (req, res, next) {
    try {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            username: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        await schema.validate(req.body, { abortEarly: false });

        return next();
    } catch (error) {
        return res
            .status(400)
            .json({ error: 'Validation fails', messages: error.inner });
    }
};

const updateValidation = async function (req, res, next) {
    try {
        const schema = Yup.object().shape({
            name: Yup.string().optional(),
            username: Yup.string().optional().min(6),
            email: Yup.string().email().optional(),
            password: Yup.string().optional().min(6),
        });

        await schema.validate(req.body, { abortEarly: false });

        return next();
    } catch (error) {
        return res
            .status(400)
            .json({ error: 'Validation fails', messages: error.inner });
    }
};

export { storeValidation, updateValidation };

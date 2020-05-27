import Mail from '../../lib/Mail';

class CancellationMail {
    async handle(data) {
        await Mail.sendMail({
            to: `${data.name} <${data.email}>`,
            subject: `Recuperação de senha`,
            template: 'recovery',
            context: {
                token: data.token,
            },
        });
    }
}

export default new CancellationMail();

import { Request, Response } from 'express';
import EmailService from '../services/EmailService';

const users = [
    {
        name: 'Vitor Britto',
        email: 'vhbritto@gmail.com'
    }
];

export default {
    async index(req: Request, res: Response) {
        return res.json(users);
    },

    async create(req: Request, res: Response) {
        const emailService = new EmailService();

        emailService.sendMail({
            to: { name: 'Vitor Britto', email: 'vhbritto@gmail.com' },
            message: { subject: 'Bem vindo', body: 'Seja bem vindo.' }
        });

        return res.send();
    }
};
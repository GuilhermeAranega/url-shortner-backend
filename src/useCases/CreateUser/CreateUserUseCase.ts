import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreteUserDTO";

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider,
    ) {}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error('User already exists.');
        }

        const user = new User(data);

        await this.usersRepository.save(user); 

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Equipe do Encurta Já',
                email: 'equipe@encurtaja.com.br'
            },
            subject: 'Cadastro bem sucedido | Encurta Já',
            body: '<p>Você já pode fazer login em nosso site</p>'
        });
    }   
}
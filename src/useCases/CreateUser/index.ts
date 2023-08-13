import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const postgressUsersRepository = new PostgresUserRepository()
const mailtrapMailProvider = new MailtrapMailProvider()

const createUseruseCase = new CreateUserUseCase(
    postgressUsersRepository,
    mailtrapMailProvider
)

const createUserController = new CreateUserController(
    createUseruseCase
)

export { createUseruseCase, createUserController}
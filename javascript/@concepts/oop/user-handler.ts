// Composition example with UseCase, Repository Pattern and Handler

// Repository Pattern - Data Access Layer
class UserRepository {
  private users: { id: number; name: string }[] = [];

  addUser(user: { id: number; name: string }) {
    this.users.push(user);
  }

  findUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}

// UseCase - Business Logic
class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(user: { id: number; name: string }) {
    if (this.userRepository.findUserById(user.id)) {
      throw new Error("User already exists");
    }
    this.userRepository.addUser(user);
    return user;
  }
}

// Handler - Controller Layer
class CreateUserHandler {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: { id: number; name: string }) {
    try {
      const user = this.createUserUseCase.execute(request);
      console.log("User created:", user);
    } catch (error: any) {
      console.log("Error:", error.message);
    }
  }
}

// Composition - Dependency Injection
const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserHandler = new CreateUserHandler(createUserUseCase);

// Example of use
createUserHandler.handle({ id: 1, name: "Alice" }); // User created: { id: 1, name: 'Alice' }
createUserHandler.handle({ id: 1, name: "Bob" }); // Error: User already exists

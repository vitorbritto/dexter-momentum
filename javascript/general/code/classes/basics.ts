enum UserRole {
    ADMIN = "admin",
    GUEST = "guest",
    OPERATOR = "operator",
}

interface User {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    token: string;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

interface UserList {
    data: {
        users: User[];
        pagination: {
            page: number;
            limit: number;
            total: number;
        };
    };
}

class UserAuthentication implements User {
    // properties
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    token: string;
    isAuthenticated: boolean;
    isAdmin: boolean;

    // constructor
    constructor(
        name: string,
        email: string,
        phone: string,
        role: UserRole,
        token: string
    ) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.token = token;
        this.isAuthenticated = false;
        this.isAdmin = false;
    }

    // getters and setters
    get getName() {
        return this.name;
    }

    set setName(value: string) {
        this.name = value;
    }

    authenticate() {
        this.validateToken();
        this.getPermissions();
    }

    // private methods
    private validateToken() {
        if (this.token) {
            this.isAuthenticated = true;
            return;
        }

        throw new Error("Token is required");
    }

    private getPermissions() {
        if (this.isAuthenticated) {
            return this.role;
        }

        throw new Error("User is not authenticated");
    }

    // static methods
    static generateToken() {
        return Math.random().toString(36).substring(2, 15);
    }
}

const usersData: UserList = {
    data: {
        users: [
            {
                name: "John Doe",
                email: "john@doe.com",
                phone: "1234567890",
                role: UserRole.ADMIN,
                token: "1234567890",
                isAuthenticated: false,
                isAdmin: false,
            },
            {
                name: "Jane Doe",
                email: "jane@doe.com",
                phone: "1234567890",
                role: UserRole.GUEST,
                token: "1234567890",
                isAuthenticated: false,
                isAdmin: false,
            },
        ],
        pagination: {
            page: 1,
            limit: 10,
            total: 0,
        },
    },
};

const currentUser = usersData?.data?.users?.[0];

if (currentUser) {
    const authenticateCurrentUser = new UserAuthentication(
        currentUser.name,
        currentUser.email,
        currentUser.phone,
        currentUser.role,
        currentUser.token
    );

    console.log(authenticateCurrentUser.authenticate());
}

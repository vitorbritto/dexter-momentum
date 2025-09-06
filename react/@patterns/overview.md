# React Design Patterns

- Reutilização de Código
- Manutenabilidade
- Escalabilidade
- Padronização
- Performance
- Segurança
- Entrega de Qualidade

## Pontos à considerar

- Componentização
- Renderização condicional
- Gerenciamento de estado
- Comunicação entre componentes
- Otimização de performance

### Componentização ✅

```tsx
export interface AlertProps {
  type: "info" | "warning" | "error" | "success";
  title: string;
  message: string;
  children: React.ReactNode; // string, number, ReactNode
}

export const Alert = ({ type, title, message, children }: AlertProps) => (
  <div className="alert" type={type} title={title} message={message}>
    {children}
  </div>
);
```

```tsx
export const Home = () => (
  <Container>
    <Alert type="info">Texto do alerta vem aqui.</Alert>
  </Container>
);
```

```tsx
export const About = () => (
  <Container>
    <Alert type="info">Texto do alerta vem aqui.</Alert>
  </Container>
);
```

### Renderização Condicional ✅

#### Props

```jsx
const Authorizer = ({ authorized }) => (
  <div authorized={authorized}>{/* Restante do código aqui. */}</div>
);

// Dashboard Screen
const DashabordScreen = () => (
  <Dashboard>
    <Authorizer authorized={authorized}>
      {/* Restante do código aqui. */}
    </Authorizer>
  </Dashboard>
);
```

#### State

```jsx
const Dashboard = () => {
  const [authorized, setAuthorized] = useState(false);

  <Container>
    {!authorized && (
      <Alert type="error">Não autorizado para ver este conteúdo.</Alert>
    )}
  </Container>;
};

// OU

const Dashboard = () => {
  const [authorized, setAuthorized] = useState(false);

  <Container>
    {authorized ? (
      <Alert type="info">
        Conteúdo liberado para você que é membro Premium.
      </Alert>
    ) : (
      <Alert type="error">Não autorizado para ver este conteúdo.</Alert>
    )}
  </Container>;
};
```

### Gerenciamento de Estado ✅

```tsx
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IUser {
  name: string
  email: string
  phone: string
  session: string
}

interface ISession {
  user: IUser
}

interface IUserSessionStore extends ISession {
  setUserSession: ({ user }: ISession) => void
  clearState: () => void
}

const initialState = {
  user: {
    name: ''
    email: ''
    phone: ''
    session: ''
  }
}

export const useUserSesionStore = createWithEqualityFn(
  persist<IUserSessionStore>(
    set => ({
      ...initialState,
      setUserSession: ({ user }) => set({ user }),
      clearState: () => set(initialState)
    }),
    {
      name: 'user-session-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
```

### Comunicação entre componentes ✅

```tsx
<!-- Container / Smart Component / Functional Component -->

export const Dashboard = () => {
  const { user } = useUserSesionStore()
  const { data: user, loading: isUserDataLoading } = getUser(user?session)
  const { data: products, loading: isProductsLoading } = getProducts()

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ]

  if (isUserDataLoading || isProductsLoading) {
    return <Loading />
  }

  return (
    <Layout>
      <Header user={user} links={links} />
      <Main fullWidth>
        <Products products={products} />
      </Main>
      <Footer links={links} />
    </Layout>
  )
}
```

## Design Patterns

- Foundational Pattern ✅
- Presentational & Container Component Pattern ✅
- Compound Component Pattern ✅
- Layout Pattern ✅
- Conditional Rendering Pattern ✅
- Render Props Pattern ✅
- Controlled & Uncontrolled Component Pattern ✅
- Higher Order Components Pattern ✅
- Provider Pattern ✅
- Custom Hooks Pattern ✅

### Foundational Pattern

```tsx
export const App = () => {
  <ErrorBoundary>
    <MainComponent />
  </ErrorBoundary>;
};
```

### Presentational & Container Component Pattern

  <!-- users/Users.tsx -->

```tsx
export const Users = () => {
  const { data: usersData, loading: isUsersLoading } = useGetUsers(); // <-- Custom Hook
  const premiumUser = usersData?.premium;

  return (
    <UsersTable
      data={usersData}
      loading={isUsersLoading}
      premium={premiumUser}
    />
  );
};
```

  <!-- users/interfaces.ts -->

```tsx
interface User {
  name: string;
  email: string;
  phone: string;
  document: string;
}

export interface UsersTableProps {
  data: User[];
  premium: boolean;
  loading: boolean;
}
```

  <!-- users/components/UsersTable.tsx -->

```tsx
import { UsersTableProps } from "./interfaces";

export const UsersTable = ({ data, loading, premium }: UsersTableProps) => {
  return (
    <>
      <Table>{/* ... */}</Table>

      {premium && <PremiumSection>{/* ... */}</PremiumSection>}
    </>
  );
};
```

### Compound Component Pattern

A -> xpto={xpto}
B -> xpto={xpto}
C -> xpto={xpto}
D xpto={xpto}

#### Antes

```tsx
<FormProvider {...methods}>
  <Form onSubmit={handleSubmit(handleOnSubmit)}>
    <CommercialForm
      operationId={operationId}
      loading={loading}
      loadingUpdateStepsOperation={loadingUpdateStepsOperation}
      currencies={currencies}
      customers={customers}
      settingsFlows={settingsFlows}
      beneficiaries={beneficiaries}
      onUpdateStepsOperation={onUpdateStepsOperation}
      isOperationLiquidated={isOperationLiquidated}
      isDocumentApproved={isDocumentApproved}
      steps={steps}
      isEditable={shouldBeEditable}
    />

    {operationId && (
      <Guard
        permissions={[
          OperatorPermissionType.OPERATION_FINANCIAL_VIEW,
          OperatorPermissionType.OPERATION_ADMINISTRATIVE_VIEW,
        ]}
      >
        <AdministrativeForm
          attachments={defaultValues?.attachments}
          operationId={operationId}
          loadingHit={loadingHit}
          onIndicateHit={onIndicateHit}
          refetch={refetch}
          isOperationLiquidated={isOperationLiquidated}
          steps={steps}
        />
        <Guard permissions={[OperatorPermissionType.OPERATION_FINANCIAL_VIEW]}>
          <FinancialForm
            loadingUpdateStepsOperation={loadingUpdateStepsOperation}
            loadingDelayOperation={loadingDelayOperation}
            loadingCancelOperation={loadingCancelOperation}
            onDelayOperation={onDelayOperation}
            onCancelOperation={onCancelOperation}
            onUpdateStepsOperation={onUpdateStepsOperation}
            cancelFine={cancelFine}
            canceledBy={canceledBy}
            cancelReasons={cancelReasons}
            delayFine={delayFine}
            flows={flows}
            canLiquidateOperation={canLiquidateOperation}
            hasFooter={shouldBeEditable}
            isOperationLiquidated={isOperationLiquidated}
            isFinancialInAnalysis={isFinancialInAnalysis}
            steps={steps}
          />
        </Guard>
      </Guard>
    )}

    {shouldBeEditable && (
      <FormFooter
        width={OPERATION_FORM_WIDTH}
        loading={loading}
        onCancel={onCancel}
        disabled={
          !operationId &&
          (!beneficiaryBankApprovedExists || !selectedBeneficiaryBankIsApproved)
        }
      />
    )}
  </Form>
</FormProvider>
```

```tsx
// OperationFormContext.tsx

import { createContext, useContext } from "react";

export const OperationFormContext =
  createContext<OperationFormContextProps | null>(null);

export const useOperationForm = () => {
  const context = useContext(OperationFormContext);
  if (!context) {
    throw new Error(
      "useOperationForm must be used within an OperationFormContext"
    );
  }
  return context;
};
```

```tsx
// OperationForm.tsx

export const OperationForm = ({
  operationId,
  beneficiaryBankApprovedExists,
  selectedBeneficiaryBankIsApproved,
  loading,
  onCancel,
  onDelayOperation,
  onCancelOperation,
  onUpdateStepsOperation,
  cancelFine,
  canceledBy,
  cancelReasons,
  delayFine,
  flows,
  canLiquidateOperation,
  hasFooter,
  isOperationLiquidated,
  isFinancialInAnalysis,
  steps,
}: OperationFormProps) => {
  const disabled = !operationId && (!beneficiaryBankApprovedExists || !selectedBeneficiaryBankIsApproved)
  const width = OPERATION_FORM_WIDTH

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(handleOnSubmit)}>
      <OperationFormContext.Provider value={{
          operationId,
          loading,
          loadingUpdateStepsOperation,
          currencies,
          customers,
          settingsFlows,
          beneficiaries,
          onUpdateStepsOperation,
          isOperationLiquidated,
          isDocumentApproved,
          steps,
          isEditable: shouldBeEditable,
          attachments: defaultValues?.attachments,
          loadingHit
          onIndicateHit
          refetch
          isOperationLiquidated,
          loadingUpdateStepsOperation,
          loadingDelayOperation,
          loadingCancelOperation,
          onDelayOperation,
          onCancelOperation,
          onUpdateStepsOperation,
          cancelFine,
          canceledBy,
          cancelReasons,
          delayFine,
          flows,
          canLiquidateOperation,
          hasFooter: shouldBeEditable,
          isOperationLiquidated,
          isFinancialInAnalysis,
          steps,
          width,
          onCancel,
          disabled
      }}>
        <CommercialForm />

        {operationId && (
          <Guard
            permissions={[
              OperatorPermissionType.OPERATION_FINANCIAL_VIEW,
              OperatorPermissionType.OPERATION_ADMINISTRATIVE_VIEW
            ]}
          >
            <AdministrativeForm />
            <Guard permissions={[OperatorPermissionType.OPERATION_FINANCIAL_VIEW]}>
              <FinancialForm />
            </Guard>
          </Guard>
        )}

        {shouldBeEditable && (
          <FormFooter />
        )}
      </OperationFormContext.Provider>
      </Form>
    </FormProvider>
  );
};

export default OperationForm;
```

```tsx
import React from "react";
import { useOperationFormContext } from "./OperationFormContext";

const FinancialForm = () => {
  const { operationId } = useOperationFormContext();

  return (
    <Stack>
      {operationId && (
        <Guard
          permissions={[
            OperatorPermissionType.OPERATION_FINANCIAL_VIEW,
            OperatorPermissionType.OPERATION_ADMINISTRATIVE_VIEW,
          ]}
        >
          <Stack>
            <TextField label="Amount" />
            <TextField label="Currency" />
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </Guard>
      )}
    </Stack>
  );
};

export default FinancialForm;
```

### Layout Pattern

#### Sem Pattern

```tsx
export Home = () => {
  return (
    <>
      <Header />

      <Main>
        <Container>
          <Section>
            <h1>Welcome to Home Page</h1>
            <p>This is the content of the home page.</p>
          </Section>
          <Section>
            <h2>Section Title</h2>
            <p>This is the content of the section.</p>
          </Section>
        </Container>

      </Main>

      <Footer>
    </>
  );
};


export About = () => {
  return (
    <>
      <Header />

      <Main>
        <Container>
          <Section>
            <h1>About</h1>
            <p>This is the content of the about page.</p>
          </Section>
          <Section>
            <h2>Section Title</h2>
            <p>This is the content of the section.</p>
          </Section>
        </Container>
      </Main>

      <Footer>
    </>
  );
};
```

#### Aplicando o Pattern

```tsx
export const Layout = ({ children }: React.ReactNode) => {
  return (
    <>
      <Header />

      <Main>
        <Container>
          {children}
        </Container>
      </Main>

      <Footer>
    </>
  );
};

export const Home = () => {
  return (
    <Layout>
      <Section>
        <h1>Welcome to Home Page</h1>
        <p>This is the content of the home page.</p>
      </Section>
      <Section>
        <h2>Section Title</h2>
        <p>This is the content of the section.</p>
      </Section>
    </Layout>
  );
};
```

### Conditional Rendering Pattern

```tsx
// ?: ternary operator
export const ConditionalRendering = ({ condition }: { condition: boolean }) => {
  return condition ? <div>Condition is true</div> : <div>Condition is false</div>;
};

// &&: short-circuit evaluation
export const ShortCircuitEvaluation = ({ condition }: { condition: boolean }) => {
  return condition && <div>Condition is true</div>;
};

// Alternativa 01
export const MyComponent = () => {
  const { data, loading } = useQueryUsers()

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}


// Alternativa 02
export const MyComponent = () => {
  const { data, loading } = useQueryUsers()

  return (
    loading ? (
      <div>Loading...</div>;
    ) : (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
    )
  )
}

// Alternativa 03
export const MyComponent = () => {
  const { data, loading } = useQueryUsers()

  return (
    { loading && <div>Loading...</div> }

    { !loading && (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  )
}
```

### Render Props Pattern

```tsx
const products = [
  {
    id: 1,
    title: "Product 1",
    description: "This is product 1",
  },
  {
    id: 2,
    title: "Product 2",
    description: "This is product 2",
  },
  {
    id: 3,
    title: "Product 3",
    description: "This is product 3",
  },

  // ...
];

const Products = ({ render }) => {
  // Fetching products can be done here.
  return <>{render(products)}</>;
};

const HomePage = () => {
  return (
    <div>
      <h1>Products List</h1>
      <Products
        render={(products) => (
          <ul>
            {products?.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        )}
      />
    </div>
  );
};
```

### Controlled & Uncontrolled Component Pattern

```tsx
// Controlled Component

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
```

#### Utilizando o Formik

```tsx
import { Formik, Form, Field } from "formik";

<Formik
  initialValues={{ email: "", password: "" }}
  onSubmit={(values) => console.log(values)}
>
  <Form>
    <Field name="email" type="email" />
    <Field name="password" type="password" />
    <button type="submit">Submit</button>
  </Form>
</Formik>;
```

```tsx
// Uncontrolled Component

const Form = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Name:", nameRef.current.value);
    console.log("Email:", emailRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={nameRef} />
      </label>
      <label>
        Email:
        <input type="email" ref={emailRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
```

#### React Hook Form

```tsx
const { register, handleSubmit, watch } = useForm();

// const allValues = watch()
const [email, password, confirmPassword] = watch([
  "email",
  "password",
  "confirmPassword",
]);

return (
  <form onSubmit={handleSubmit((data) => console.log(data))}>
    <input {...register("email")} />
    <input {...register("password")} />
    {password.length > 8 && <input {...register("confirmPassword")} />}

    {password === confirmPassword && (
      <p className="form-success">Passwords match</p>
    )}
    {password !== confirmPassword && (
      <p className="form-error">Passwords do not match</p>
    )}

    <input type="submit" />
  </form>
);
```

### Higher Order Components Pattern

```tsx
const withSimulatedAuthentication = (
  WrappedComponent,
  authenticationMethod
) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
      setTimeout(() => {
        if (["OTP", "PIN", "PASSWORD"].includes(authenticationMethod)) {
          setIsAuthenticated(true);
          setIsAuthenticating(false);
        } else {
          setAuthError("Método de autenticação inválido");
          setIsAuthenticating(false);
        }
      }, 1000);
    }, [authenticationMethod]);

    if (isAuthenticating) return <div>Autenticando...</div>;
    if (authError) return <div>Erro: {authError}</div>;
    if (!isAuthenticated)
      return <div>Autentique-se para ver este conteúdo</div>;

    return <WrappedComponent {...props} />;
  };
};
```

```tsx
const UserProfile = () => (
  <div>
    <h2>Perfil do Usuário</h2>
    {/* Dados do perfil aqui */}
  </div>
);
```

```tsx
const UserProfileWithAuthentication = withAuthentication(UserProfile, "OTP");

<UserProfileWithAuthentication />;
```

### Provider Pattern

1. Criar o contexto
2. Criar o provedor
3. Consumir o Contexto (Hook)
4. Componente de Autenticação
5. Utilizar o Provider na Aplicação

```tsx
import { createContext, useContext, useState } from "react";

// 1. Contexto de Autenticação
const AuthContext = createContext();

// 2. Provider de Autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook de Autenticação
export const useAuth = () => useContext(AuthContext);

// 4. Componente de Autenticação
const Auth = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <h2>Perfil do Usuário</h2>
          {/* Dados do perfil aqui */}
        </div>
      ) : (
        <div>Autentique-se para ver este conteúdo</div>
      )}
    </div>
  );
};

// 5. Utilizar o Provider na Aplicação
const App = () => {
  return (
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
};
```

### Custom Hooks Pattern

#### Sem Custom Hook

```tsx
import { useEffect, useState } from "react";

const MyFirstComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados</div>;

  return (
    <div>
      <h2>Perfil do Usuário</h2>
      <p>Nome: {data.name}</p>
      <p>Email: {data.email}</p>
    </div>
  );
};
```

#### Com Custom Hook

```tsx
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

const MyFirstComponent = () => {
  const { data, error, loading } = useFetch("https://api.example.com/data");

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados</div>;

  return (
    <div>
      <h2>Perfil do Usuário</h2>
      <p>Nome: {data.name}</p>
      <p>Email: {data.email}</p>
    </div>
  );
};

const MySecondComponent = () => {
  const { data, error, loading } = useFetch("https://api.example.com/data");

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados</div>;

  return (
    <div>
      <h2>Perfil do Usuário</h2>
      <p>Nome: {data.name}</p>
      <p>Email: {data.email}</p>
    </div>
  );
};
```

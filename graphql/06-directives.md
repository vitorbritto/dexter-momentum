# Directives

Directives are used to modify the behavior of the GraphQL server. They are defined using the `directive` keyword.

## Directive Examples

### Obfuscate Strings

You can create a custom directive to obfuscate (mask) sensitive string fields, such as email addresses or phone numbers. For example:

```gql
directive @obfuscate on FIELD_DEFINITION
```

### Authorize Access

You can create a custom directive to authorize access to a field, such as a user's email address. For example:

```gql
directive @authorize on FIELD_DEFINITION
```

export enum StatusCode400Errors {
    ErrEmailAlreadyInUse = "email already in use",
    ErrAtoi = "string to int error",
    ErrIncorrectPasswordOrEmail = "incorrect password or email",
    ErrNotFoundInDB = "not found",
    ErrShortPassword = "please input password, at least 6 symbols",
}

export enum StatusCode401Errors {
    ErrTokenExpired = "token expired",
    ErrNotStandardToken = "token claims are not of type *StandardClaims",
}

export enum StatusCode403Errors {
    ErrUserIsNotActive = "user is not active. please check your email",
    ErrProjectPageIsBanned = "the projectPage is banned. no access",
    ErrAccessDenied = "access denied",
}

export enum StatusCode503Errors {
    ErrActivationLinkUnavailable = "activation link is currently unavailable"
}
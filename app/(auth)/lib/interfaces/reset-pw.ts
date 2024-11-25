export interface ResetPassword {
    password: string;
    token: string;
    confirmPassword?: string;
}
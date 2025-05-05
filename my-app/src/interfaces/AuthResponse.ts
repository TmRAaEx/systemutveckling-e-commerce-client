export interface SignInResponse {
    message: string; // A success message
    user: {
        _id?: string;
        id: string; // The user's unique identifier
        username: string; // The user's username
        email: string; // The user's email
        role?: "admin" | "user"; // Optional: The user's role (if included in the response)
    };
}
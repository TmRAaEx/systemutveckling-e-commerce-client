export default function ErrorHandler(error: any): string {
    return (error instanceof Error) ? error.message : "Unknown error";
}
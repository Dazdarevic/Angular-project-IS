export class User {
    ID: number | undefined;
    FirstName!:string;
    LastName!:string;
    UserName!:string;
    UserEmail:string | undefined;
    Password:string | undefined;
    RepPassword!: string;
    Role!:string;
    PhoneNumber!:string;
}

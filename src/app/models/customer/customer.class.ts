export class Client {
    constructor(
        public name: string,
        public email: string,
        public phone: string,
        public password: string,
        public status: boolean = false,
        public GOOGLE: boolean = false,
        public _id: string = ''
    ) {}
}

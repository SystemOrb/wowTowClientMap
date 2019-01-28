/*
Clase que crea usuarios para los proveedores de servicios (Grueros)
*/
export class WootowProviderClass {
    constructor (
        public name: string,
        public email: string,
        public city: string,
        public phone: string | number,
        public status?: boolean,
        public statusWork?: boolean,
        public authorized?: boolean,
        public _id?: string
    ) {}
}

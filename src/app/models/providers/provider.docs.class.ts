import { WootowProviderClass } from './provider.class';
/*
Clase que se encarga de construir objeto de perfiles para grueros para mostrar
selfies, foto de la grua etc
*/
export class WooTowProviderProfile {
    constructor (
        public document_name: string,
        public documentStatus: boolean,
        public documentType: string,
        public _id: string,
        public user: WootowProviderClass
    ) {}
}

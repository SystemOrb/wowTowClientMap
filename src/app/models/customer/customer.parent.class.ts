import { Client } from './customer.class';
import { ClientCar } from './customer.car.class';
export class CustomerAfiliated {
    constructor(
        public customer: Client | any,
        public vehicle: ClientCar | any
    ) {}
}

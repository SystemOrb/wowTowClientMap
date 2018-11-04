export class ClientCar {
    constructor(
        public client: string,
        public car_name: string,
        public car_plate: string,
        public car_colour?: string,
        public car_model?: string,
        public _id?: string
    ) {}
}

export class AutoComplete {
    constructor(
        public description: string,
        public matched_substrings: string[] | number[],
        public terms: any[]
    ) {}
}

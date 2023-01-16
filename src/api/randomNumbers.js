class RandomNumber {
    constructor(cant) {
        this.numbers = {};
        for(let i=0; i<cant; i++){
            const random = Math.ceil(Math.random()*10);
            this.numbers[random] ? this.numbers[random]++ : this.numbers[random]=1;
        }
    };
}

process.on("message", (cant) => {
    const random = new RandomNumber(cant);
    process.send(random.numbers);
});
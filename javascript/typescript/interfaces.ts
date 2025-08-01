interface Vehicle { 
    model: string;
    year: number;
    isBroken: boolean;
    summary(): string;
}

const oldVehicle = {
    model: 'civic',
    year: 2000,
    isBroken: true,
    summary(): string {
        return `Name ${this.model}`;
    }
};

const printVehicle = (vehicle: Vehicle) => {
    console.log(`Name: ${vehicle.model}`);
    console.log(`Year: ${vehicle.year}`);
    console.log(`Is broken? ${vehicle.isBroken}`);
};
printVehicle(oldVehicle);
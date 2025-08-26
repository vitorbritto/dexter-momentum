const profile = {
    name: 'Vitor',
    age: 41,
    coords: {
        lat: 0,
        lng: 15,
    },
    setAge (age: number): void {
        this.age = age;
    }
};

const { age, coords: { lat, lng } }: { age: number; coords: { lat: number; lng: number } } = profile;

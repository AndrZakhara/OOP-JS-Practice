class Crane {
    constructor(startSlabQuantity) {
        this.startSlabQuantity = startSlabQuantity;
        this.slot_a = {};
        this.slot_b = {};
        this.slot_c = {};
        this.initialize();
    }

    initializePlaces() {
        this.slot_a = new PlaceForSlab("slot_a");
        this.slot_b = new PlaceForSlab("slot_b");
        this.slot_c = new PlaceForSlab("slot_c");

        for (let i = 1; i <= this.startSlabQuantity; i++) {
            this.slot_a.slot.push(i);
        }
    }

    logger(placeA, placeB) {
        const slubNumber = placeA.slot.pop();
        placeB.slot.push(slubNumber);
        console.log(
            `#${slubNumber} ${placeA.name} -> ${placeB.name} || ${
        this.slot_a.slot
      } | ${this.slot_b.slot} | ${this.slot_c.slot}`
        );
    }

    sortTwoItems(start, dist, help) {
        this.logger(start, help);
        this.logger(start, dist);
        this.logger(help, dist);
    }

    sortThreeItems(start, dist, help) {
        this.sortTwoItems(start, help, dist);
        this.logger(start, dist);
        this.sortTwoItems(help, dist, start);
    }

    sortFourItems(start, dist, help) {
        this.sortThreeItems(start, help, dist);
        this.logger(start, dist);
        this.sortThreeItems(help, dist, start);
    }

    sortFiveItems(start, dist, help) {
        this.sortFourItems(start, help, dist);
        this.logger(start, dist);
        this.sortFourItems(help, dist, start);
    }

    sortSixItems(start, dist, help) {
        this.sortFiveItems(start, help, dist);
        this.logger(start, dist);
        this.sortFiveItems(help, dist, start);
    }

    sortSevenItems(start, dist, help) {
        this.sortSixItems(start, help, dist);
        this.logger(start, dist);
        this.sortSixItems(help, dist, start);
    }

    sortEightItems(start, dist, help) {
        this.sortSevenItems(start, help, dist);
        this.logger(start, dist);
        this.sortSevenItems(help, dist, start);
    }

    controller() {
        switch (this.startSlabQuantity) {
            case 3:
                this.sortThreeItems(this.slot_a, this.slot_c, this.slot_b);
                break;
            case 4:
                this.sortFourItems(this.slot_a, this.slot_c, this.slot_b);
                break;
            case 5:
                this.sortFiveItems(this.slot_a, this.slot_c, this.slot_b);
                break;
            case 6:
                this.sortSixItems(this.slot_a, this.slot_c, this.slot_b);
                break;
            case 7:
                this.sortSevenItems(this.slot_a, this.slot_c, this.slot_b);
                break;
            case 8:
                this.sortEightItems(this.slot_a, this.slot_c, this.slot_b);
                break;
            default:
                console.log(
                    "Invalid input value or type. Please chose a number between 3-8"
                );
        }
    }

    initialize() {
        this.initializePlaces();

        console.log(this.slot_a.name + ": " + this.slot_a.slot);
        console.log(this.slot_b.name + ": " + this.slot_b.slot);
        console.log(this.slot_c.name + ": " + this.slot_c.slot);

        this.controller();

        console.log(this.slot_a.name + ": " + this.slot_a.slot);
        console.log(this.slot_b.name + ": " + this.slot_b.slot);
        console.log(this.slot_c.name + ": " + this.slot_c.slot);
    }
}

class PlaceForSlab {
    constructor(name) {
        this.name = name;
        this.slot = [];
    }
}

new Crane(3);
new Crane(7);
new Crane(2);
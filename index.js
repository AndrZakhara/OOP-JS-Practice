class App {
    constructor(
        starterArcherNumber,
        firstArcherStartSuccessProbability,
        secondArcherStartSuccessProbability
    ) {
        this.starterArcherNumber = starterArcherNumber;
        this.firstArcherStartSuccessProbability = firstArcherStartSuccessProbability;
        this.secondArcherStartSuccessProbability = secondArcherStartSuccessProbability;
        this.curentDistance = 20;
        this.gameResultForSmartPlayer = "";
        this.statusGame = true;
        this.handleStep = this.handleStep.bind(this);
        this.handleShotResult = this.handleShotResult.bind(this);

        this.initialize();
    }

    handleStep(archerName) {
        this.curentDistance--;

        console.log(
            archerName + " make step, curent distance: " + this.curentDistance
        );
    }

    setWinner(name) {
        this.winner = name;
    }

    handleShotResult(name, result) {

        if (result === "success" && name === "lucky") {
            this.gameResultForSmartPlayer = "Lucky you're a winner!!!!";
        } else {

            if (result === "slip" && name === "random") {
                this.gameResultForSmartPlayer = "Lucky you're a winner!!!!";
            } else {
                this.gameResultForSmartPlayer = "Lucky you've lost the game!!!!";
            }
        }

        this.statusGame = false;

        console.log(this.gameResultForSmartPlayer);
    }

    initializeArcher(type) {
        return new Archer(
            type,
            this.firstArcherStartSuccessProbability,
            this.handleShotResult,
            this.handleStep
        );
    }

    switchActiveArcher() {
        const LuckyArcher = this.initializeArcher("lucky");
        const UnluckyArcher = this.initializeArcher("random");

        if (this.starterArcherNumber === 1) {

            do {
                LuckyArcher.makeDecisionAlgorithm(this.curentDistance);

                if (this.statusGame === true)
                    UnluckyArcher.makeDecisionAlgorithm(this.curentDistance);
            } while (this.statusGame === true);

        } else {

            do {
                UnluckyArcher.makeDecisionAlgorithm(this.curentDistance);

                if (this.statusGame === true)
                    LuckyArcher.makeDecisionAlgorithm(this.curentDistance);
            } while (this.statusGame === true);
        }
    }

    initialize() {
        this.switchActiveArcher(1);
    }
}

class Archer {
    constructor(logicType, startShotSuccessProbability, handleShot, handleStep) {
        this.name = logicType;
        this.logicType = logicType;
        this.startShotSuccessProbability = startShotSuccessProbability;
        this.handleShot = handleShot;
        this.handleStep = handleStep;
    }

    makeDecisionAlgorithm(distance) {
        const probability =
            ((this.startShotSuccessProbability - 1) / 20) * distance + 1;

        if (this.logicType === "lucky" && (distance === 11 || distance === 12)) {
            const randomNumber = Math.random();
            const result = randomNumber < probability ? "success" : "slip";
            this.handleShot(this.name, result);

            console.log(probability);
            console.log(this.name + ": " + result);
        } else {
            this.handleStep(this.name);
        }

        if (this.logicType === "random") {

            if (Math.random() < 0.3) {
                const randomNumber = Math.random();
                const result = randomNumber < probability ? "success" : "slip";
                this.handleShot(this.name, result);

                console.log(probability);
                console.log(this.name + ": " + result);
            } else {
                this.handleStep(this.name);
            }
        }
    }
}

new App(1, 0.2, 0.3);
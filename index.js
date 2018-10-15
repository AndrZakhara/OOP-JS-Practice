class App {
    constructor(element, calculaterForm, resultElement) {
        this.element = element;
        this.calculaterForm = calculaterForm;
        this.resultElement = resultElement;

        this.initialize();
    }

    initialize() {
        this.calculaterForm.onSubmit = this.resultElement.formValidation.bind(
            this.resultElement
        );
    }
}

class CalculaterForm {
    constructor(element) {
        this.element = element;
        this.inputValue = null;
        this.onSubmit = () => {};

        this.handleSubmit = this.handleSubmit.bind(this);

        this.initialize();
    }

    initialize() {
        this.inputValue = this.element.querySelector("#temperature-value-input");
        this.element.addEventListener("submit", this.handleSubmit);
    }

    handleSubmit(event) {
        event.preventDefault();

        let imputTemperatureValue = this.inputValue.value;

        if (imputTemperatureValue === "") {
            return alert("Введите исходные данные!");
        }

        this.onSubmit(imputTemperatureValue);
        this.inputValue.value = "";
    }
}

class ResultElement {
    constructor(element) {
        this.element = element;
        this.fahrenheit = "";
        this.celsius = "";
        this.kelvin = "";
        this.outputData = {};
    }

    destroy() {
        this.outputData = {};

        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
    }

    add(value, imputValue) {
        const paragraphValue =
            (value => value.charAt(0).toUpperCase() + value.slice(1))(value) + ": ";
        const elementValue = eval("this" + "." + value);

        if (imputValue !== undefined) {

            this.span = this.createElement(
                "span", { className: "result-value" },
                imputValue.toUpperCase()
            );
            this.paragraph = this.createElement(
                "p", { className: "temperature-value" },
                "Вы ввели: ",
                this.span
            );
            this.element.appendChild(this.paragraph);
        } else {
            this.span = this.createElement(
                "span", { className: "result-value" },
                elementValue
            );
            this.paragraph = this.createElement(
                "p", { className: "temperature-value" },
                paragraphValue,
                this.span
            );
            this.element.appendChild(this.paragraph);
        }
    }

    fahrenheitToCelsius(temperature) {
        this.celsiusValue = ((5 * (temperature - 32)) / 9).toFixed(0);
        this.celsius = this.celsiusValue + "C";
        this.add("celsius");
        this.outputData.C = this.celsiusValue;
    }

    fahrenheitToKelvin(temperature) {
        this.kelvinValue = (((temperature + 459.67) * 5) / 9).toFixed(0);
        this.kelvin = this.kelvinValue + "K";
        this.add("kelvin");
        this.outputData.K = this.kelvinValue;
    }

    celsiusToKelvin(temperature) {
        this.kelvinValue = (temperature + 273.15).toFixed(0);
        this.kelvin = this.kelvinValue + "K";
        this.add("kelvin");
        this.outputData.K = this.kelvinValue;
    }

    celsiusToFahrenheit(temperature) {
        this.fahrenheitValue = ((9 / 5) * temperature + 32).toFixed(0);
        this.fahrenheit = this.fahrenheitValue + "F";
        this.add("fahrenheit");
        this.outputData.F = this.fahrenheitValue;
    }

    kelvinToFahrenheit(temperature) {
        this.fahrenheitValue = ((temperature * 9) / 5 - 459.67).toFixed(0);
        this.fahrenheit = this.fahrenheitValue + "F";
        this.add("fahrenheit");
        this.outputData.F = this.fahrenheitValue;
    }

    kelvinToCelsius(temperature) {
        this.celsiusValue = (temperature - 273.15).toFixed(0);
        this.celsius = this.celsiusValue + "C";
        this.add("celsius");
        this.outputData.C = this.celsiusValue;
    }

    objectToJSON() {
        alert(`JSON: ${JSON.stringify(this.outputData)}`);
    }

    converter(temperatureDimension, imputValue, temperature) {
        switch (temperatureDimension) {
            case "K":
                this.add("kelvin", imputValue);
                this.kelvinToCelsius(temperature);
                this.kelvinToFahrenheit(temperature);
                break;
            case "C":
                this.add("celsius", imputValue);
                this.celsiusToFahrenheit(temperature);
                this.celsiusToKelvin(temperature);

                break;
            case "F":
                this.add("fahrenheit", imputValue);
                this.fahrenheitToCelsius(temperature);
                this.fahrenheitToKelvin(temperature);
                break;
        }
    }

    createElement(tag, props, ...children) {
        const element = document.createElement(tag);

        Object.keys(props).forEach(key => (element[key] = props[key]));

        children.forEach(child => {

            if (typeof child === "string") {
                child = document.createTextNode(child);
            }

            element.appendChild(child);
        });

        return element;
    }
    formValidation(imputTemperatureValue) {
        this.imputTemperatureValue = imputTemperatureValue
            .replace(/,/g, ".")
            .trim();
        const regExp = /-{0,1}\d*\.{0,1}\d+(k|f|c)/gi;

        if (!this.imputTemperatureValue.match(regExp)) {
            alert(
                "Введите данные в формате: 35.7F - Фарингейт, 25K - Кельвины, -25,08С - Цельсий"
            );
        } else {
            this.dimension = this.imputTemperatureValue
                .replace(/[^a-z]/gi, "")
                .toUpperCase();
            this.value = +this.imputTemperatureValue.replace(/[^0-9-\.]/g, "");
            this.temperatureValueForUI = this.value + this.dimension;

            this.destroy();
            this.converter(this.dimension, this.temperatureValueForUI, this.value);
            this.objectToJSON();
        }
    }
}

new App(
    document.querySelector("#app"),
    new CalculaterForm(document.querySelector("#temperature-calculator")),
    new ResultElement(document.querySelector("#result-temperature"))
);
const conversionFactors = {
  length: {
    meters: 1,
    centimeters: 0.01,
    millimeters: 0.001,
    kilometers: 1000,
    inches: 0.0254,
    feet: 0.3048,
    yards: 0.9144,
    miles: 1609.34,
  },
  mass: {
    kilograms: 1,
    grams: 0.001,
    milligrams: 0.000001,
    metric_tonnes: 1000,
    ounces: 0.0283495,
    pounds: 0.453592,
    tons: 907.185,
  },
  time: {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    months: 2629800,
    years: 31557600,
  },
  volume: {
    liters: 1,
    milliliters: 0.001,
    cubic_meters: 1000,
    cubic_inches: 0.0163871,
    gallons: 3.78541,
    quarts: 0.946353,
    pints: 0.473176,
    fluid_ounces: 0.0295735,
    barrels: 158.987,
  },
  fluid_volume: {
    liters: 1,
    milliliters: 0.001,
    cubic_meters: 1000,
    cubic_inches: 0.0163871,
    gallons: 3.78541,
    quarts: 0.946353,
    pints: 0.473176,
    fluid_ounces: 0.0295735,
    barrels: 158.987,
  },
  velocity: {
    meters_per_second: 1,
    kilometers_per_hour: 0.277778,
    miles_per_hour: 0.44704,
  },
  force: {
    newtons: 1,
    dynes: 0.00001,
    pounds_force: 4.44822,
    ounces_force: 0.2780139,
  },
  energy: {
    joules: 1,
    kilojoules: 1000,
    megajoules: 1000000,
    calories: 4.184,
    kilocalories: 4184,
    kilowatt_hours: 3600000,
  },
  power: {
    watts: 1,
    kilowatts: 1000,
    megawatts: 1000000,
    horsepower: 745.7,
  },
  density: {
    kg_per_cubic_meter: 1,
    g_per_cubic_cm: 1000,
  },
  pressure: {
    pascals: 1,
    kilopascals: 1000,
    megapascals: 1000000,
    bars: 100000,
    psi: 6895,
  },
  electric_current: {
    amperes: 1,
    milliamperes: 0.001,
    microamperes: 0.000001,
  },
  potential_difference: {
    volts: 1,
    millivolts: 0.001,
    microvolts: 0.000001,
  },
  electrical_resistance: {
    ohms: 1,
    kilohms: 1000,
    megohms: 1000000,
  },
  frequency: {
    hertz: 1,
    kilohertz: 1000,
    megahertz: 1000000,
    gigahertz: 1000000000,
  },
  temperature: {
    celsius: {
      to_base: (val) => val + 273.15,
      from_base: (val) => val - 273.15,
    },
    fahrenheit: {
      to_base: (val) => (val - 32) * (5 / 9) + 273.15,
      from_base: (val) => (val - 273.15) * (9 / 5) + 32,
    },
    kelvin: {
      to_base: (val) => val,
      from_base: (val) => val,
    },
  },
};

function populateUnits() {
  const sourceCategory = document.getElementById("sourceCategory").value;
  const unitDropdown = document.getElementById("sourceUnit");
  unitDropdown.innerHTML = "";

  Object.keys(conversionFactors[sourceCategory]).forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit;
    option.textContent = unit;
    unitDropdown.appendChild(option);
  });
}

function convert() {
  const inputValue = parseFloat(document.getElementById("inputValue").value);
  const sourceCategory = document.getElementById("sourceCategory").value;
  const sourceUnit = document.getElementById("sourceUnit").value;

  if (isNaN(inputValue)) {
    alert("Please enter a valid number!");
    return;
  }

  const sourceToBase = conversionFactors[sourceCategory][sourceUnit];

  const result = {};

  Object.keys(conversionFactors[sourceCategory]).forEach((targetUnit) => {
    if (targetUnit !== sourceUnit) {
      const targetFromBase = conversionFactors[sourceCategory][targetUnit];
      result[targetUnit] = (inputValue * sourceToBase) / targetFromBase;
    }
  });

  document.getElementById("result").innerHTML = formatResults(result);
}

function formatResults(results) {
  let output = "";
  Object.keys(results).forEach((unit) => {
    output += `${results[unit].toFixed(2)} ${unit}<br>`;
  });
  return output;
}

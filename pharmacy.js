export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

class DrugStrategy {
  constructor(drug) {
    this.drug = drug;
  }

  /**
   * @description
   * Update the benefit of the drug
   * @returns {void}
   */
  update() {
    if (this.drug.benefit > 0) {
      this.drug.benefit -= 1;
    }
    this.drug.expiresIn -= 1;
    if (this.drug.expiresIn < 0 && this.drug.benefit > 0) {
      this.drug.benefit -= 1;
    }
    this.drug.benefit = Math.max(this.drug.benefit, 0);
  }
}

class HerbalTeaStrategy extends DrugStrategy {
  update() {
    if (this.drug.benefit < 50) {
      this.drug.benefit += 1;
    }
    this.drug.expiresIn -= 1;
    if (this.drug.expiresIn < 0 && this.drug.benefit < 50) {
      this.drug.benefit += 1;
    }
    this.drug.benefit = Math.min(this.drug.benefit, 50); // Cap benefit at 50
  }
}

class MagicPillStrategy extends DrugStrategy {
  update() {
    // Magic Pill doesn't change
  }
}

class FervexStrategy extends DrugStrategy {
  update() {
    if (this.drug.expiresIn > 0) {
      if (this.drug.expiresIn <= 5) {
        this.drug.benefit += 3;
      } else if (this.drug.expiresIn <= 10) {
        this.drug.benefit += 2;
      } else {
        this.drug.benefit += 1;
      }
    } else {
      this.drug.benefit = 0; // Fervex drops to 0 after expiration
    }
    this.drug.expiresIn -= 1;
    this.drug.benefit = Math.min(this.drug.benefit, 50); // Cap benefit at 50
  }
}

class DafalganStrategy extends DrugStrategy {
  update() {
    if (this.drug.benefit > 0) {
      this.drug.benefit -= 2; // Degrades twice as fast
    }
    this.drug.expiresIn -= 1;
    if (this.drug.expiresIn < 0 && this.drug.benefit > 0) {
      this.drug.benefit -= 2; // Degrades twice as fast after expiration
    }
    this.drug.benefit = Math.max(this.drug.benefit, 0); // Ensure non-negative benefit
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  /**
   * @description
   * Get the strategy to update the benefit of a drug
   * @param {Drug} drug
   * @returns {DrugStrategy}
   */
  getStrategy(drug) {
    switch (drug.name) {
      case "Herbal Tea":
        return new HerbalTeaStrategy(drug);
      case "Magic Pill":
        return new MagicPillStrategy(drug);
      case "Fervex":
        return new FervexStrategy(drug);
      case "Dafalgan":
        return new DafalganStrategy(drug);
      default:
        return new DrugStrategy(drug);
    }
  }

  /**
   * @description
   * Update the benefit of each drug
   * @returns {Drug[]}
   */
  updateBenefitValue() {
    this.drugs.forEach((drug) => this.getStrategy(drug).update());
    return this.drugs;
  }
}

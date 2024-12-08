/**
 * @class Drug
 * @description
 * Represents a drug with a name, expiresIn and benefit
 * @param {string} name
 * @param {number} expiresIn
 * @param {number} benefit
 * @returns {void}
 * @example
 * const drug = new Drug('Doliprane', 20, 30);
 */
export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

/**
 * @class DrugStrategy
 * @description
 * Strategy pattern to update the benefit of a drug
 * @param {Drug} drug
 * @method update
 * @returns {void}
 * @example
 * const drug = new Drug('Doliprane', 20, 30);
 * const drugStrategy = new DrugStrategy(drug);
 * drugStrategy.update();
 */
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

/**
 * @class HerbalTeaStrategy
 * @description
 * Strategy pattern to update the benefit of Herbal Tea
 * @param {Drug} drug
 * @method update
 * @returns {void}
 * @example
 * const drug = new Drug('Herbal Tea', 20, 30);
 */
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

/**
 * @class MagicPillStrategy
 * @description
 * Strategy pattern to update the benefit of Magic Pill
 * @param {Drug} drug
 * @method update
 * @returns {void}
 * @example
 * const drug = new Drug('Magic Pill', 20, 30);
 */
class MagicPillStrategy extends DrugStrategy {
  update() {
    // Magic Pill doesn't change
  }
}

/**
 * @class FervexStrategy
 * @description
 * Strategy pattern to update the benefit of Fervex
 * @param {Drug} drug
 * @method update
 * @returns {void}
 * @example
 * const drug = new Drug('Fervex', 20, 30);
 */
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

/**
 * @class DafalganStrategy
 * @description
 * Strategy pattern to update the benefit of Dafalgan
 * @param {Drug} drug
 * @method update
 * @returns {void}
 * @example
 * const drug = new Drug('Dafalgan', 20, 30);
 */
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

/**
 * @class Pharmacy
 * @description
 * Represents a pharmacy with drugs
 * @param {Drug[]} drugs
 * @method getStrategy
 * @method updateBenefitValue
 * @returns {void}
 * @example
 * const drugs = [
 *  new Drug("Doliprane", 20, 30),
 *  new Drug("Herbal Tea", 10, 5),
 *  new Drug("Fervex", 12, 35),
 *  new Drug("Magic Pill", 15, 40),
 * ];
 * const pharmacy = new Pharmacy(drugs);
 */
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

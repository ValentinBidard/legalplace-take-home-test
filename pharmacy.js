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

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      if (
        this.drugs[i].name != "Herbal Tea" &&
        this.drugs[i].name != "Fervex"
      ) {
        if (this.drugs[i].benefit > 0) {
          if (this.drugs[i].name != "Magic Pill") {
            this.drugs[i].benefit = this.drugs[i].benefit - 1;
          }
        }
      } else {
        if (this.drugs[i].benefit < 50) {
          this.drugs[i].benefit = this.drugs[i].benefit + 1;
          if (this.drugs[i].name == "Fervex") {
            if (this.drugs[i].expiresIn < 11) {
              if (this.drugs[i].benefit < 50) {
                this.drugs[i].benefit = this.drugs[i].benefit + 1;
              }
            }
            if (this.drugs[i].expiresIn < 6) {
              if (this.drugs[i].benefit < 50) {
                this.drugs[i].benefit = this.drugs[i].benefit + 1;
              }
            }
          }
        }
      }
      if (this.drugs[i].name != "Magic Pill") {
        this.drugs[i].expiresIn = this.drugs[i].expiresIn - 1;
      }
      if (this.drugs[i].expiresIn < 0) {
        if (this.drugs[i].name != "Herbal Tea") {
          if (this.drugs[i].name != "Fervex") {
            if (this.drugs[i].benefit > 0) {
              if (this.drugs[i].name != "Magic Pill") {
                this.drugs[i].benefit = this.drugs[i].benefit - 1;
              }
            }
          } else {
            this.drugs[i].benefit =
              this.drugs[i].benefit - this.drugs[i].benefit;
          }
        } else {
          if (this.drugs[i].benefit < 50) {
            this.drugs[i].benefit = this.drugs[i].benefit + 1;
          }
        }
      }
    }

    return this.drugs;
  }
}

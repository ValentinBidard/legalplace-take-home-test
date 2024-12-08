import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Normal Drugs", () => {
    it("should decrease the benefit and expiresIn", () => {
      const drugs = [new Drug("test", 2, 3)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("test", 1, 2));
    });

    it("should decrease benefit and expiresIn by 1 per day", () => {
      const drugs = [new Drug("test", 10, 20)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("test", 9, 19));
    });

    it("should decrease benefit by 2 after expiration", () => {
      const drugs = [new Drug("test", 0, 20)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("test", -1, 18));
    });

    it("should not decrease benefit below 0", () => {
      const drugs = [new Drug("test", 10, 0)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("test", 9, 0));
    });
  });

  describe("Herbal Tea", () => {
    it("should increase benefit by 1 per day before expiration", () => {
      const drugs = [new Drug("Herbal Tea", 10, 20)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("Herbal Tea", 9, 21));
    });

    it("should increase benefit by 2 per day after expiration", () => {
      const drugs = [new Drug("Herbal Tea", 0, 20)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("Herbal Tea", -1, 22));
    });

    it("should cap benefit at 50", () => {
      const drugs = [new Drug("Herbal Tea", 10, 50)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("Herbal Tea", 9, 50));
    });
  });

  describe("Magic Pill", () => {
    it("should not decrease benefit or expiresIn", () => {
      const drugs = [new Drug("Magic Pill", 10, 40)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("Magic Pill", 10, 40));
    });
  });

  describe("Fervex", () => {
    it("should increase benefit by 1 when more than 10 days before expiration", () => {
      const drugs = [new Drug("Fervex", 11, 20)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("Fervex", 10, 21));
    });

    it("should increase benefit by 2 when 10 days or less before expiration", () => {
      const drugs = [new Drug("Fervex", 10, 20)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("Fervex", 9, 22));
    });

    it("should increase benefit by 3 when 5 days or less before expiration", () => {
      const drugs = [new Drug("Fervex", 5, 20)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("Fervex", 4, 23));
    });

    it("should drop benefit to 0 after expiration", () => {
      const drugs = [new Drug("Fervex", 0, 20)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("Fervex", -1, 0));
    });

    it("should cap benefit at 50", () => {
      const drugs = [new Drug("Fervex", 5, 48)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("Fervex", 4, 50));
    });
  });

  describe("Dafalgan", () => {
    it("should decrease benefit by 2 per day before expiration", () => {
      const drugs = [new Drug("Dafalgan", 5, 20)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("Dafalgan", 4, 18));
    });

    it("should decrease benefit by 4 per day after expiration", () => {
      const drugs = [new Drug("Dafalgan", 0, 20)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("Dafalgan", -1, 16));
    });

    it("should not decrease benefit below 0", () => {
      const drugs = [new Drug("Dafalgan", 5, 1)];
      const pharmacy = new Pharmacy(drugs);

      pharmacy.updateBenefitValue();

      expect(drugs[0]).toEqual(new Drug("Dafalgan", 4, 0));
    });
  });
});

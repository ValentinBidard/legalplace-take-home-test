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
});

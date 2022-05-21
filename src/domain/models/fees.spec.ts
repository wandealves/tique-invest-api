import { Fees } from "./fees";

interface SutTypes {
  fees: Fees;
  feeValues: number[];
}

const makeSut = (): SutTypes => {
  const feeValues = [0.24, 2.18];
  const fees = new Fees();

  return { fees, feeValues };
};

describe("Fees Domain", () => {
  test("Deve calcular a taxa do ativo com rateio com total de taxas válida", () => {
    const { fees, feeValues } = makeSut();

    const apportionmentPercentage = fees.calculateApportionmentPercentage(
      7952.23,
      1755.0
    );
    const totalFees = fees.calculateTotalFees(feeValues);

    const fee = fees.calculateFee(apportionmentPercentage, totalFees);

    expect(fee).toEqual(0.53);
  });
  test("Deve calcular a taxa do ativo com rateio com total de taxa zerada", () => {
    const { fees } = makeSut();

    const apportionmentPercentage = fees.calculateApportionmentPercentage(
      7952.23,
      1755.0
    );

    const fee = fees.calculateFee(apportionmentPercentage, 0);

    expect(fee).toEqual(0);
  });
  test("Deve calcular a porcetagem de rateio de um ativo com total de ativos compradas válida", () => {
    const { fees, feeValues } = makeSut();

    const apportionmentPercentage = fees.calculateApportionmentPercentage(
      7952.23,
      1755.0
    );

    expect(apportionmentPercentage).toEqual(22.07);
  });
  test("Deve calcular a porcetagem de rateio de um ativo com total de ativos compradas zerada", () => {
    const { fees } = makeSut();

    const apportionmentPercentage = fees.calculateApportionmentPercentage(
      0,
      1755.0
    );

    expect(apportionmentPercentage).toEqual(0);
  });
  test("Deve calcular o total de taxas com taxas informadas", () => {
    const { fees, feeValues } = makeSut();

    const totalFees = fees.calculateTotalFees(feeValues);

    expect(totalFees).toEqual(2.42);
  });
  test("Deve calcular o total de taxas sem taxas informada", () => {
    const { fees } = makeSut();

    const totalFees = fees.calculateTotalFees([]);

    expect(totalFees).toEqual(0);
  });
});

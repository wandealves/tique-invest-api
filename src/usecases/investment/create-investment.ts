import { inject, injectable } from "tsyringe";
import _ from "lodash";

//import {
// CreateInvestmentDto,
//Wallet,
//PurchasedAsset
//} from "../protocols/investment-protocols";
import { ICreateInvestment } from "../interfaces";
import { CreateInvestmentDto } from "../../shared/dtos";
//import { stringToTypeAsset, createPurchasedAssets } from "../../shared/mapper";

import { IInvestmentRepository } from "../interfaces/repositories";

@injectable()
export class CreateInvestment implements ICreateInvestment {
  constructor(
    @inject("InvestmentRepository")
    private investmentRepository: IInvestmentRepository
  ) {}

  async create(dto: CreateInvestmentDto): Promise<number> {
    /*const type = stringToTypeAsset(dto.type);
    const totalFees = _.reduce(
      dto.fees,
      function (sum, fee) {
        return sum + _.get(fee, "tax", 0);
      },
      0
    );
    const investment = new Wallet(0, type, dto.countryId, dto.userId);

    const purchasedAssets: PurchasedAsset[] = createPurchasedAssets(dto.assets);

    const totalWithoutFees =
      investment.calculateTotalWithoutFees(purchasedAssets);
    const totalWithFees = investment.calculateTotalWithFees(
      purchasedAssets,
      totalFees
    );

    investment.setTotal = totalWithoutFees;
    investment.setTotalFees = totalWithFees;
    const investmentCreate = await this.investmentRepository.create(investment);*/
    return 0;
  }
}

import { PurchasedAsset } from "../../src/domain/models";
import { TransactionType, CurrencyCode } from "../../src/domain/models/enums";

export const createWalletDto = {
  name: "Carteira 01",
  currencyCode: "BRL",
  userId: 1,
  createPurchasedAssets: [
    {
      codeAsset: "AALR3",
      price: 114.55,
      quantity: 3,
      date: new Date(2021, 1, 5),
      brokerName: "Corretora 01",
      transactionType: "COMPRA",
      currencyCode: "BRL"
    },
    {
      codeAsset: "ABEV3",
      price: 178.96,
      quantity: 5,
      date: new Date(2021, 1, 5),
      brokerName: "Corretora 01",
      transactionType: "COMPRA",
      currencyCode: "BRL"
    },
    {
      codeAsset: "AGRO3",
      price: 10.45,
      quantity: 4,
      date: new Date(2021, 1, 5),
      brokerName: "Corretora 01",
      transactionType: "COMPRA",
      currencyCode: "BRL"
    },
    {
      codeAsset: "ALUP11",
      price: 117.69,
      quantity: 2,
      date: new Date(2021, 1, 5),
      brokerName: "Corretora 01",
      transactionType: "COMPRA",
      currencyCode: "BRL"
    }
  ],
  fees: [
    {
      name: "Emolumentos",
      tax: 0.04
    },
    {
      name: "Tax de liquidação",
      tax: 0.41
    }
  ]
};

export const assets: PurchasedAsset[] = [
  new PurchasedAsset(
    0,
    114.55,
    3,
    "ATV01",
    "broker_valid",
    new Date(2021, 1, 5),
    TransactionType.COMPRA,
    CurrencyCode.BRL
  ),
  new PurchasedAsset(
    0,
    178.96,
    5,
    "ATV02",
    "broker_valid",
    new Date(2021, 1, 5),
    TransactionType.COMPRA,
    CurrencyCode.BRL
  ),
  new PurchasedAsset(
    0,
    10.45,
    4,
    "ATV03",
    "broker_valid",
    new Date(2021, 1, 5),
    TransactionType.COMPRA,
    CurrencyCode.BRL
  ),

  new PurchasedAsset(
    0,
    117.69,
    2,
    "ATV04",
    "broker_valid",
    new Date(2021, 1, 5),
    TransactionType.COMPRA,
    CurrencyCode.BRL
  )
];

export const unifyAssets: PurchasedAsset[] = [
  new PurchasedAsset(
    0,
    10.2,
    3,
    "ATV01",
    "broker_valid",
    new Date(2021, 1, 5),
    TransactionType.COMPRA,
    CurrencyCode.BRL
  ),
  new PurchasedAsset(
    0,
    9.8,
    5,
    "ATV01",
    "broker_valid",
    new Date(2021, 1, 5),
    TransactionType.COMPRA,
    CurrencyCode.BRL
  ),
  new PurchasedAsset(
    0,
    10.45,
    4,
    "ATV02",
    "broker_valid",
    new Date(2021, 1, 5),
    TransactionType.COMPRA,
    CurrencyCode.BRL
  ),

  new PurchasedAsset(
    0,
    117.69,
    2,
    "ATV02",
    "broker_valid",
    new Date(2021, 1, 5),
    TransactionType.COMPRA,
    CurrencyCode.BRL
  )
];

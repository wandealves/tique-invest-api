import { CurrencyCode, TransactionType } from "../../domain/models/enums";

export function stringToCurrencyCode(value: string) {
  switch (value) {
    case "BRL":
      return CurrencyCode.BRL;
    case "EUR":
      return CurrencyCode.EUR;
    case "USD":
      return CurrencyCode.USD;
  }

  return CurrencyCode.BRL;
}

export function stringToTransactionType(value: string) {
  switch (value) {
    case "COMPRA":
      return TransactionType.COMPRA;
    case "VENDA":
      return TransactionType.VENDA;
  }

  return TransactionType.COMPRA;
}

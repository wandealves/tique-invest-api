import {
  TypeTicket,
  CurrencyCode as CurrencyCodePrisma,
  TransactionType as TransactionTypePrisma
} from "@prisma/client";

import {
  CurrencyCode,
  TransactionType,
  TypeTicket as TypeAssetEntity
} from "../../domain/models/enums";

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

export function transactionTypeToTransactionTypePrisma(value: TransactionType) {
  switch (value) {
    case TransactionType.COMPRA:
      return TransactionTypePrisma.COMPRA;
    case TransactionType.VENDA:
      return TransactionTypePrisma.VENDA;
  }
}

export function typeAssetToPrismaTypeAsset(value: TypeAssetEntity) {
  switch (value) {
    case TypeAssetEntity.ACAO:
      return TypeTicket.ACAO;
    case TypeAssetEntity.BDR:
      return TypeTicket.BDR;
    case TypeAssetEntity.CDB:
      return TypeTicket.CDB;
    case TypeAssetEntity.COE:
      return TypeTicket.COE;
    case TypeAssetEntity.FIIS:
      return TypeTicket.FIIS;
    case TypeAssetEntity.LC:
      return TypeTicket.LC;
    case TypeAssetEntity.LCA:
      return TypeTicket.LCA;
    case TypeAssetEntity.LCI:
      return TypeTicket.LCI;
    case TypeAssetEntity.MULTIMERCADO:
      return TypeTicket.MULTIMERCADO;
    case TypeAssetEntity.OPCOES:
      return TypeTicket.OPCOES;
    case TypeAssetEntity.TESOURODIRETO:
      return TypeTicket.TESOURODIRETO;
  }
}

export function typeAssetPrismaToTypeAsset(value: TypeTicket) {
  switch (value) {
    case TypeTicket.ACAO:
      return TypeAssetEntity.ACAO;
    case TypeTicket.BDR:
      return TypeAssetEntity.BDR;
    case TypeTicket.CDB:
      return TypeAssetEntity.CDB;
    case TypeTicket.COE:
      return TypeAssetEntity.COE;
    case TypeTicket.FIIS:
      return TypeAssetEntity.FIIS;
    case TypeTicket.LC:
      return TypeAssetEntity.LC;
    case TypeTicket.LCA:
      return TypeAssetEntity.LCA;
    case TypeTicket.LCI:
      return TypeAssetEntity.LCI;
    case TypeTicket.MULTIMERCADO:
      return TypeAssetEntity.MULTIMERCADO;
    case TypeTicket.OPCOES:
      return TypeAssetEntity.OPCOES;
    case TypeTicket.TESOURODIRETO:
      return TypeAssetEntity.TESOURODIRETO;
  }
}

export function currencyCodeToString(value: CurrencyCode) {
  switch (value) {
    case CurrencyCode.BRL:
      return "BRL";
    case CurrencyCode.EUR:
      return "EUR";
    case CurrencyCode.USD:
      return "USD";
  }
}

export function currencyCodePrismaToCurrencyCode(value: CurrencyCodePrisma) {
  switch (value) {
    case CurrencyCodePrisma.BRL:
      return CurrencyCode.BRL;
    case CurrencyCodePrisma.EUR:
      return CurrencyCode.EUR;
    case CurrencyCodePrisma.USD:
      return CurrencyCode.USD;
  }
}

export function currencyCodeToCurrencyCodePrisma(value: CurrencyCode) {
  switch (value) {
    case CurrencyCode.BRL:
      return CurrencyCodePrisma.BRL;
    case CurrencyCode.EUR:
      return CurrencyCodePrisma.EUR;
    case CurrencyCode.USD:
      return CurrencyCodePrisma.USD;
  }
}

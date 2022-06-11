import {
  TypeAsset,
  CurrencyCode as CurrencyCodePrisma,
  TransactionType as TransactionTypePrisma
} from "@prisma/client";

import {
  CurrencyCode,
  TransactionType,
  TypeAsset as TypeAssetEntity
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
      return TypeAsset.ACAO;
    case TypeAssetEntity.BDR:
      return TypeAsset.BDR;
    case TypeAssetEntity.CDB:
      return TypeAsset.CDB;
    case TypeAssetEntity.COE:
      return TypeAsset.COE;
    case TypeAssetEntity.FIIS:
      return TypeAsset.FIIS;
    case TypeAssetEntity.LC:
      return TypeAsset.LC;
    case TypeAssetEntity.LCA:
      return TypeAsset.LCA;
    case TypeAssetEntity.LCI:
      return TypeAsset.LCI;
    case TypeAssetEntity.MULTIMERCADO:
      return TypeAsset.MULTIMERCADO;
    case TypeAssetEntity.OPCOES:
      return TypeAsset.OPCOES;
    case TypeAssetEntity.TESOURODIRETO:
      return TypeAsset.TESOURODIRETO;
  }
}

export function typeAssetPrismaToTypeAsset(value: TypeAsset) {
  switch (value) {
    case TypeAsset.ACAO:
      return TypeAssetEntity.ACAO;
    case TypeAsset.BDR:
      return TypeAssetEntity.BDR;
    case TypeAsset.CDB:
      return TypeAssetEntity.CDB;
    case TypeAsset.COE:
      return TypeAssetEntity.COE;
    case TypeAsset.FIIS:
      return TypeAssetEntity.FIIS;
    case TypeAsset.LC:
      return TypeAssetEntity.LC;
    case TypeAsset.LCA:
      return TypeAssetEntity.LCA;
    case TypeAsset.LCI:
      return TypeAssetEntity.LCI;
    case TypeAsset.MULTIMERCADO:
      return TypeAssetEntity.MULTIMERCADO;
    case TypeAsset.OPCOES:
      return TypeAssetEntity.OPCOES;
    case TypeAsset.TESOURODIRETO:
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

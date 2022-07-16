import {
  AssetType,
  CurrencyCode as CurrencyCodePrisma,
  TransactionType as TransactionTypePrisma
} from "@prisma/client";

import {
  CurrencyCode,
  TransactionType,
  AssetType as TypeAssetEntity
} from "../../domain/models/enums";

import { strings } from "../constants/strings";

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

export function transactionTypeToString(value: TransactionType) {
  switch (value) {
    case TransactionType.COMPRA:
      return "COMPRA";
    case TransactionType.VENDA:
      return "VENDA";
  }
}

export function transactionTypeToTransactionTypePrisma(value: TransactionType) {
  switch (value) {
    case TransactionType.COMPRA:
      return TransactionTypePrisma.COMPRA;
    case TransactionType.VENDA:
      return TransactionTypePrisma.VENDA;
  }
}

export function transactionTypePrismaToTransactionType(
  value: TransactionTypePrisma
) {
  switch (value) {
    case TransactionTypePrisma.COMPRA:
      return TransactionType.COMPRA;
    case TransactionTypePrisma.VENDA:
      return TransactionType.VENDA;
  }
}

export function typeAssetToPrismaTypeAsset(value: TypeAssetEntity) {
  switch (value) {
    case TypeAssetEntity.ACAO:
      return AssetType.ACAO;
    case TypeAssetEntity.BDR:
      return AssetType.BDR;
    case TypeAssetEntity.CDB:
      return AssetType.CDB;
    case TypeAssetEntity.COE:
      return AssetType.COE;
    case TypeAssetEntity.FIIS:
      return AssetType.FIIS;
    case TypeAssetEntity.LC:
      return AssetType.LC;
    case TypeAssetEntity.LCA:
      return AssetType.LCA;
    case TypeAssetEntity.LCI:
      return AssetType.LCI;
    case TypeAssetEntity.MULTIMERCADO:
      return AssetType.MULTIMERCADO;
    case TypeAssetEntity.OPCOES:
      return AssetType.OPCOES;
    case TypeAssetEntity.TESOURODIRETO:
      return AssetType.TESOURODIRETO;
  }
}

export function typeAssetPrismaToTypeAsset(value: AssetType) {
  switch (value) {
    case AssetType.ACAO:
      return TypeAssetEntity.ACAO;
    case AssetType.BDR:
      return TypeAssetEntity.BDR;
    case AssetType.CDB:
      return TypeAssetEntity.CDB;
    case AssetType.COE:
      return TypeAssetEntity.COE;
    case AssetType.FIIS:
      return TypeAssetEntity.FIIS;
    case AssetType.LC:
      return TypeAssetEntity.LC;
    case AssetType.LCA:
      return TypeAssetEntity.LCA;
    case AssetType.LCI:
      return TypeAssetEntity.LCI;
    case AssetType.MULTIMERCADO:
      return TypeAssetEntity.MULTIMERCADO;
    case AssetType.OPCOES:
      return TypeAssetEntity.OPCOES;
    case AssetType.TESOURODIRETO:
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

export function tokenError(message: string) {
  switch (message) {
    case "jwt malformed":
      return strings.MSS09;
    case "jwt signature is required":
      return strings.MSS10;
    case "invalid signature":
      return strings.MSS11;
    case "jwt expired":
      return strings.MSS12;
    default:
      return strings.ERR01;
  }
}

import { TypeAsset } from "@prisma/client";

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

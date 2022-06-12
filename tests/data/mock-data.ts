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

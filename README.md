# Tique Invest 💸

API para calculo de cateira de investiemntos

## Cálculo de compra de um único ticket

- **Custo unitário**

taxas: emolumento, taxa liquidação, taxa de corretagem, ISS;

a) Calcular total comprado com taxas

TCT = (P x Q) + TX

onde:

TCT = Total comprado com taxas;
P = Preço da compra;
Q = Quantidade;
TX = Total de taxas;

b) Calculo custo unitário

CU = TCT / Q

onde:

CU = Custo unitário;
TCT = Total com taxas;
Q = Quantidade

## Cálculo de compra de mais de um ticket

- **Se aparecer o mesmo ticket em mais de uma linha, somar os valores e quantidades**

ATV01 = quantidade = 10, preço 4 reais;
ATV01 = quantidade = 7, preço 3,80 reais;

ATV01 = qunatidade 17, total = 66,60

- **Rateio**

a) Calcular total compra um ticket

TCU = (P x Q);

onde:

TCU = Total comprado do ticket;
P = Preço da compra;
Q = Quantidade;

b) Calculo total comprado de todos tickets

TC = T1 + T2 + Tn;

onde:

TC = Total comprdao de mais de um ticket;
Tn = TCU de um ticket;

c) Calculo porcetagem do total de cada tocket em realação ao total de todos

PU = (TCU x 100) / TC;

onde:

PU = Porcetagem total de um ativo;
TCU = Total comprado de um ativo;
TC = Total comprado de todos ativos;

d) Calculo do valor de rateio para um ticket

RU = (TT x PU) / 100;

onde:

RU = Rateio de um ticket;
TT = Total das taxas;
PU = Porcetagem de um ticket;

e) Calculo com total com rateio

TR = TCU + RU

onde:

TR = Total de um ticket com rateio;
TCU = Total de um ticket;
RU = Rateio de um ticket;

f) Calcular média ponderada do custo de aquisição

MP = TCU1 + TCU2 + TCUn / Q1 + Q2 + Qn

onde:

MP: Média ponderada do mesmo ticket;
TCU = Total comprado do ticket;
Q = Quantidade de ticket;

custo unitário de aquisição = MP;

## Cálculo de venda total de um ticket

VL = (P x Q) - TX

onde:

VL = Venda liquida;
P = Preço do ticket;
Q = Quantidade;
TX = Total taxas;

CT = VL - CU

onde:

CT = Custo total após venda;
VL = Venda liquida;
CU = Custo unitário;

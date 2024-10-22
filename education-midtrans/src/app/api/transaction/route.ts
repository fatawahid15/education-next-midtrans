import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import { MidtransClient } from "midtrans-node-client";

type Item = {
  id: string;
  price: number;
  quantity: number;
  amount: number;
  name: string;
};

const snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data || data.length === 0) {
    throw new Error("Data not found");
  }

  const itemDetails = data.map((item: Item) => ({
    id: item.id,
    price: _.ceil(parseFloat(item.amount.toString())),
    quantity: item.quantity,
    name: item.name,
  }));

  const grossAmount = _.sumBy(itemDetails, "price");
  const orderId = _.random(100000, 999999).toString();

  const parameter = {
    item_details: itemDetails,
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
  };

  const token = await snap.createTransactionToken(parameter);

  return NextResponse.json({
    token,
  })
}

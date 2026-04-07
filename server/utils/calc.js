export function calculateProfit(product) {
  const returnLoss =
    product.selling_price * (product.return_rate / 100);

  const profit =
    product.selling_price -
    (
      product.cost_price +
      product.ad_spend +
      product.platform_fees +
      product.delivery_cost +
      returnLoss
    );

  const margin = (profit / product.selling_price) * 100;

  let suggestion = "Scale this product";

  if (profit < 0) {
    suggestion = "Stop selling this product";
  } else if (margin < 15) {
    suggestion = "Reduce ad spend or optimize costs";
  }

  return {
    ...product,
    profit: Number(profit.toFixed(2)),
    margin: Number(margin.toFixed(2)),
    suggestion
  };
}
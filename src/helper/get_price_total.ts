const item_prices = {
    pizza: 300,
    bread: 450,
    cheese: 1050,
    burger: 200
  };
  
  const order_item = { bread: 6, pizza: 2, cheese: 4 };
  
  // Function to calculate total price for each item
  export function calculateItemTotalPrice(order:any, prices:any) {
    const itemTotalPrices:any = {};
  
    // Iterate through each item in the order
    for (const item in order) {
      if (order.hasOwnProperty(item) && prices.hasOwnProperty(item)) {
        // Calculate the total price for each item and store it in the result object
        itemTotalPrices[item] = prices[item] * order[item];
      }
    }
  
    return itemTotalPrices;
  }
  
  // Calculate the total price for each item
  const itemTotalPrices = calculateItemTotalPrice(order_item, item_prices);
  
  // Log the result
  
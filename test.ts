const data = {
    item: { bread: 1, pizza: 5, cheese: 2 },
    price: { bread: 450, pizza: 300, cheese: 1050 },
    total: 1800
  };
  
  const generateReceipt = () => {
    let receipt = "Thank you for your purchase!\n\n";
  
    for (const itemName in data.item) {
      const quantity = data.item[itemName];
      const itemPrice = data.price[itemName];
      const subtotal = quantity * itemPrice;
  
      receipt += `<b>${itemName}</b>: ${quantity} x ${itemPrice} = ${subtotal} <br/>`;
    }
  
    receipt += `\n<b>Total:</b> ${data.total}`;
  
    return receipt;
  };
  
  // Example usage:
  const receipt = generateReceipt();
  console.log(receipt);
  
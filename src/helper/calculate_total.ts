// const total_amount: { pizza: number; bread: number; cheese: number } = {
//     pizza: 300,
//     bread: 900,
//     cheese: 4200,
//   };
  
  // Function to calculate the total amount from an object
    
    export function calculateTotalAmount(items?: Record<string, number>, ): number {
        let total = 0;
      
        // Iterate through each item in the object
        for (const item in items) {
          if (items.hasOwnProperty(item)) {
            // Add the value of each item to the total
            total += items[item];
          }
        }
      
        return total;
      }

  
  // Calculate the total amount
  
  // Log the result
  
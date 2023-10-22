function decreaseQuantity() {
  let input = document.querySelector(".quantity-input");
  let count = document.querySelector(".quantity-count");
  if (input.value > 1) {
    input.value = parseInt(input.value) - 1;
    count.textContent = input.value;
  }
}

function increaseQuantity() {
  let input = document.querySelector(".quantity-input");
  let count = document.querySelector(".quantity-count");
  input.value = parseInt(input.value) + 1;
  count.textContent = input.value;
}

document.getElementById("pay-now").addEventListener("click", async function () {
  try {
    // Make a POST request to your AWS Lambda endpoint
    const response = await fetch("YOUR_AWS_API_GATEWAY_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.id) {
      // Redirect user to Stripe Checkout using the session ID
      const stripe = Stripe("YOUR_STRIPE_PUBLIC_KEY");
      stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      console.error("Failed to create Stripe session.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

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
    const response = await fetch(
      "https://lx09gimfaa.execute-api.us-east-2.amazonaws.com/test",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.text();
    console.log("data: ", data);
    console.log("Received response:", response);

    if (data.id) {
      // Redirect user to Stripe Checkout using the session ID
      const stripe = Stripe(
        "pk_test_51O2wFAAQdYAgdONHPN8sVYO42MMGadgmuPiElmJbxGZBurwAfSGfO9KM4hG1YP6HBU6iZ27MPy0DdnpLOgbEmoOo00S3vYwK9b"
      );
      stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      console.error("Failed to create Stripe session.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

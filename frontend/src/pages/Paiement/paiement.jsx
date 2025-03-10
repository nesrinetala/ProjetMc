document.getElementById("payment-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const name = document.getElementById("name").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiryDate = document.getElementById("expiry-date").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const message = document.getElementById("message");

    // Vérification simple des champs
    if (name === "" || cardNumber === "" || expiryDate === "" || cvv === "") {
        message.textContent = "Veuillez remplir tous les champs.";
        message.style.color = "red";
        return;
    }

    // Vérification du format du numéro de carte (simple)
    const cardRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
    if (!cardRegex.test(cardNumber)) {
        message.textContent = "Numéro de carte invalide.";
        message.style.color = "red";
        return;
    }

    // Vérification du format de la date d'expiration
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiryDate)) {
        message.textContent = "Date d'expiration invalide.";
        message.style.color = "red";
        return;
    }

    // Vérification du format du CVV
    if (cvv.length !== 3 || isNaN(cvv)) {
        message.textContent = "CVV invalide.";
        message.style.color = "red";
        return;
    }

    // Message de succès
    message.textContent = "Paiement réussi ! 🎉";
    message.style.color = "green";

    // Réinitialiser le formulaire après 2 secondes
    setTimeout(() => {
        document.getElementById("payment-form").reset();
        message.textContent = "";
    }, 2000);
});

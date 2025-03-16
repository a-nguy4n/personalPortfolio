document.addEventListener("DOMContentLoaded", function () {
    const envelopeContainer = document.querySelector(".envelope-container");
    const envelope = document.querySelector(".envelope");
    const flap = document.querySelector(".flap");
    const formCard = document.querySelector(".contactPostcard");
    const sendButton = document.querySelector(".send-button");

    // Open Envelope Animation when the page loads
    setTimeout(() => {
        envelopeContainer.classList.add("open");
    }, 800); // Slight delay for smooth animation

    // Close Envelope Animation when Send button is clicked
    sendButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent instant form submission
        envelopeContainer.classList.remove("open");

        setTimeout(() => {
            document.querySelector("form").submit(); // Submit after animation
        }, 1000); // Delay to allow animation to complete
    });
});

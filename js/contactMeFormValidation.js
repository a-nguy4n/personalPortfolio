let contactForm_errors = [];

function logFormError(field, message) {
  const errorObj = {
    field: field,
    message: message,
    timestamp: new Date().toISOString()
  };
  contactForm_errors.push(errorObj);
}

function displayError(msg) {
  const errorOutput = document.getElementById("error-message");
  errorOutput.textContent = msg;
  setTimeout(() => {
    clearError();
  }, 
  5000);
}

function clearError() {
  document.getElementById("error-message").textContent = "";
}

function attachErrorLog() {
  let hiddenField = document.querySelector("input[name='form-errors']");
  if(!hiddenField){
    hiddenField = document.createElement("input");
    hiddenField.type = "hidden";
    hiddenField.name = "form-errors";
    contactForm.appendChild(hiddenField);
  }
  hiddenField.value = JSON.stringify(contactForm_errors);
}

// Full Name Validation & Checking 
const fullNameField = document.getElementById("fullName");
const fullNameError = document.getElementById("fullNameError");
const namePattern = /^[A-Za-z\s]*$/;

fullNameField.addEventListener("input", function(){
  const currentValue = fullNameField.value;
  if (!namePattern.test(currentValue)) {
    fullNameField.value = currentValue.slice(0, -1);
    fullNameField.classList.add("flash-error");
    fullNameError.textContent = "Improper character usage. Letters only.";
    fullNameError.classList.add("visible");

    logFormError("fullName", "Illegal character entered.");

    setTimeout(() => {
      fullNameField.classList.remove("flash-error");
      fullNameError.textContent = "";
      fullNameError.classList.remove("visible");
    }, 
    5000);
  }
});

// Message Character Count Max + Min 
const messageField = document.getElementById("message");
const messageError = document.getElementById("messageError");
const infoOutput = document.getElementById("info-message");
const maxMessageLength = parseInt(messageField.getAttribute("maxlength"), 10);

messageField.addEventListener("input", function(){
  const currentLength = messageField.value.length;
  const charsRemaining = maxMessageLength - currentLength;
  infoOutput.textContent = `${charsRemaining} characters remaining.`;
  
  if(charsRemaining < 10){
    messageField.style.borderColor = "orange";
  } 
  else{
    messageField.style.borderColor = "";
  }

  if(charsRemaining < 200){
    infoOutput.style.color = "red";
  }
  else{
    infoOutput.style.color = "blue";
  }

  if(charsRemaining < 0){
    messageField.setCustomValidity("Message exceeds maximum allowed characters.");
    messageField.classList.add("flash-error");
    messageError.textContent = "Exceeded maximum characters!";
    messageError.classList.add("visible");
    logFormError("message", "Exceeded maximum characters.");
  } 
  else{
    messageField.setCustomValidity("");
    messageField.classList.remove("flash-error");
    messageError.textContent = "";
    messageError.classList.remove("visible");
  }
});

// Checking each input box 
const contactForm = document.querySelector("form");
const emailField = document.getElementById("email");
const emailError = document.getElementById("emailError");

contactForm.addEventListener("submit", function(event){
    
    let hasError = false; 

    // for Full Name Field
    if(!fullNameField.value.trim()){
        
        logFormError("fullName", "Full name is required.");
        fullNameField.classList.add("flash-error");
        fullNameError.textContent = "Full name is required.";
        fullNameError.classList.add("visible");
        
        setTimeout(() => {
        fullNameField.classList.remove("flash-error");
        fullNameError.textContent = "";
        fullNameError.classList.remove("visible");
        }, 
        5000);

        hasError = true;
    }

    // for Email Field
    if(!emailField.value.trim() || !emailField.value.includes("@")){
        logFormError("email", "Invalid email format.");
        emailField.classList.add("flash-error");
        emailError.textContent = "Invalid email format.";
        emailError.classList.add("visible");
        
        setTimeout(() => {
        emailField.classList.remove("flash-error");
        emailError.textContent = "";
        emailError.classList.remove("visible");
        }, 
        5000);
        
        hasError = true;
    }

    // for checking the Message Char Counts
    if(messageField.value.trim().length < 10){
        logFormError("message", "Message too short.");
        messageField.classList.add("flash-error");
        messageError.textContent = "Message must be at least 10 characters.";
        messageError.classList.add("visible");
        
        setTimeout(() => {
        messageField.classList.remove("flash-error");
        messageError.textContent = "";
        messageError.classList.remove("visible");
        }, 
        5000);
        
        hasError = true;
    }

    if(hasError){
        event.preventDefault();
        displayError("Please fix errors to send the message");
    } 
    else{
        attachErrorLog();
    }
});
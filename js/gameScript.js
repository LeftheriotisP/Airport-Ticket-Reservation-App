const wordText = document.querySelector(".word"),
hintImage = document.querySelector(".hint span"),
wordInputsDiv = document.querySelector(".word-inputs"),
cancelBtn = document.querySelector(".cancel-word"),
checkBtn = document.querySelector(".check-word");

let inputFields = [];
let correctWord = "";

// Helper function to focus on the next input field
const focusNextInput = (currentIndex) => {
    if (currentIndex < inputFields.length - 1) {
        inputFields[currentIndex + 1].focus();
    }
};

const initGame = () => {
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintImage.innerHTML = `<img class="hint-image" src="${randomObj.hint}" alt="Hint Image">`;
    correctWord = randomObj.word.toLowerCase();

    // Clear any existing input fields
    wordInputsDiv.innerHTML = "";
    inputFields = [];

    // Create and append input fields for each letter of the scrambled word
    for (let i = 0; i < wordArray.length; i++) {
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.maxLength = 1;
        inputField.addEventListener("input", (event) => {
            // Automatically focus on the next input field when the user types a letter
            const currentInput = event.target;
            const currentIndex = inputFields.indexOf(currentInput);
            currentInput.value = currentInput.value.toUpperCase();
            focusNextInput(currentIndex);
        });
        wordInputsDiv.appendChild(inputField);
        inputFields.push(inputField);
    }
};
initGame();

// Hide check button until the user has filled the fields
inputFields.forEach(inputField => {
    inputField.addEventListener("input", () => {
        const isWordComplete = inputFields.every(input => input.value.trim() !== "");

        if (isWordComplete) {
            checkBtn.style.display = "block";
        } else {
            checkBtn.style.display = "none";
        }
    });
});

const returnToHomepage = () => {
    window.location.href = "user_homepage.html";
};
function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
  
    return code;
}
const randomCode = generateRandomCode(8);

const checkWord = async () => {
    const userWord = inputFields.map(input => input.value.toLowerCase()).join("");
    if (!userWord) return alert("Please enter the word to check!");
    if (userWord !== correctWord) return alert(`Oops! ${userWord} is not the correct word`);

    let userEmail;

    do {
        userEmail = prompt(`Congratulations! ${correctWord} is the correct word! Please enter your email to receive a discount code for your next flight`);

        if (userEmail === null) {
        // User canceled the prompt
        return;
        }

        // Check if userEmail includes the "@" symbol
        if (!userEmail.includes("@")) {
        alert("Invalid email format. Please enter a valid email address.");
        }
    } while (userEmail !== null && !userEmail.includes("@"));

    const emailData = {
        recipient: userEmail,
        subject: 'Sky Airlines Discount Code',
        text: 'You won the word game!',
        htmlContent: '<p>Your discount code: '+randomCode+'<br> Use this when reserving your next tickets from our website and win 10€ discount per ticket.</p>'
    };
    console.log('this is randomcode:', randomCode);
    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error sending email:', error));

    const userId = sessionStorage.getItem('userId');
    const discountCode = randomCode;
    const addDiscountCode = async (userId, discountCode) => {
        try {
            const response = await fetch(`http://localhost:3000/users/addDiscountCode/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ discountCode })
            });
    
            const data = await response.json();
            console.log('Discount code added:', data.message);
        } catch (error) {
            console.error('Error adding discount code:', error);
        }
    };
    await addDiscountCode(userId, discountCode);
    window.location.href = 'user_homepage.html';
};

cancelBtn.addEventListener("click", returnToHomepage);
checkBtn.addEventListener("click", checkWord);


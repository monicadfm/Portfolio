// Copy email to clipboard
const copyButton = document.getElementById("copyEmail");
const emailAddress = document.getElementById("emailAddress");

copyButton.addEventListener("click", async function () {
    try {
        await navigator.clipboard.writeText(emailAddress.textContent);
        copyButton.textContent = "Copied!";
    }
    catch (error) {
        // Clipboard blocked: select the text instead
        const range = document.createRange();
        range.selectNodeContents(emailAddress);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        copyButton.textContent = "Press Ctrl+C";
    }

    setTimeout(function () {
        copyButton.textContent = "Copy";
    }, 2000);
});
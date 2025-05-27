const API_BASE_URL = "https://solar-power-698w.onrender.com";

/**
 * Sends a query to the backend API.
 * @param {Object} formData - The data to send in the API request.
 * @returns {Promise<Response>} - The API response.
 */
async function sendQuery(formData) {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You need to log in before submitting the form.");
        window.location.href = "/login"; // Redirect to login page
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/queries/sendQuery`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        return response;
    } catch (err) {
        console.error("Error submitting query:", err);
        throw err;
    }
}

// Export the function to use it in other files
export { sendQuery };
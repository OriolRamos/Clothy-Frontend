export const sendEmailBenvinguda = async (email, dynamicData) => {
    try {
        const response = await fetch("http://127.0.0.1:8080/send-email/benvinguda", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                username: dynamicData.username,
                subject: dynamicData.subject,
            }),
        });

        if (!response.ok) {
            throw new Error("Error en enviar el correu.");
        }

        const result = await response.json();
        return { success: true, message: result.message };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error en enviar el correu." };
    }
};

export const sendEmailBenvinguda = async (email, dynamicData) => {
    try {
        // Ús de la variable d'entorn per la URL de l'API
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/send-email/benvinguda`, {
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
            throw new Error(response.detail);
        }

        const result = await response.json();
        return { success: true, message: result.message };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error en enviar el correu." };
    }
};

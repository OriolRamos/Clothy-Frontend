import emailjs from "emailjs-com";

// Configura el servei d'enviament de correus
export const sendEmail = async (form) => {
    try {
        const result = await emailjs.sendForm(
            "service_9yfcono", // Substitueix pel teu Service ID d'EmailJS
            "template_r54ce8o", // Substitueix pel teu Template ID
            form,              // Formulari enviat
            "hzvEBazDws9VmyUrg"  // Substitueix per la teva Public Key d'EmailJS
        );

        console.log("Correu enviat!", result.text);
        return { success: true, message: "Correu enviat correctament!" };
    } catch (error) {
        console.error("Error en enviar el correu", error.text);
        return { success: false, message: "Error en enviar el correu." };
    }
};

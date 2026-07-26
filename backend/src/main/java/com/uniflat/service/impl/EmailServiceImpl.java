package com.uniflat.service.impl;

import com.uniflat.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:noreply@uniflat.com}")
    private String fromEmail;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendInquiryNotificationToLandlord(
            String landlordEmail,
            String landlordName,
            String studentName,
            String studentEmail,
            String studentPhone,
            String flatTitle,
            String inquiryMessage,
            String preferredMoveInDate
    ) {
        try {
            logger.info("Attempting to send inquiry notification email to landlord: {}", landlordEmail);

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(fromEmail);
            mailMessage.setTo(landlordEmail);
            mailMessage.setSubject("New Student Visit Request for: " + flatTitle);

            String body = String.format(
                    "Hello %s,\n\n" +
                    "You have received a new zero-brokerage student visit request for your flat listing on UniFlat!\n\n" +
                    "--- STUDENT & INQUIRY DETAILS ---\n" +
                    "Property Title: %s\n" +
                    "Student Name: %s\n" +
                    "Student Email: %s\n" +
                    "Student Phone: %s\n" +
                    "Preferred Move-in Date: %s\n\n" +
                    "Inquiry Message:\n\"%s\"\n\n" +
                    "Please log in to your UniFlat Landlord Dashboard to accept or decline this visit request.\n\n" +
                    "Best regards,\n" +
                    "The UniFlat Support Team",
                    landlordName != null ? landlordName : "Landlord",
                    flatTitle,
                    studentName,
                    studentEmail,
                    studentPhone != null ? studentPhone : "N/A",
                    preferredMoveInDate != null ? preferredMoveInDate : "Not specified",
                    inquiryMessage
            );

            mailMessage.setText(body);

            mailSender.send(mailMessage);
            logger.info("Inquiry notification email sent successfully to landlord: {}", landlordEmail);
        } catch (Exception ex) {
            // Requirement 5: Log failure without interrupting inquiry persistence
            logger.warn("Could not send email to landlord {}: {}. Inquiry saved successfully.", landlordEmail, ex.getMessage());
        }
    }
}

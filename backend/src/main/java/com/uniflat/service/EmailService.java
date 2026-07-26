package com.uniflat.service;

public interface EmailService {

    void sendInquiryNotificationToLandlord(
            String landlordEmail,
            String landlordName,
            String studentName,
            String studentEmail,
            String studentPhone,
            String flatTitle,
            String inquiryMessage,
            String preferredMoveInDate
    );
}

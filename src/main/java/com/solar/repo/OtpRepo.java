package com.solar.repo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.solar.entity.Otp;
@Repository
public interface OtpRepo extends MongoRepository<Otp, String> {
     Optional<Otp> findByEmail(String email);
     List<Otp> findByCreationTimeBefore(LocalDateTime expiry);
}

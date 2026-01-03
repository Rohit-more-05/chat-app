package com.substring.chat.entities;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MongoDebug {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @PostConstruct
    public void printMongoUri() {
        System.out.println("🔥 Mongo URI USED BY SPRING = " + mongoUri);
    }
}


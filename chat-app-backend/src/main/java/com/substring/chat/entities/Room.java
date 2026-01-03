package com.substring.chat.entities;

import lombok.*;
import org.springframework.aot.generate.GeneratedTypeReference;
import org.springframework.aot.generate.GenerationContext;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.annotation.Documented;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "room")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    private String id;

    @Indexed(unique = true)
    private String roomId;

    private List<Message> messages = new ArrayList<>();
}

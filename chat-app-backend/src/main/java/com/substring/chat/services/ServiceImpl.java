package com.substring.chat.services;

import com.substring.chat.entities.Room;
import com.substring.chat.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class ServiceImpl implements Service {

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Room getRoom(String roomId) {
        return roomRepository.findById(roomId).orElse(null);
    }

    @Override
    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

}


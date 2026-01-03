package com.substring.chat.services;

import com.substring.chat.entities.Room;

public interface Service {
    Room getRoom(String roomId);
    Room saveRoom(Room room);
}


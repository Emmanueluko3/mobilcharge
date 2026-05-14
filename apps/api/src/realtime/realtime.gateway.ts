import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { DriverLocation } from "@mobilcharge/types";

@WebSocketGateway({ cors: { origin: "*" } })
export class RealtimeGateway {
  @WebSocketServer() server!: Server;

  @SubscribeMessage("updateLocation")
  handleLocationUpdate(@MessageBody() data: DriverLocation) {
    this.server.emit(`driverLocation:${data.driverId}`, data);
  }

  emitBookingStatusUpdate(bookingId: string, status: string) {
    this.server.emit(`bookingStatus:${bookingId}`, { bookingId, status });
  }
}

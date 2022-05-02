import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Observable } from "rxjs";

@Injectable()
export class EventMqttService {

  constructor(
    private _mqttService: MqttService,
  ) {
  }

  topic(): Observable<IMqttMessage> {
    let topicName = `CLEO-esp32/pub`;     
    return this._mqttService.observe(topicName);
  }
}
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventMqttService } from 'app/mqtt.service';
import { IMqttMessage } from "ngx-mqtt";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  events: any[];
  private deviceId: string;
  subscription: Subscription;
  airhumidity: number = 0;
  airtemp: number;
  waterlevel:string;
  dirthum:string;
  distance:string;
  
  constructor(
    private ref: ChangeDetectorRef,
      private readonly eventMqtt: EventMqttService,
  ) {
  }

  ngOnInit() {
      this.subscribeToTopic();
  }

  ngOnDestroy(): void {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

  private subscribeToTopic() {
      
      this.subscription = this.eventMqtt.topic()
          .subscribe((data: IMqttMessage) => {
              let item = JSON.parse(data.payload.toString());
              console.log(item);
              this.airhumidity = item.airhumidity;
              this.airtemp = item.airtemp;
              this.waterlevel = item.waterlevel;
              this.dirthum    = item.dirthum;
              this.distance   = item.distance;
              this.events.push(item);
          });
  }
}

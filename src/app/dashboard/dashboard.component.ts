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
  airhumidity: number;
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
              this.airtemp = item.airtemperature;
              this.waterlevel = item.waterlevel;
              this.dirthum    = item.dirthum;
              switch (item.distancia) {
                case "0":
                    this.distance = "100"
                    break;
                case "1":
                    this.distance = "75"
                    break;  
                case "2":
                    this.distance = "50"
                    break;  
                case "3":
                    this.distance = "25"
                break;  
                case "4":
                    this.distance = "0"
                break;
                default:
                  this.distance = item.distance;
                break;
          }
              this.events.push(item);
          });
  }
}

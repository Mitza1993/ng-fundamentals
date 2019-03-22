import {Component, Input} from '@angular/core';
import {IEvent} from './shared/event.model';

@Component({
    selector: 'event-thumbnail',
    template: `
    <div>
        <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
            <h2>{{ event.name | uppercase}}</h2>
            <div> Date: {{event.date | date: 'shortDate'}} </div>
            <div [ngClass]="getStartTimeClass()" [ngSwitch]="event?.time">
             Time: {{event.time}}
             <span *ngSwitchCase="'8:00 am'">[Early Start]</span>
             <span *ngSwitchCase="'10:00 am'">[Late Start]</span>
             <span *ngSwitchDefault>[Normal Start]</span>
             </div>
            <div> Price: {{event.price | currency: 'USD'}} </div>
            <div>
                <span> Location: {{event.location?.address}} </span>
                <span class="pad-left"> {{event.location?.city}}, {{event.location?.country}} </span>
            </div>
            <div *ngIf="event?.onlineUrl">
                Online Url: {{event?.onlineUrl}}
            </div>
        </div>
    </div>
    `,
    styles: [
        `.pad-left {margin-left: 10px;}
        .bold { font-weight: bold;}
        .thumbnail { min-height: 210px;}
        .well div { color: #bbb;}
        .green { color: green !important;}
        `
    ]
})
export class EventThumbnailComponent {
    @Input() event: IEvent;

    getStartTimeClass() {
        const isEarlyStart = this.event && this.event.time === '8:00 am';
        return {green: isEarlyStart, bold: isEarlyStart};
    }
}

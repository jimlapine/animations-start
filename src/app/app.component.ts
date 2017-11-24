import { Component } from '@angular/core';
import { trigger, state, style } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('higlighted', style(
        {
          'background-color': 'blue',
          transform: 'translateX(100px)'
        }
      )),
    ])
  ]
})
export class AppComponent {
  // property could be any name, but since it's tracking animation state, it makes sense here
  state = 'normal';
  list = ['Milk', 'Sugar', 'Bread' ];

  onAdd(item) {
    console.log(`value: ${ item }`);
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }
}

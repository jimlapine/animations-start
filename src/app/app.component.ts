import { Component } from '@angular/core';
import { animate, state, style, trigger, transition } from '@angular/animations';

enum State {
  normal = 'normal',
  highlighted = 'highlighted',
  shrunken = 'shrunken',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    // animation states transform from one state to another
    // you can give the state property any name you want, we call in state in this example
    trigger('divState', [
      state(State.normal, style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      // we can pass css properties by enclosing thier names in '' like 'background-color'
      // or by using the camelcase notation like backgroundColor
      state(State.highlighted, style(
        {
          backgroundColor: 'blue',
          transform: 'translateX(100px)'
        }
      )),
      // transition from normal to highlighted
      // this line below would use the same animation in both directions
      transition('normal <=> highlighted', animate(300)),
      // transition from highlighted  to normal
    ]),
    trigger('wildState', [
      state(State.normal, style({
        'background-color': 'green',
        transform: 'translateX(0px) scale(1)'
      })),
      // we can pass css properties by enclosing thier names in '' like 'background-color'
      // or by using the camelcase notation like backgroundColor
      state(State.highlighted, style(
        {
          backgroundColor: 'blue',
          transform: 'translateX(100px) scale(1)'
        }
      )),
      state(State.shrunken, style(
        {
          backgroundColor: 'red',
          transform: 'translateX(0) scale(.5)'
        }
      )),
      transition('normal <=> highlighted', animate(800)),
      //  this transitions from and too shrunken to any state using the wildcard
      transition('shrunken <=> *', animate(500)),
    ]),
  ]
})
export class AppComponent {
  // property could be any name, but since it's tracking animation state, it makes sense here
  private state: State = State.normal;
  private wildState: State = State.normal;
  private list = ['Milk', 'Sugar', 'Bread' ];

  onAnimate () {
    this.state === State.normal ? this.state = State.highlighted : this.state = State.normal;
    this.wildState === State.normal ? this.wildState = State.highlighted : this.wildState = State.normal;
  }

  onShrink() {
    this.wildState === State.normal || State.highlighted  ? this.wildState = State.shrunken : this.wildState = State.normal;
  }

  // add items enter by user into our list
  onAdd(item) {
    console.log(`value: ${ item }`);
    this.list.push(item);
  }

  // removes items user selected from our list
  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }
}

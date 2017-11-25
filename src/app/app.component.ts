import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  trigger,
  transition,
  keyframes,
  group
} from '@angular/animations';

enum State {
  normal = 'normal',
  highlighted = 'highlighted',
  shrunken = 'shrunken'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    // animation states transform from one state to another
    // you can give the state property any name you want, we call in state in this example
    trigger('divState', [
      state(
        State.normal,
        style({
          'background-color': 'red',
          transform: 'translateX(0)'
        })
      ),
      // we can pass css properties by enclosing thier names in '' like 'background-color'
      // or by using the camelcase notation like backgroundColor
      state(
        State.highlighted,
        style({
          backgroundColor: 'blue',
          transform: 'translateX(100px)'
        })
      ),
      // transition from normal to highlighted
      // this line below would use the same animation in both directions
      transition('normal <=> highlighted', animate(300))
      // transition from highlighted  to normal
    ]),
    trigger('wildState', [
      state(
        State.normal,
        style({
          'background-color': 'green',
          transform: 'translateX(0px) scale(1)'
        })
      ),
      // we can pass css properties by enclosing thier names in '' like 'background-color'
      // or by using the camelcase notation like backgroundColor
      state(
        State.highlighted,
        style({
          backgroundColor: 'blue',
          transform: 'translateX(100px) scale(1)'
        })
      ),
      state(
        State.shrunken,
        style({
          backgroundColor: 'red',
          transform: 'translateX(0) scale(.5)'
        })
      ),
      transition('normal <=> highlighted', animate(800)),
      //  this transitions from and too shrunken to any state using the wildcard
      // passing the array of styles and amimations to be used in order, the last animate 500
      // give us smooth translation from our last animate directive to the normal state at the end
      transition('shrunken <=> *', [
        style({
          backgroundColor: 'orange'
        }),
        animate(
          1000,
          style({
            'border-radius': '25px'
          })
        ),
        animate(500)
      ])
    ]),
    trigger('list1', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      // void is used for elements that have not been added to the DOM
      // * is a wild card to transition from void state to any state in our case 'in' state
      transition('void => *', [
        // since we use void, we need to provaide a style to transform from
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        // we are tranforming back to void and only need a final style
        // so we move it back to the left again and fade it out
        animate(300),
        style({
          transform: 'translateX(100px)',
          opacity: 0
        })
      ])
    ]),
    trigger('list2', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      // void is used for elements that have not been added to the DOM
      // * is a wild card to transition from void state to any state in our case 'in' state
      transition('void => *', [
        // using keyframes allow us to specify when we want the animations to occurr
        animate(
          1000,
          keyframes([
            style({
              transform: 'translateX(-100px)',
              opacity: 0,
              offset: 0 // starting point, 0% done.
            }),
            style({
              transform: 'translateX(-50px)',
              opacity: 0.5,
              offset: 0.3 // 30% through our one second animation
            }),
            style({
              transform: 'translateX(-20px)',
              opacity: 1,
              offset: 0.8 // 80% though our one second animation
            }),
            style({
              transform: 'translateX(0)',
              opacity: 1,
              offset: 1 // 100% though our animation, prevents the snap at the end
            })
          ])
        )
      ]),
      transition('* => void', [
        // group allows us to preform the animations synchronously
        group([
          // we are tranforming back to void and only need a final style
          // so we move it back to the left again and fade it out
          animate(
            300,
            style({
              color: 'red'
            })
          ),
          animate(
            800,
            style({
              transform: 'translateX(100px)',
              opacity: 0
            })
          )
        ])
      ])
    ])
  ]
})
export class AppComponent {
  // property could be any name, but since it's tracking animation state, it makes sense here
  private state: State = State.normal;
  private wildState: State = State.normal;
  private list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state === State.normal
      ? (this.state = State.highlighted)
      : (this.state = State.normal);
    this.wildState === State.normal
      ? (this.wildState = State.highlighted)
      : (this.wildState = State.normal);
  }

  onShrink() {
    this.wildState === State.normal || State.highlighted
      ? this.wildState !== State.shrunken
        ? (this.wildState = State.shrunken)
        : (this.wildState = State.normal)
      : (this.wildState = State.normal);
  }

  // add items enter by user into our list
  onAdd(item) {
    console.log(`value: ${item}`);
    this.list.push(item);
  }

  // removes items user selected from our list
  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }
}

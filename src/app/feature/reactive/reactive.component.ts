import { Component } from '@angular/core'
import { BehaviorSubject, timer } from 'rxjs'
import { map, share } from 'rxjs/operators'

@Component({
  selector: 'eangio-feature-reactive',
  templateUrl: './reactive.component.html'
})
export class ReactiveComponent {
  panelState = new BehaviorSubject<string>('maximized')
  orientations = ['top', 'right', 'bottom', 'left']
  panelOrientation = timer(0, 1500).pipe(
    map(i => this.orientations[i % this.orientations.length]),
    share()
  )

  md = `
*reactive-panel.component.html*
~~~html
<ea-panel [state]="panelState" [orientation]="panelOrientation">
  panel ({{panelOrientation | async}})
</ea-panel>
~~~
  *reactive-panel.component.ts*
  ~~~ts
  import { Component } from '@angular/core'
  import { BehaviorSubject, timer } from 'rxjs'
  import { map, share } from 'rxjs/operators'
  @Component({
    selector: 'reactive-panel',
    templateUrl: './reactive-panel.component.html'
  })
  export class ReactivePanelComponent {
    panelState = new BehaviorSubject<string>('maximized')
    orientations = ['top', 'right', 'bottom', 'left']
    panelOrientation = timer(0, 1500).pipe(
      map(i => this.orientations[i % this.orientations.length]),
      share()
    )
    onChange(evt): void {
      this.panelState.next(evt.value)
    }
  }
  ~~~
  `

  onChange(evt): void {
    this.panelState.next(evt.value)
  }
}

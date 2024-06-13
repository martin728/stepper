import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ng-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css'],
})
export class StepsComponent implements AfterViewInit {
  @Input() steps = [
    { label: 'Role', interacted: true },
    { label: 'Email', interacted: false },
    { label: 'Settings', interacted: false },
  ];
  @Input() currentStep = 1;
  @Input() direction = 'horizontal';
  @Input() color = 'rgba(34, 236, 233, 1)';

  stepperOrientation$: Observable<StepperOrientation>;

  @ViewChild('stepper')
  stepper!: MatStepper;

  ngAfterViewInit() {
    const el = this.ref.nativeElement;
    el.style.setProperty('--circle-color', this.color);
    setTimeout(() => {
      this.stepper.selectedIndex = this.currentStep;
    }, 0);
  }

  constructor(breakpointObserver: BreakpointObserver, private ref: ElementRef) {
    this.stepperOrientation$ = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  onStepClick(e: any) {
    this.steps[e.selectedIndex].interacted = true;
  }
}

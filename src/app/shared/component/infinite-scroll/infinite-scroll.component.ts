import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  Input,
  OnDestroy,
} from '@angular/core';

declare const window: any;
@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @Input() options = {};
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor', { static: true }) anchor: ElementRef<HTMLElement>;

  private observer: IntersectionObserver;

  constructor(private host: ElementRef) {}

  get element() {
    return this.host.nativeElement;
  }

  ngOnInit() {
    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null,
      threshold: [0.0, 0.75],
      ...this.options,
    };

    this.observer = new IntersectionObserver(([entry, observer]) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.75) {
        this.scrolled.emit();
      }
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }

  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);

    return (
      style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll'
    );
  }

  ngOnDestroy() {
    if (this.observer) {
      // this.observer.disconnect();
    }
  }
}

import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  /** Placeholder for search text  */
  @Input() placeholder = 'Search';
  /** Debounce the key-up event */
  @Input() delayTime = 300;
  /** Minimum no of characters required to trigger search  */
  @Input() minChars = 3;
  /** Callback to execute when user has done typing.  */
  @Output() doneTyping = new EventEmitter();

  searchTerms = new Subject<string>();

  constructor() {}

  ngOnInit() {
    this.searchTerms
      .pipe(
        // wait for "delayTime"ms after each keystroke before considering the term
        debounceTime(this.delayTime),

        // ignore new term if same as previous term
        distinctUntilChanged()
      )
      .subscribe((term) => {
        if (term.length >= this.minChars || !term) {
          this.doneTyping.emit(term);
        }
      });
  }
  search(term: string): void {
    this.searchTerms.next(term);
  }
}

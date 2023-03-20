import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Work } from 'src/app/interfaces/work';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css'],
})
export class WorkListComponent implements OnInit {
  constructor(private data: DataService) {}

  works: Work[] = [];
  loading: boolean = false;
  errorMessage: string = 'Something went wrong';
  error: boolean = false;
  ngOnInit(): void {
    this.getWorks();
  }

  getWorks() {
    this.loading = true;
    this.data
      .getWorks(true)
      .pipe(
        catchError((res) => {
          console.log(res.error);
          
          this.error = true;
          this.loading = false;
          return res;
        })
      )
      .subscribe((data: any) => {
        this.works = data;
        this.loading = false;
      });
  }

  expandedIndex = -1;

  isExpanded(index: number): boolean {
    return this.expandedIndex === index;
  }

  toggle(index: number) {
    if (this.isExpanded(index)) {
      this.expandedIndex = -1;
    } else {
      this.expandedIndex = index;
    }
  }
}

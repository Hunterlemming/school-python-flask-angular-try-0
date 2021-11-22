import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exam } from './exams/exam.model';
import { ExamsApiService } from './exams/exams-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  examsListSubs: Subscription;
  examsList: Exam[];

  constructor(private examsApi: ExamsApiService) { }

  ngOnInit(): void {
    this.examsListSubs = this.examsApi
      .getExams()
        .subscribe({
          next: (res) => {
            this.examsList = res;
          },
          error: (err) => {
            console.error;
          }
        });
  }

  ngOnDestroy(): void {
    this.examsListSubs.unsubscribe();
  }

}

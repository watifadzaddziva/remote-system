import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DefaultService } from '../../../../services/default.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-motor-data',
  templateUrl: './motor-data.component.html',
  styleUrl: './motor-data.component.css',
})
export class MotorDataComponent implements OnInit,OnDestroy{
  motors!: any;
  id!: any;
  data: any;
  name!: any;
  currentPage = 1;
  pageSize = 3;
  filteredCardsData: any[] = [];
  searchTerm: string = '';
  image!: any;
  private intervalId: any;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private notify: NzNotificationService,
    private service: DefaultService
  ) {}

  ngOnInit() {
    this.getAll();
    this.intervalId = setInterval(() => {
      this.getAll();
    }, 1000);
  }

  getAll() {
    this.service.getAllMotorData().subscribe((res) => {
      this.motors = res;
    });
  }

  onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
  }

  getImage() {
    this.service.getImage().subscribe((res) => {
      this.image = res;
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.subscription.unsubscribe();
  }
}

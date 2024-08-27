import {
  Component,
  ChangeDetectionStrategy, OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {Subject} from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {EventColor} from 'calendar-utils';
import {PortalService} from "../portal.service";
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";

const colors: Record<string, EventColor> = {
  Mazda: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  Ford: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  Toyota: {
    primary: '#fddf6b',
    secondary: '#FDF1BA',
  },
  Lada: {
    primary: '#4fe80a',
    secondary: '#c5ffb9',
  },
};

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss'
})
export class SchedulerComponent implements OnInit {
  constructor(private portalService: PortalService,
              private fb: NonNullableFormBuilder,
              private message: NzMessageService,) {
  }

  visibleEventModal = false;
  loading = false;
  studentsList: any[] = [];
  orgsList: any[] = [];
  carsList: any[] = [];

  categorysList: any[] = [];
  isVisible = false;
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  events: CalendarEvent[] = [];
  validateForm: FormGroup<{
    studentId: FormControl<string>;
    vehicleId: FormControl<string>;
    organizationId: FormControl<string>;
    startDate: FormControl<any>;
    endDate: FormControl<any>;
    visit: FormControl<number>;
  }> = this.fb.group({
    studentId: ['', [Validators.required]],
    vehicleId: ['', [Validators.required]],
    organizationId: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    visit: [1, [Validators.required]],
  });

  ngOnInit() {
    this.getExams();
    this.getOrgs();
    this.getVehicleList();
    this.getStudentsList();
    this.getListAppointments()
  }

  getListAppointments(): void {
    this.portalService.getListAppointments().subscribe(res => {
      console.log(res);
      const events = res.body.lists.map((el: any) => {
        return {
          start: new Date(el.startDate),
          end: new Date(el.endDate),
          title: el.student.fullName + ', ' + el.vehicle.brand + ' ' + el.vehicle.model,
          color: {...colors[el.vehicle.brand]},
          id: el.id,
          data: el
        }
      })
      this.events = [...events];
      console.log(this.events)
    })
  }

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: any;

  refresh = new Subject<void>();


  activeDayIsOpen: boolean = true;


  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: any): void {
    console.log(action, event);
    this.modalData = event.data;
    console.log(this.modalData);
    this.visibleEventModal = true;
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  addNew(e: any): void {
    console.log(e);
    const date = new Date(e.date);
    this.validateForm.patchValue({startDate: date});
    const date30 = new Date(date);
    date30.setMinutes(date.getMinutes() + 30);
    this.validateForm.patchValue({endDate: date30});
    this.showModal();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.loading = true;
      console.log('submit', this.validateForm.value);
      this.portalService.addAppointment(this.validateForm.value).subscribe(res => {
        this.message.success('Авто добавлено');
        this.validateForm.reset();
        this.getVehicleList();
        this.loading = false;
        this.isVisible = false;
        this.getListAppointments();
      }, error => {
        this.loading = false;
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  getOrgs(): void {
    this.portalService.getOrgsList().subscribe(res => {
      this.orgsList = res.body.lists;
    });
  }

  getVehicleList(): void {
    this.portalService.getVehicleList().subscribe(res => {
      console.log(res);
      this.carsList = res.body.lists;
    })
  }

  renderAuto(id: string): string {
    const category = this.carsList.find((el: any) => el.id === id);
    return category ? category.brand + ' ' + category.model : id;
  }

  getStudentsList(): void {
    this.portalService.getStudents().subscribe(res => {
      console.log(res);
      this.studentsList = res.body.lists
    })
  }

  renderCategory(id: string): string {
    const category = this.categorysList.find((el: any) => el.id === id);
    return category ? category.code : id;
  }

  getExams(): void {
    this.portalService.getExamsList().subscribe(res => {
      console.log(res);
      this.categorysList = res.body;
    })
  }

  startTest(id: string): void {
    this.portalService.startTest(id).subscribe(res => {
      console.log(res);
    })
  }
}

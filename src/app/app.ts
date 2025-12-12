import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StargateService } from './services/stargate.service';
import { Person } from './models/person.model';
import { AstronautDutyDto, AstronautDutyResponse } from './models/astronaut-duty.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Stargate ACTS';

  people: Person[] = [];
  selectedPerson: Person | null = null;

  duties: AstronautDutyDto[] = [];
  loadingPeople = false;
  loadingDuties = false;
  errorMessage = '';

  constructor(private stargateService: StargateService) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.loadingPeople = true;
    this.errorMessage = '';

    this.stargateService.getPeople().subscribe({
      next: response => {
        if (response.success) {
          this.people = response.people;
        } else {
          this.errorMessage = response.message || 'Failed to load people.';
        }
        this.loadingPeople = false;
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Error loading people.';
        this.loadingPeople = false;
      }
    });
  }

  selectPerson(person: Person): void {
    this.selectedPerson = person;
    this.loadDuties(person.name);
  }

  loadDuties(name: string): void {
    this.loadingDuties = true;
    this.errorMessage = '';
    this.duties = [];

    this.stargateService.getAstronautDuties(name).subscribe({
      next: (response: AstronautDutyResponse) => {
        if (response.success) {
          if (response.person) this.selectedPerson = response.person;
          this.duties = response.duties || [];
        } else {
          this.errorMessage = response.message || 'Failed to load duties.';
        }
        this.loadingDuties = false;
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Error loading duties.';
        this.loadingDuties = false;
      }
    });
  }

  dutyRange(d: AstronautDutyDto): string {
    const start = d.dutyStartDate.substring(0, 10);
    const end = d.dutyEndDate ? d.dutyEndDate.substring(0, 10) : 'Current';
    return `${start} → ${end}`;
  }
}

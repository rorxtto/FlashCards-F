import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {
  @ViewChild('plans') plansSection!: ElementRef;

  scrollToPlans() {
    this.plansSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  redirectToHotmart(offCode: string) {
    window.location.href = `https://buy.stripe.com/${offCode}`;
  }
}

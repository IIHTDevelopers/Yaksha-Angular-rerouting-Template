import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HomeComponent } from './home/home.component';  // Import HomeComponent
import { UserProfileComponent } from './user-profile/user-profile.component';  // Import UserProfileComponent

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let router: Router;
    let location: Location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, HomeComponent, UserProfileComponent],  // Declare the components
            imports: [RouterTestingModule.withRoutes([  // Use RouterTestingModule with routes
                { path: '', component: HomeComponent },
                { path: 'user-profile', component: UserProfileComponent }
            ])],
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should create the app component', () => {
            expect(component).toBeTruthy();
        });

        it('should have a <router-outlet> in the template', () => {
            const compiled = fixture.nativeElement;
            expect(compiled.querySelector('router-outlet')).not.toBeNull();
        });

        it('should render the navigation links correctly', () => {
            const compiled = fixture.nativeElement;
            const links = compiled.querySelectorAll('nav a');
            expect(links.length).toBe(2);  // We expect 2 links: Home and User Profile
            expect(links[0].getAttribute('routerLink')).toBe('/');  // Home link
            expect(links[1].getAttribute('routerLink')).toBe('/user-profile');  // User Profile link
        });

        it('should navigate to "user-profile" when the "User Profile" link is clicked', async () => {
            const link = fixture.nativeElement.querySelector('a[href="/user-profile"]');
            link.click();
            fixture.detectChanges();
            await fixture.whenStable();  // Wait for async tasks like routing to complete
            expect(location.path()).toBe('/user-profile');
        });

        it('should navigate to "home" when the "Home" link is clicked', async () => {
            // First, navigate to the UserProfile page
            router.navigate(['/user-profile']);
            fixture.detectChanges();
            await fixture.whenStable();

            // Now, simulate clicking the "Home" link
            const link = fixture.nativeElement.querySelector('a[href="/"]');
            link.click();
            fixture.detectChanges();
            await fixture.whenStable();

            // Expect the router to navigate back to the Home page
            expect(location.path()).toBe('/');
        });
    });
});

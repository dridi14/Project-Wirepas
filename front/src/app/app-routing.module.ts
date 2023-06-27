import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SensorsComponent } from './sensors/sensors.component';
import { AutomationComponent } from './automation/automation.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'; // Import the SignupComponent*
import { AuthenticatedGuard } from './auth.guard'; // Import the AuthenticatedGuard*
import { SensorDetailComponent } from './sensor-detail-component/sensor-detail-component.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticatedGuard] },
  { path: 'sensors', component: SensorsComponent, canActivate: [AuthenticatedGuard]},
  { path: 'sensors/:room', component: SensorsComponent, canActivate: [AuthenticatedGuard]},
  { path: 'automation', component: AutomationComponent, canActivate: [AuthenticatedGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'sensor-detail/:sensorName', component: SensorDetailComponent } 
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

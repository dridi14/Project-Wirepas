import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SensorsComponent } from './sensors/sensors.component';
import { AutomationComponent } from './automation/automation.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sensors', component: SensorsComponent },
  { path: 'sensors/:room', component: SensorsComponent },
  { path: 'automation', component: AutomationComponent },
  { path: 'login', component: LoginComponent },
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

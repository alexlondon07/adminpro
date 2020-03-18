import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService } from './service.index';
import { UserService } from './user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './guards/login-guard';

@NgModule({
  declarations: [],
  imports: [ CommonModule, HttpClientModule ],
  exports: [],
  providers: [ SettingsService, SidebarService, SharedService, UserService, LoginGuard],
})
export class ServiceModule {}

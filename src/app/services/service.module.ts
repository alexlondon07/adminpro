import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService } from './service.index';
import { UserService } from './user/user.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [ CommonModule, HttpClientModule ],
  exports: [],
  providers: [ SettingsService, SidebarService, SharedService, UserService],
})
export class ServiceModule {}